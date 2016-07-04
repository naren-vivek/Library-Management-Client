'use strict';

angular.module('myApp.bookSearch')

.controller('CheckoutCtrl', ['$scope', '$uibModalInstance', 'book', function($scope, $uibModalInstance, book) {
  $scope.book = book;

  $scope.checkout = function() {
    $uibModalInstance.close();
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
}]);
