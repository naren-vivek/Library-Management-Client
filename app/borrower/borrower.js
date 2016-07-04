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
          $scope.isLoading = false;
          alertify.success('Created borrower ' + formData.firstName);
          $scope.formData = {};
        }).error(function(err, status) {
          $scope.isLoading = false;
          alertify.error(err);
        });
      }, function(err) {
        $scope.isLoading = false;
        alertify.error(err);
      });
    };

    var validate = function(formData, success, err) {

      if (formData.firstName == undefined || formData.lastName == undefined || formData.ssn == undefined ||
        formData.address == undefined || formData.cardNo == undefined) {
        return err('Mandatory fields are missing');
      }

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
