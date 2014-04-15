'use strict';

angular.module('pingWebApp')
    .service('AuthService', function Authservice($http, $cookies) {
        // AngularJS will instantiate a singleton by calling "new" on this function

        return {
            user: null,

            isLogged: false,

            /**
             * Checks if a user is already logged
             *
             * @returns true if a user is already logged in
             */
            isAuthenticated: function(){
                return this.isLogged === true;
            },

            /**
             * Reset the authentication status
             */
            resetAuthenticated: function(){
                this.isLogged = false;
                this.user = null;
            },

            /**
             * Set the authenticated user object.
             *
             * @param {Object} user data
             */
            setAuthenticated: function(user){
                this.isLogged = true;
                this.user = user;

                $cookies["XSRF-TOKEN"] = undefined;
            },

            /**
             * Description of what this does.
             *
             * @returns
             */
            authenticate: function(){
                var token = $cookies["XSRF-TOKEN"];
                if (token) {
                    $http.get(serverBase + "/")
                        .then(
                            function(response) {
                                // Set the token as default X-AUTH-TOKEN header for all the authenticated calls
                                $http.defaults.headers.common["X-AUTH-TOKEN"] = token;

                                // Token valid, fetch user data
                                return $http.get(serverBase + "/user");
                            },
                            function(response) {
                                token = undefined;
                                $cookies["XSRF-TOKEN"] = undefined;
                                return $q.reject("Token invalid");
                            }
                    ).then(
                        function(response) {
                            // The server returned the connected user
                            // We store it in the AuthService
                            $scope.setAuthenticated(response.data);

                            // Redirect to the main user page
                            $state.transitionTo("todos");
                        }, function(response) {
                            // Token invalid or fetching the user failed
                        }
                    );
                }
            }
        }
    });
