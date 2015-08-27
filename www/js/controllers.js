angular.module('starter.controllers', ['ionic', 'starter.services'])

.controller('AppCtrl', function ($scope, $ionicModal){
	$ionicModal.fromTemplateUrl('templates/login.html', function (modal){
		$scope.loginModal = modal;	
	},{
		scope: $scope,
		animation: 'slide-in-up',
		focusFirstInput : true
		}

	);

	$scope.$on('$destroy', function(){
		$scope.loginModal.remove();
	});
})

.controller('LogoutCtrl', function ($scope, AuthenticationService){
	AuthenticationService.logout();
})

.controller('LoginCtrl', function ($scope, $http, $state, AuthenticationService){
	$scope.message = "";

	$scope.user = {
		username : null,
		password : null
	};

	$scope.login = function(){
		AuthenticationService.login($scope.user);
	};

	$scope.$on('event:auth-loginRequired', function (e, rejection){
		$scope.loginModal.show();
	});

	$scope.$on('event:auth-loginConfirmed', function(){
		$scope.username = null;
		$scope.password = null;
		$scope.loginModal.hide();
	});

	$scope.$on('event:auth-login-failed', function (e, status){
		var error = 'Login Failed';
		if (status == 401){
			error = 'Invalid Username or Password';
		}
		$scope.message = error;
	});

	$scope.$on('event:auth-logout-complete', function(){
		$state.go('menu.home', {}, {reload:true, inherit: false});
	});
})

.controller('HomeCtrl', function ($ionicHistory){
	$ionicHistory.clearHistory();
})


.controller('CustomerCtrl', function ($scope, $state, $http){
	$scope.customers = [];

	$http.get('http://customers')
		.success(function (data, status, headers, config){
			$scope.customers = data;
		})
		.error(function (data, status, headers, config){
			console.log('Error occurred. Status: '+status)
		});
})

.controller('HomeCtrl', function(){

})
