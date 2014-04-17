(function() {
    'use strict';

    angular.module('pingWebApp')
        .controller('LoginCtrl', function($scope, $state, $http, $cookies, $q, AuthService, ServerBaseUrl) {

            $scope.error = null;
            $scope.credentials = {
                emailAddress: 'user1@demo.com',
                password: 'password'
            };

            // Check token cookie and try to authenticate
            // Otherwise the user has to log in
            /*
            var token = $cookies['XSRF-TOKEN'];
            if (token) {
                $http.get(ServerBaseUrl + '/')
                    .then(
                        function(response) {
                            // Set the token as default X-AUTH-TOKEN header for all the authenticated calls
                            $http.defaults.headers.common['X-AUTH-TOKEN'] = token;

                            // Token valid, fetch user data
                            return $http.get(ServerBaseUrl + '/user');
                        },
                        function(response) {
                            token = undefined;
                            $cookies['XSRF-TOKEN'] = undefined;
                            return $q.reject('Token invalid');
                        }
                ).then(
                    function(response) {
                        // The server returned the connected user
                        // We store it in the AuthService
                        $scope.setAuthenticated(response.data);

                        // Redirect to the main user page
                        $state.transitionTo('todos');
                    },
                    function(response) {
                        // Token invalid or fetching the user failed
                    }
                );
            }
            */

            $scope.setAuthenticated = function(user) {
                AuthService.setAuthenticated(user);
            };

            $scope.login = function(credentials) {

                //AuthService.doAuthenticate("todos");

                $http.post(ServerBaseUrl + '/login', credentials)
                    .then(
                        function(response) { // success
                            // Credentials are correct, user has been identified

                            // Store authentication token in cookie and default header
                            AuthService.storeAuthToken(response.data['XSRF-TOKEN']);

                            // Get the user and store it in the AuthService
                            return $http.get(ServerBaseUrl + '/user');
                        },
                        function(response) {
                            // Display the error message
                            $scope.error = response.data;

                            // Reject the chained promise
                            return $q.reject(response);
                        }
                )
                    .then(
                        function(response) {
                            // The server returned the connected user
                            // We store it in the AuthService
                            $scope.setAuthenticated(response.data);

                            // Redirect to the main user page
                            $state.transitionTo('todos');
                        },
                        function(response) {
                            $scope.error = response.data;
                        }
                );

            };

        });


})();
