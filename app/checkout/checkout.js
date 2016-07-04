'use strict';

angular.module('myApp.bookSearch')

.controller('CheckoutCtrl', ['$scope', '$uibModalInstance', 'book', 'Book', 'alertify', '$httpParamSerializer',
  function($scope, $uibModalInstance, book, Book, alertify, $httpParamSerializer) {
    $scope.formData = {};
    $scope.isLoading = false;

    $scope.checkout = function() {
      $scope.formData.bookId = book.bookId;
      $scope.isLoading = true;
      if ($scope.formData.cardNo != undefined && $scope.formData.cardNo.trim() != '') {
        var params = $httpParamSerializer($scope.formData);
        Book.checkout(params).success(function(data) {
          $scope.isLoading = false;
          alertify.success('Checked out book ' + book.title.substring(0, 50));
          $uibModalInstance.close();
        }).error(function(err, status) {
          $scope.isLoading = false;
          alertify.error(err.message);
        });
      } else {
        $scope.isLoading = false;
        alertify.error('Card number cant be blank');
      }
    };

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  }
])

.factory('Book', ['$http', 'config', function($http, config) {
  return {
    checkout: function(params) {
      console.log(params);
      return $http.post(config.checkoutURL + '?' + params);
    }
  }
}]);
