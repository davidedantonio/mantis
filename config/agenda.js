// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var config = require('./config'),
    Agenda = require('agenda'),
    Widget = require('mongoose').model('Widget');

module.exports = function(io){
  // Define the Agenda Object Ref
  var agenda = new Agenda();
  agenda
    .database(config.jobs.db.address, config.jobs.db.collection)
    .name(config.jobs.name);

  agenda.on('ready', function() {
    Widget.find({}, function (err, widgets) {
      widgets.forEach(function(obj) {
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
  		});
      agenda.start();
    });
  });

  return agenda;
};
