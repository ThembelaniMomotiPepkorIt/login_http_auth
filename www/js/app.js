// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngMockE2E', 'starter.routes', 'starter.services', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.run(function($httpBackend){

  var authorized = false;
  var customers = [{name:'John Smith'}, {name: 'Tim Johnson'}];

  $httpBackend.whenGET('http://customers')
    .respond(function (method, url, data){
      return authorized ? [200,customers] : [401];
    });

  $httpBackend.whenPOST('http://login')
    .respond(function (method, url, data){
      authorized = true;
      return [200, {authorizationToken : 'KJIUiyKJHygufutFJH87iuyG'}];
    });
  $httpBackend.whenPOST('http://logout')
    .respond(function (method, url, data){
      authorized = false;
      return [200]
    });

  $httpBackend.whenGET(/.*/).passThrough();
})



/*.run(function($rootScope, $ionicPlatform, $httpBackend, $http) {  
  // Mocking code used for simulation purposes (using ngMockE2E module) 
  var authorized = false;
  var customers = [{name: 'John Smith'}, {name: 'Tim Johnson'}];
  
  // returns the current list of customers or a 401 depending on authorization flag
  $httpBackend.whenGET('https://customers').respond(function (method, url, data, headers) {
     return authorized ? [200, customers] : [401];
  });
  $httpBackend.whenPOST('https://login').respond(function(method, url, data) {
    authorized = true;
    return  [200 , { authorizationToken: "NjMwNjM4OTQtMjE0Mi00ZWYzLWEzMDQtYWYyMjkyMzNiOGIy" } ];
  });
  $httpBackend.whenPOST('https://logout').respond(function(method, url, data) {
    authorized = false;
    return [200];
  });
  // All other http requests will pass through
//  $httpBackend.whenGET(/.*///).passThrough();
//})
