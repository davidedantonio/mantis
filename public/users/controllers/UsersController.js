app.controller('UsersController', function($scope, $http, $rootScope, $location, $cookies){
  $scope.user = {email: '', password: ''};
	$scope.error_message = '';

  $scope.userFound = 0;

  $scope.interacted = function(field) {
    return $scope.submitted;
  };

  $scope.submitted = false;
  $scope.login = function() {
    $scope.submitted = true;

    if(!$scope.userForm.$valid)
      return false;

    return true;

    /*$http.post('/signin', $scope.user).success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user;
        $cookies.put("authenticated", true);
        $cookies.put("current_user", JSON.stringify(data.user));
        $location.path('/dashboards');
      }
      else{
        $scope.notValid = 1;
      }
    });*/
  };

  $scope.notValid = function(){
    return $scope.userFound;
  };

	/*$scope.register = function(){
    $http.post('/signup', $scope.user).success(function(data){
      console.log(data);
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $cookies.put("authenticated", true);
        $cookies.put("current_user", data.user);
				$location.path('/dashboards');
			}
			else{
				$scope.error_message = data.message;
			}
		});
	};*/
});
