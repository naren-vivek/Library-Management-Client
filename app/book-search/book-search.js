'use strict';

angular.module('myApp.bookSearch', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'book-search/book-search.html',
    controller: 'BookSearchCtrl'
  });
}])

.controller('BookSearchCtrl', ['$scope', '$http', 'Search', 'alertify', function($scope, $http, Search, alertify) {
  $scope.formData = {};

  $scope.search = function() {
    if ($scope.formData.isbn == undefined && $scope.formData.title == undefined &&
      $scope.formData.author == undefined && $scope.formData.location == undefined) {
      alertify.error('You need to provide atleast one search criteria');
    }
  };
}])

.factory('Search', ['$http', function($http) {
  return {
    search: function() {
      return $http.get('/api/food');
    }
  }
}]);
