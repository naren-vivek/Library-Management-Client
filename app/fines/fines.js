angular.module('myApp.bookSearch')

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/fines', {
    templateUrl: 'fines/fines.html',
    controller: 'FinesCtrl'
  });
}])

.controller('FinesCtrl', ['$scope', '$http', 'Fine', 'alertify', '$httpParamSerializer', 'NgTableParams',
  function($scope, $http, Fine, alertify, $httpParamSerializer, NgTableParams) {
    $scope.isLoading = false;
    $scope.options = [
    {
      name: 'All',
      value: 0
    },
    {
      name: 'Paid',
      value: 1
    },
    {
      name: 'Unpaid',
      value: 2
    }];

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

    $scope.isPaid = function(paid) {
      return paid == 1;
    };

    $scope.isTableEmpty = function() {
      return $scope.tableParams.data.length == 0;
    };

    $scope.getFines = function() {
      $scope.isLoading = true;
      var cardNo = $scope.cardNo;
      var fineOption = $scope.fineOption.value;
      var formData = {};
      formData.cardNo = cardNo;
      formData.paid = fineOption;


      if (cardNo == undefined || cardNo.trim() == '') {
        $scope.isLoading = false;
        alertify.error('Search criteria card number is blank');
      } else {
        var params = $httpParamSerializer(formData);
        Fine.get(params).success(function(data) {
          $scope.isLoading = false;
          initialSettings.dataset = data;
          $scope.tableParams = new NgTableParams(initialParams, initialSettings);
        }).error(function(err, status) {
          $scope.isLoading = false;
          alertify.error(err);
        });
      }
    };

    $scope.pay = function(loan) {
      Fine.pay(loan.loanId).success(function(data) {
        loan.paid = 1;
        alertify.success('Paid fine for loan ' + loan.loanId);
      }).error(function(err, status) {
        alertify.error(err);
      });
    }
  }
])

.factory('Fine', ['$http', 'config', function($http, config) {
  return {
    get: function(params) {
      return $http.get(config.getFinesURL + '?' + params);
    },
    pay: function(loanId) {
      return $http.post(config.payFineURL + '?loanId=' + loanId);
    }
  }
}]);
