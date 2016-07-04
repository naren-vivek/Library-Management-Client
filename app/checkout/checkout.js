'use strict';

angular.module('myApp.checkoutBook', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/checkout', {
    templateUrl: 'checkout/checkout.html',
    controller: 'CheckoutCtrl'
  });
}])

.controller('CheckoutCtrl', ['$scope', '$uibModalInstance', 'book', function($scope, $uibModalInstance, book) {
  $scope.book = book;
}]);
