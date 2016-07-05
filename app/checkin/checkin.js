angular.module('myApp.bookSearch')

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/checkin', {
    templateUrl: 'checkin/checkin.html',
    controller: 'CheckinCtrl'
  });
}])

.controller('CheckinCtrl', ['$scope', '$http', 'BookCheckin', 'alertify', '$httpParamSerializer', 'NgTableParams',
  function($scope, $http, BookCheckin, alertify, $httpParamSerializer, NgTableParams) {
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

    $scope.isTableEmpty = function() {
      return $scope.tableParams.data.length == 0;
    };

    $scope.searchByISBN = function() {
      $scope.isLoading = true;
      if ($scope.isbn == undefined || $scope.isbn.trim() == '') {
        $scope.isLoading = false;
        alertify.error('Search parameter isbn cant be blank');
      } else {
        BookCheckin.searchByISBN($scope.isbn).success(function(data) {
          $scope.isLoading = false;
          initialSettings.dataset = data;
          $scope.tableParams = new NgTableParams(initialParams, initialSettings);
        }).error(function(err, status) {
          $scope.isLoading = false;
          alertify.error(err.message);
        });
      }
    };

    $scope.searchByCardNumber = function() {
      $scope.isLoading = true;
      if ($scope.cardNo == undefined || $scope.cardNo.trim() == '') {
        $scope.isLoading = false;
        alertify.error('Search parameter cardNo cant be blank');
      } else {
        BookCheckin.searchByCardNumber($scope.cardNo).success(function(data) {
          $scope.isLoading = false;
          initialSettings.dataset = data;
          $scope.tableParams = new NgTableParams(initialParams, initialSettings);
        }).error(function(err, status) {
          $scope.isLoading = false;
          alertify.error(err.message);
        });
      }
    };

    $scope.checkin = function(loan) {
      var formData = {};
      formData.bookId = loan.bookId;
      formData.cardNo = loan.cardNo;
      var params = $httpParamSerializer(formData);
      BookCheckin.checkin(params).success(function(data) {
        loan.dateIn = data[0].dateIn;
        alertify.success('Successfully checked in book');
      }).error(function(err, status) {
        alertify.error(err);
      });
    };
  }
])

.factory('BookCheckin', ['$http', 'config', function($http, config) {
  return {
    searchByISBN: function(isbn) {
      return $http.get(config.searchByISBNURL + '?isbn=' + isbn);
    },
    searchByCardNumber: function(cardNo) {
      return $http.get(config.searchByCardNumberURL + '?cardNo=' + cardNo);
    },
    checkin: function(params) {
      return $http.post(config.checkinURL + '?' + params);
    }
  }
}]);
