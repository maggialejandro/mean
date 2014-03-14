'use strict';

angular.module('meanApp')
  .factory('Facebook', function ($resource) {
    return $resource('/auth/facebook');
  });