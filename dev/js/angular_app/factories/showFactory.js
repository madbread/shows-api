function showFactory($http, $q) {

  var showData = {
    shows: []
  };

  var showFactoryMethods = {};

  showFactoryMethods.get = function() {
    return showData;
  };

  showFactoryMethods.init = function() {

    var deferred = $q.defer();

    $http.get('/api/shows').success(function(data) {
      showData.shows = data;
      deferred.resolve(showData);
    }).error(function(e) {
      deferred.reject('An error occurred while querying the remote database');
    });

    return deferred.promise;

  };

  showFactoryMethods.newShow = function(show) {

    var deferred = $q.defer();

    $http.post('/api/shows', show)
      .success(function(data) {
        deferred.resolve(data);
      }).error(function(e) {
        deferred.reject('An error occurred while POSTing a show to the remote database');
      });

    return deferred.promise;

  };

  showFactoryMethods.editShow = function(id, show) {

    var deferred = $q.defer();

    $http.put('/api/shows/' + id, show)
      .success(function(data) {
        deferred.resolve(data);
      }).error(function(e) {
        deferred.reject('An error occurred while PUTing a show to the remote database');
      });

    return deferred.promise;

  };

  showFactoryMethods.deleteShow = function(id) {

    var deferred = $q.defer();

    $http.delete('/api/shows/' + id)
      .success(function(data) {
        deferred.resolve(data);
      }).error(function(e) {
        deferred.reject('An error occurred while deleting a show from the remote database');
      });

    return deferred.promise;

  };

  return showFactoryMethods;

}

angular.module('ShowsAPI').
factory('showFactory', showFactory);
