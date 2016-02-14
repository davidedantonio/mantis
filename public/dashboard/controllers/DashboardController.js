app.controller('DashboardController', function($scope, $rootScope, $location,
  $http, $modal, $timeout, socket, growl){
  $scope.init = function(){
    getAllDashboards();
  };

  $scope.modalCreateDashboard = function (size) {
    var modalCreate = $modal.open({
          templateUrl:'createDashboardContent.html',
          controller: 'ModalCreateDashboardController',
          size: size,
          resolve: {
              params: function(){
                return {
                  title: 'Create Dashboard'
                };
              }
            }
        });

      modalCreate.result.then(function (result) {
        if (result == 'insert-ok')
          getAllDashboards();
      }, function () { /* silence is golden  */ });
  };

  function getAllDashboards() {
    $http.get('/dashboards/all').success(function(dashboards){
        $scope.dashboards = dashboards;
    });
  };

  $scope.goToDashboard = function(dashboard) {
    $location.path('/details/'+ dashboard);
  };

  $scope.modalDeleteDashboard = function (id) {
    var the_id = id;
    var modalInstance = $modal.open({
          templateUrl:'modalDeleteDashboard.html',
          controller: 'ModalDeleteDashboardController',
          size: "sm",
          resolve: {
              params: function(){
                return {
                  id: the_id
                };
              }
            }
        });

    modalInstance.result.then(function (result) {
      if (result.success){
        /* waiting socket event */
      }
    });
  };

  $scope.$on('socket:deleteDashboard', function (ev, data) {
    $timeout(function(){
      if ($scope.dashboards){
        $scope.dashboards.forEach(function(dashboard, key) {
          if (dashboard._id == data.dashboard._id)
            $scope.dashboards.splice(key,1);
            growl.warning('Dashboard ' + data.dashboard.name + ' deleted!');
        });
      }
    });
  });

  $scope.$on('socket:createdDashboard', function (ev, data) {
    $timeout(function() {
      if ($scope.dashboards){
        $scope.dashboards.push(data.dashboard);
        growl.success('Dashboard ' + data.dashboard.name + ' created!');
      }
    });
  });
});
