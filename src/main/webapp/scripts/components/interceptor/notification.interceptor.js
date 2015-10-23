 'use strict';

angular.module('marktvApp')
    .factory('notificationInterceptor', function ($q, AlertService) {
        return {
            response: function(response) {
                var alertKey = response.headers('X-marktvApp-alert');
                if (angular.isString(alertKey)) {
                    AlertService.success(alertKey, { param : response.headers('X-marktvApp-params')});
                }
                return response;
            }
        };
    });
