var app = angular.module('MantisApplication',
["ngRoute","ngResource","ngCookies","ngMessages","ui.bootstrap","gridster","btford.socket-io",
	"highcharts-ng","angular-growl"])
	.run(function($http, $rootScope, $cookies, $location) {
	});

app.factory('socket', function (socketFactory) {
	var socket = socketFactory();
  socket.forward('insertWidget');
  socket.forward('updatedWidget');
  socket.forward('updatedWidgetGraph');
  socket.forward('deleteWidget');
	socket.forward('deleteDashboard');
	socket.forward('createdDashboard');
  return socket;
});

app.config(function($routeProvider, growlProvider){
	growlProvider.globalTimeToLive(5000);
  growlProvider.globalReversedOrder(true);

	$routeProvider
		.when('/', {
			templateUrl: 'dashboard/views/dashboards.html',
			controller: 'DashboardController'
		})
		.when('/details/:dashboardId', {
			templateUrl: 'widgets/views/view-dashboard.html',
			controller: 'WidgetsController'
		});
});

app.directive('a', function() {
  return {
    restrict: 'E',
    link: function(scope, elem, attrs) {
      if(attrs.ngClick || attrs.href === '' || attrs.href === '#'){
        elem.on('click', function(e){
            e.preventDefault();
        });
      }
    }
 };
});
