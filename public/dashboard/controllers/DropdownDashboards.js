app.controller("DropdownDashboards", function($scope,$http){
  $scope.items = [];
  $http.get('/dashboards/all').success(function(dashboards){
      $scope.items = dashboards;
  });

  $scope.status = {
    isopen: false
  };

  $scope.toggled = function(open) {
    //console.log('Dropdown is now: ', open);
  };

  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };

  $scope.setDashboardSession = function (id) {
    $http.post('/set-dashboard-session',{dash:id}).
    success(function(data, status, headers, config) {
      window.location = id;
    });
  };
});
