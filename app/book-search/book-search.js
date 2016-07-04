'use strict';

angular.module('myApp.bookSearch', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'book-search/book-search.html',
    controller: 'BookSearchCtrl'
  });
}])

.controller('BookSearchCtrl', [function() {

}]);
