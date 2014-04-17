(function() {
    'use strict';

    angular
        .module('pingWebApp', [
            'ngCookies',
            'ngResource',
            'ngSanitize',
            'ui.router'
        ])
        .config(function($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'views/login.html',
                    controller: 'LoginCtrl',
                    authenticate: false
                })
                .state('todos', {
                    url: '/todos',
                    templateUrl: 'views/todos.html',
                    controller: 'TodosCtrl',
                    authenticate: true
                });

            $urlRouterProvider.otherwise('/login');
        })
        .run(function($rootScope, $state, AuthService) {
            $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {

                if (toState.authenticate && !AuthService.isAuthenticated()) {
                    // User isn’t authenticated, try to authenticate it using the auth token stored in cookies
                    AuthService.authenticate('todos');
                    event.preventDefault();
                }

            });
        })
        .constant('ServerBaseUrl', 'http://localhost:9999');

})();
