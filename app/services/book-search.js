angular.module('bookSearchService', [])
  .factory('Books', ['$http', function($http) {
    return {
      search: function() {
        return $http.get('/api/food');
      }
    }
  }]);
