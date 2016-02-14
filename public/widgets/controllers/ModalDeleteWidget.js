app.controller('ModalDeleteWidget', function ($scope, $modalInstance, $http, $location, params) {
  $scope.title = params.title;
  $scope.widget_id = params.id;

  $scope.deleteWidget = function () {
    console.log($scope);
    $http.delete('/widgets/delete/'+$scope.widget_id).success(function(data, status, headers, config) {
      if (status == 200) {
        $modalInstance.close(data);
      }
    });
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
