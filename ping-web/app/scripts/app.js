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
            })
            .state('about', {
                url: '/about',
                templateUrl: 'views/about.html',
                authenticate: false
            });

        $urlRouterProvider.otherwise('/login');
    })
    .run(function($rootScope, $state, AuthService) {
        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {

            if (toState.authenticate && !AuthService.isAuthenticated()) {
                // User isn’t authenticated
                $state.transitionTo("login");
                event.preventDefault();
            }

        });
    })
    .constant('ServerBaseUrl', 'http://localhost:9999');
