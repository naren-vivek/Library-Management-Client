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
    $scope.isLoading = false;

    var initialParams = {
      count: 15 // initial page size
    };
    var initialSettings = {
      // page size buttons (right set of buttons in demo)
      counts: [],
      // determines the pager buttons (left set of buttons in demo)
      paginationMaxBlocks: 10,
      paginationMinBlocks: 2,
      dataset: []
    };

    $scope.isAvailable = function(availability) {
      return availability == 1;
    };

    $scope.isTableEmpty = function() {
      return $scope.tableParams.data.length == 0;
    };

    $scope.search = function() {
      $scope.isLoading = true;
      validate($scope.formData, function() {
        var params = $httpParamSerializer($scope.formData);
        Search.search(params).success(function(data) {
          $scope.isLoading = false;
          initialSettings.dataset = data;
          $scope.tableParams = new NgTableParams(initialParams, initialSettings);
        }).error(function(err, status) {
          $scope.isLoading = false;
          alertify.error(err.message);
        });
      }, function(err) {
        $scope.isLoading = false;
        alertify.error(err);
      });
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
      }, function() {

      });
    };

    var validate = function(formData, success, err) {
      if (formData.isbn == undefined || formData.title == undefined ||
        formData.author == undefined || formData.branch == undefined) {
        return err('All fields are mandatory');
      }

      for (var key in formData) {
        var field = formData[key];
        if (typeof field === 'string' && field.trim() == '') {
          return err(key + ' is empty.');
        }
      }

      return success();
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
