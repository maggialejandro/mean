'use strict';

angular.module('meanApp')
  .factory('Session', function ($resource) {
    return $resource('/auth/session/');
  });
