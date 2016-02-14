app.controller('ModalDeleteDashboardController', function ($scope, $modalInstance, $http, $location, params) {
  $scope.dashboardId = params.id;

  $scope.deleteDashboard = function () {
    $http.delete('/dashboards/delete/'+$scope.dashboardId)
      .success(function(data, status, headers, config) {
        if (status == 200) {
          $modalInstance.close(data);
        }
      });
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
