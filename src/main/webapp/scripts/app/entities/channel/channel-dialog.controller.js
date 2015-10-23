'use strict';

angular.module('marktvApp').controller('ChannelDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Channel',
        function($scope, $stateParams, $modalInstance, entity, Channel) {

        $scope.channel = entity;
        $scope.load = function(id) {
            Channel.get({id : id}, function(result) {
                $scope.channel = result;
            });
        };

        var onSaveFinished = function (result) {
            $scope.$emit('marktvApp:channelUpdate', result);
            $modalInstance.close(result);
        };

        $scope.save = function () {
            if ($scope.channel.id != null) {
                Channel.update($scope.channel, onSaveFinished);
            } else {
                Channel.save($scope.channel, onSaveFinished);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);
