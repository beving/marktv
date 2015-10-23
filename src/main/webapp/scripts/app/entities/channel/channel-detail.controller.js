'use strict';

angular.module('marktvApp')
    .controller('ChannelDetailController', function ($scope, $rootScope, $stateParams, entity, Channel) {
        $scope.channel = entity;
        $scope.load = function (id) {
            Channel.get({id: id}, function(result) {
                $scope.channel = result;
            });
        };
        $rootScope.$on('marktvApp:channelUpdate', function(event, result) {
            $scope.channel = result;
        });
    });
