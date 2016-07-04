'use strict';

angular.module('myApp.bookSearch', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'book-search/book-search.html',
    controller: 'BookSearchCtrl'
  });
}])

.controller('BookSearchCtrl', ['$scope', '$http', 'Search', 'alertify', '$httpParamSerializer', 'NgTableParams', '$uibModal',
  function($scope, $http, Search, alertify, $httpParamSerializer, NgTableParams, $uibModal) {
    $scope.formData = {};
    $scope.selectedBook = undefined;
    $scope.animationsEnabled = true;

    var initialParams = {
      count: 15 // initial page size
    };
    var initialSettings = {
      // page size buttons (right set of buttons in demo)
      counts: [],
      // determines the pager buttons (left set of buttons in demo)
      paginationMaxBlocks: 13,
      paginationMinBlocks: 2,
      dataset: []
    };

    $scope.isAvailable = function(availability) {
      return availability == 1;
    };

    $scope.search = function() {
      if ($scope.formData.isbn != undefined && $scope.formData.title != undefined &&
        $scope.formData.author != undefined && $scope.formData.branch != undefined) {
        var params = $httpParamSerializer($scope.formData);
        Search.search(params);
      } else {
        alertify.error('All fields are mandatory');
      }

      var data = [
      {
        "isbn": "0195153448",
        "title": "Classical Mythology",
        "author": "Mark P. O. Morford",
        "bookId": 1,
        "branchId": 1,
        "availability": 0
      },
      {
        "isbn": "0195153449",
        "title": "Classical Mythology",
        "author": "Mark P. O. Morford",
        "bookId": 1,
        "branchId": 1,
        "availability": 1
      }];

      initialSettings.dataset = data;
      $scope.tableParams = new NgTableParams(initialParams, initialSettings);
    };

    $scope.open = function(selectedBook) {

      $scope.selectedBook = selectedBook;

      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'checkout/checkout.html',
        controller: 'CheckoutCtrl',
        resolve: {
          book: function() {
            return $scope.selectedBook;
          }
        }
      });

      modalInstance.result.then(function() {
        $scope.selectedBook.availability = 0;
        alertify.success('Book updated');
      }, function() {
        console.log('failed');
      });
    };
  }
])

.factory('Search', ['$http', 'config', function($http, config) {
  return {
    search: function(params) {
      return $http.get(config.bookSearchURL + '?' + params);
    }
  }
}]);
