'use strict';

angular.module('marktvApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('channel', {
                parent: 'entity',
                url: '/channels',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'marktvApp.channel.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/channel/channels.html',
                        controller: 'ChannelController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('channel');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('channel.detail', {
                parent: 'entity',
                url: '/channel/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'marktvApp.channel.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/channel/channel-detail.html',
                        controller: 'ChannelDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('channel');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Channel', function($stateParams, Channel) {
                        return Channel.get({id : $stateParams.id});
                    }]
                }
            })
            .state('channel.new', {
                parent: 'channel',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/channel/channel-dialog.html',
                        controller: 'ChannelDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    number: null,
                                    call_sign: null,
                                    frequency: null,
                                    icon: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('channel', null, { reload: true });
                    }, function() {
                        $state.go('channel');
                    })
                }]
            })
            .state('channel.edit', {
                parent: 'channel',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/channel/channel-dialog.html',
                        controller: 'ChannelDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Channel', function(Channel) {
                                return Channel.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('channel', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
