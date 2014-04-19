(function() {
    'use strict';

    angular.module('pingWebApp')
        .controller('LoginCtrl', function($scope, $state, $http, $q, AuthService, ServerBaseUrl) {

            $scope.error = null;
            $scope.credentials = {
                emailAddress: 'user1@demo.com',
                password: 'password'
            };

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
