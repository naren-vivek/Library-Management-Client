angular.module('myApp.bookSearch')

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/borrower', {
    templateUrl: 'borrower/borrower.html',
    controller: 'BorrowerCtrl'
  });
}])

.controller('BorrowerCtrl', ['$scope', '$http', 'Borrower', 'alertify', '$httpParamSerializer',
  function($scope, $http, Borrower, alertify, $httpParamSerializer) {
    $scope.formData = {};
    $scope.isLoading = false;

    $scope.create = function() {
      $scope.isLoading = true;
      validate($scope.formData, function(formData) {
        var params = $httpParamSerializer(formData);
        Borrower.create(params).success(function(data) {
          alertify.success('Created borrower ' + formData.firstName);
          $scope.formData = {};
        }).error(function(err, status) {
          alertify.error(err);
        });
      }, function(err) {
        alertify.error(err);
      });
    };

    var validate = function(formData, success, err) {
      for (key in formData) {
        var field = formData[key];
        if (typeof field === 'string' && field.trim() == '') {
          formData[key] = formData[key].trim();
          if (key != 'phoneNo') {
            return err(key + ' is empty.');
          }
        }
      }

      return success(formData);
    };
  }
])

.factory('Borrower', ['$http', 'config', function($http, config) {
  return {
    create: function(params) {
      return $http.post(config.borrowerURL + '?' + params);
    }
  }
}]);
