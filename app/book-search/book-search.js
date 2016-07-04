'use strict';

angular.module('myApp.bookSearch', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'book-search/book-search.html',
    controller: 'BookSearchCtrl'
  });
}])

.controller('BookSearchCtrl', ['$scope', '$http', 'Search', 'alertify', '$httpParamSerializer', function($scope, $http, Search, alertify, $httpParamSerializer) {
  $scope.formData = {};

  $scope.search = function() {
    if ($scope.formData.isbn != undefined && $scope.formData.title != undefined &&
      $scope.formData.author != undefined && $scope.formData.branch != undefined) {
      var params = $httpParamSerializer($scope.formData);
      Search.search(params);
    } else {
      alertify.error('All fields are mandatory');
    }
  };
}])

.factory('Search', ['$http', 'config', function($http, config) {
  return {
    search: function(params) {
      return $http.get(config.bookSearchURL + '?' + params);
    }
  }
}]);
