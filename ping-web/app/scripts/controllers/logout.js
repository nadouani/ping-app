'use strict';

angular.module('pingWebApp')
    .controller('LogoutCtrl', function($scope, $state, $http, AuthService, ServerBaseUrl) {

        $scope.authService = AuthService;

        /**
         * Invalidate the token on the server.
         */
        $scope.logout = function() {
            $http.post(ServerBaseUrl + "/logout").then(function() {
                AuthService.resetAuthenticated();
                $state.transitionTo('login');
            });
        };

    });
