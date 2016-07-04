angular.module('myApp.bookSearch')

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/checkin', {
    templateUrl: 'checkin/checkin.html',
    controller: 'CheckinCtrl'
  });
}])

.controller('CheckinCtrl', ['$scope', '$http', 'BookCheckin', 'alertify', '$httpParamSerializer',
  function($scope, $http, BookCheckin, alertify, $httpParamSerializer) {
    $scope.formData = {};
    $scope.isLoading = false;
  }
])

.factory('BookCheckin', ['$http', 'config', function($http, config) {
  return {
    search: function(isbn, cardNo) {

    },
    checkin: function(params) {
      return $http.get(config.checkinURL + '?' + params);
    }
  }
}]);
