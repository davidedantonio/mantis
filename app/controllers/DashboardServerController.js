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

// Create a new controller method that render index page
exports.renderDashboards = function (req, res, next) {
    // If user not connected render the signup page, otherwise redirect to the main application page
  if (!req.user){
    // Use the response object to render signup page
    res.render('signin', {
      // Set the page title variable
      title: 'Mantis Signin',

      // Set the error message
      messages: req.flash('error')
    });
  } else {
    // Use the response object to render signup page
    res.render('index', {
      // Set the page title variable
      title: 'Mantis Dashboard - ' + req.user.name + ' ' + req.user.surname,
    });
  }
};

// Create a new controller method that create new Dashboard
exports.create = function(io){
  return function(req, res) {
    // Create a new Dashboard object
    var dashboard = new Dashboard(req.body);

    // Set the dashboard owner
    dashboard.user = req.user;

    // Try saving the dashbord
    dashboard.save(function(err) {
      if (err) {
        // If an error occurs send the error message
        return res.status(400).send({
          message: getErrorMessage(err)
        });
      } else {
        io.to('dashboard_room').emit('createdDashboard', {dashboard:dashboard})
        // send json representation of the dashbord
        return res.json(dashboard);
      }
    });
  };
};

exports.getWidgets = function(req, res){
  Widget.find({dashboard:req.dashboard._id}).exec(function(err, widgets) {
    // If an error occurs send the error message
    if (err) return next(err);

    // Return json representation of the widgets collection
    return res.json(widgets);
  });
};

// Delete an existing dashboard
exports.delete = function(io, agenda) {
  return function(req, res) {
    // Get the dashboard from request object
    Dashboard.findById(req.params.dashboardId).exec(function(err, dashboard) {
      if (err) {
        // If an error occurs send the appropriate message error
        return res.status(400).send({
          message: 'Error removing Dashboard'
        });
      }
      var dashboardDocument = dashboard;

      // Delete All Widgets
      Widget.find({dashboard:dashboardDocument._id}).exec(function(err, widgets) {
        if (err) {
          // If an error occurs send the appropriate message error
          return res.status(400).send({
            message: 'Error retrieving Dashboard Widgets'
          });
        } else {
          widgets.forEach(function(widget){
            var widgetId = widget._id;
            agenda.cancel({name: 'getDataForGraph'+widgetId}, function(err, numRemoved) {
              if (numRemoved <= 0) {
                // Error while remove Widget Cron Process
                return res.status(400).send({
                  message: 'Failed to remove Widget Cron Process'
                });
              }
            });

            // Delete the Widget Document
            Widget.find({_id:widgetId}).remove().exec(function(err){
              // If an error occurs send the error message
              if (err) {
                // If an error occurs send the error message
                return res.status(400).send({
                  message: 'Error removing Widgets'
                });
              } else {
                io.to('dashboard_room').emit('deleteWidget', {id:widgetId});
              }
            });
          });
        }
      });

      // Remove Dashboard Object
      Dashboard.find({_id:dashboardDocument._id}).remove(function(err) {
        if (err){
          // If an error occurs send the appropriate message error
          return res.status(400).send({
            message: getErrorMessage(err)
          });
        } else {
          io.to('dashboard_room').emit('deleteDashboard', {dashboard:dashboardDocument});
          // If an error occurs send the appropriate message error
          return res.status(200).send({
            dashboard: dashboardDocument,
            message: 'Dashboard removed'
          });
        }
      });
    });
  };
};

exports.list = function(req, res) {
  Dashboard.find({user:req.user._id}).sort('-created').exec(function(err, dashboards) {
    if (err){
      // An error occurs send the error message
      res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      // Send a JSON representation of the dashboards
      res.json(dashboards);
    }
  });
};

exports.hasAuthorization = function(req, res, next){
  // If the current User is not the creator of the dashboard send the appropriate error message
  if (req.dashbord.user._id != req.user._id) {
    return res.status(403).send({
      message: 'User is not authorized'
    });
  }

  // Otherwise call the middleware
  next();
};
