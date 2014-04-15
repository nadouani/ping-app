'use strict';

angular.module('pingWebApp')
    .controller('LogoutCtrl', function($scope, $state, $http, AuthService, ServerBaseUrl) {

        /**
         * Invalidate the token on the server.
         */
        $scope.logout = function() {
            $http.post(ServerBaseUrl + "/logout").then(function() {
                AuthService.resetAuthenticated();
                $state.transitionTo('login');
            });
        };

        /**
         * Checks if a user is logged in
         *
         * @returns true is a user is logged in
         */
        $scope.isLogged = function() {
            return AuthService.isLogged;
        }

    });
