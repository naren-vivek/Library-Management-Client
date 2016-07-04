'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.version',
  'ui.bootstrap',
  'ngTable',
  'ngAlertify',
  'myApp.bookSearch',
  'myApp.checkoutBook'
]).

constant('config', {
  url: 'http://localhost:8080/',
  bookSearchURL: 'http://localhost:8080/bookSearch/search'
}).

config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({
    redirectTo: '/'
  });
}]);
