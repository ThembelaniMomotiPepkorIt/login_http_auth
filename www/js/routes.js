angular.module('starter.routes', ['ionic'])

.config(function($stateProvider, $urlRouterProvider){

	 $urlRouterProvider.otherwise(function($injector, $location){
	 	var $state = $injector.get('$state');
	 	$state.go('menu.home')
	 });

	//$urlRouterProvider.otherwise('/menu/home');
	$stateProvider
		.state('menu',{
			url : '/menu',
			abstract : true,
			templateUrl : 'templates/menu.html',
			controller : 'AppCtrl'
		})

		.state('menu.home', {
			url: '/home',
			views : {
				'menuContent' : {
					templateUrl :'templates/home.html',
					controller : 'HomeCtrl'
				}
			}
		})
		.state('menu.customers', {
			url : '/customers',
			views : {
				'menuContent' : {
					templateUrl : 'templates/customers.html',
					controller : 'CustomerCtrl'
				}
			}

		})
		.state('menu.logout', {
			url : '/logout',
			views : {
				'menuContent' : {
					controller: 'LogoutCtrl'
				}

			}
		});
})