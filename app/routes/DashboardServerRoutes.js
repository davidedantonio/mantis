// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var users = require('../../app/controllers/UserServerController'),
    dashboards = require('../../app/controllers/DashboardServerController');

// Define the route module method
module.exports = function(app, io, agenda) {
  app.route('/dashboards')
    .get(dashboards.renderDashboards);

  app.route('/dashboard/create')
    .post(users.requireLogin, dashboards.create(io));

  app.route('/dashboards/all')
    .get(dashboards.list);

  app.route('/dashboards/delete/:dashboardId')
    .delete(dashboards.delete(io, agenda));
};
