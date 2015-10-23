'use strict';

angular.module('marktvApp')
    .controller('ChannelController', function ($scope, Channel) {
        $scope.channels = [];
        $scope.loadAll = function() {
            Channel.query(function(result) {
               $scope.channels = result;
            });
        };
        $scope.loadAll();

        $scope.delete = function (id) {
            Channel.get({id: id}, function(result) {
                $scope.channel = result;
                $('#deleteChannelConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            Channel.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteChannelConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.channel = {
                number: null,
                call_sign: null,
                frequency: null,
                icon: null,
                id: null
            };
        };
    });
