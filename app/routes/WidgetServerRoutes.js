// Invoke 'strict' JavaScript mode
'use strict';

// Load module dependencies
var users = require('../../app/controllers/UserServerController'),
    widgets = require('../../app/controllers/WidgetServerController');

module.exports = function(app, io, socket, agenda){
  app.route('/widgets/:dashboardId')
    .get(widgets.getWidgets);

  app.route('/widgets/create')
    .post(widgets.createWidget(io, agenda));

  app.route('/widgets/delete/:id')
    .delete(widgets.deleteWidget(io, agenda));

  app.route('/widgets/set-dashboard-widgets')
    .post(widgets.setDashboardWidgets(io));
};
