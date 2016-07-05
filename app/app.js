'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.version',
  'ui.bootstrap',
  'ngTable',
  'ngAlertify',
  'myApp.bookSearch'
]).

constant('config', {
  url: 'http://f122ad23.ngrok.io',
  bookSearchURL: 'http://f122ad23.ngrok.io/bookSearch/search',
  checkoutURL: 'http://f122ad23.ngrok.io/bookloan/checkout',
  borrowerURL: 'http://f122ad23.ngrok.io/borrower/addBorrower',
  checkinURL: 'http://f122ad23.ngrok.io/bookloan/checkin',
  searchByISBNURL: 'http://f122ad23.ngrok.io/bookloan/getActiveBooks',
  searchByCardNumberURL: 'http://f122ad23.ngrok.io/bookloan/getActiveBooksCardNum',
  getFinesURL: 'http://f122ad23.ngrok.io/borrower/fines',
  payFineURL: 'http://f122ad23.ngrok.io/borrower/pay',
  overdueURL: 'http://f122ad23.ngrok.io/borrower/overdue',
}).

config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({
    redirectTo: '/'
  });
}]);
