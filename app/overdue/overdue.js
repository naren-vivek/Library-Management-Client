angular.module('myApp.bookSearch')

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/overdue', {
    templateUrl: 'overdue/overdue.html',
    controller: 'OverdueCtrl'
  });
}])

.controller('OverdueCtrl', ['$scope', '$http', 'Overdue', 'alertify', '$httpParamSerializer', 'NgTableParams',
  function($scope, $http, Fine, alertify, $httpParamSerializer, NgTableParams) {
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

    $scope.getOverdue = function() {
      $scope.isLoading = true;
      var cardNo = $scope.cardNo;
      var formData = {};
      formData.cardNo = cardNo;

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
  }
])

.factory('Overdue', ['$http', 'config', function($http, config) {
  return {
    get: function(params) {
      return $http.get(config.overdueURL + '?' + params);
    }
  }
}]);
