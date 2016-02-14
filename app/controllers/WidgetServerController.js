// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
    Dashboard = mongoose.model('Dashboard'),
    Widget = mongoose.model('Widget');

// Create a new Error handling controller method
var getErrorMessage = function(err) {
  if (err.errors) {
    for (var errName in err.errors) {
      if (err.errors[errName].message)
        return err.errors[errName].message;
    }
  } else {
    return 'Unknow Server error';
  }
};

exports.getWidgets = function(req, res) {
  var dashboardData = {
    dashboard: '',
    widgets: ''
  };

  Dashboard.findById(req.params.dashboardId).exec(function(err, dashboard) {
    if (err){
      // If an error occurs send the error message
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      dashboardData.dashboard = dashboard;
      Widget.find({dashboard: dashboard._id}).exec(function(err, widgets){
        if (err){
          // If an error occurs send the error message
          return res.status(400).send({
            message: getErrorMessage(err)
          });
        } else {
          // Return a json representation of the dashboard object
          dashboardData.widgets = widgets;
          return res.json(dashboardData);
        }
      });
    }
  });
};

exports.createWidget = function(io, agenda) {
  return function(req, res) {
    var widget = new Widget(req.body);

    // Try saving the widget
    widget.save(function(err) {
      if (err) {
        // If an error occurs send the error message
        return res.status(400).send({
          message: getErrorMessage(err)
        });
      } else {
        var obj = widget;
        agenda.define('getDataForGraph'+obj._id, function(job, done) {
          var http = require("http"),
              url = obj.url;

          var request = http.get(url, function (response) {
              var buffer = "",
                  data,
                  route;

              response.on("data", function (chunk) {
                  buffer += chunk;
              });

              response.on("end", function (err) {
                data = JSON.parse(buffer);
                data._id = obj._id;
                obj.widget_data = JSON.stringify(data);

                obj.save(function(err, updated) {
                  io.to('dashboard_room').emit('updatedWidgetGraph', data);
                });
              });
          });
          done();
        });
        agenda.every(obj.frequency+' minutes', 'getDataForGraph'+obj._id);

        io.to('dashboard_room').emit('insertWidget', {
          dashboard: obj.dashboard,
          _id: obj._id,
          name: obj.name,
          frequency: obj.frequency,
          url: obj.url,
          sizeX: obj.width,
          sizeY: obj.height,
          col: obj.columns,
          row: obj.rows,
          data: obj.widget_data
        });

        // send json representation of the widget
        return res.json(widget);
      }
    });
  }
};

exports.deleteWidget = function(io, agenda){
  return function(req, res) {
    var id = req.params.id;
    Widget.find({_id:id}).remove().exec(function(err){
      // If an error occurs send the error message
      if (err) {
        // If an error occurs send the error message
        return res.status(400).send({
          message: getErrorMessage(err)
        });
      }
    });

    agenda.cancel({name: 'getDataForGraph'+id}, function(err, numRemoved) {
      if (numRemoved > 0){
        // Send message in Dashboard Room
        io.to('dashboard_room').emit('deleteWidget', {id:id});
      }else {
        // All ok
        return res.status(400).send({
          message: 'Failed to remove Widget Cron Process'
        });
      }
    });

    // All ok
    return res.status(200).send({
      id: id,
      message: 'Widget Removed'
    });
  }
};

exports.setDashboardWidgets = function(io){
  return function(req, res) {
    var widgets = req.body.widgets;
    widgets.forEach(function(widget) {
      var the_widget = widget;
      Widget.findById(the_widget._id).exec(function(err, widget){
        widget.width       = the_widget.sizeY;
        widget.height      = the_widget.sizeX;
        widget.columns     = the_widget.col;
        widget.rows        = the_widget.row;
        delete widget.widget_data;

        widget.save(function(err) {
          if (!err){
            io.to('dashboard_room').emit('updatedWidget',{
              _id: widget._id,
              name: widget.name,
              frequency: widget.frequency,
              url: widget.url,
              sizeY: widget.width,
              sizeX: widget.height,
              col: widget.columns,
              row: widget.rows
            });
          }
        });
      });
    });
    return res.json(widgets);
  };
};
