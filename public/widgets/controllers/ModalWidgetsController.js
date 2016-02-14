app.controller('ModalWidgetsController', function ($scope, $rootScope, $modalInstance, $http, $location, params) {
  $scope.title = params.title;
  $scope.widgetName = '';
  $scope.widgetUrl = '';
  $scope.columns = '';
  $scope.rows = '';
  $scope.frequency = '';
  $scope.submitted = false;
  $scope.errorMessage = false;
  $scope.dashboardId = params.dashboardId;

  $scope.interacted = function(field) {
    return $scope.submitted;
  };

  $scope.createWidget = function () {
    $scope.submitted = true;

    if(!$scope.dashboardCreateWidget.$valid)
       return;

    $http.post('/widgets/create',{
        dashboard: $scope.dashboardId,
        name: $scope.widgetName,
        url: $scope.widgetUrl,
        columns: 0,
        rows: 2,
        frequency: $scope.frequency,
        width: $scope.columns,
        height: $scope.rows
      }).success(function(data, status, headers, config) {
        if (data.insert)
          $scope.errorMessage = "Widget Name already used!";
        else if (status == 200){
          $modalInstance.close(data);
        }

      });
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
