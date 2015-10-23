'use strict';

angular.module('marktvApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


