(function() {
    'use strict';

    angular.module('pingWebApp')
        .service('AuthService', function Authservice($http, $state, $cookies, ServerBaseUrl) {
            // AngularJS will instantiate a singleton by calling "new" on this function

            return {
                user: null,

                isLogged: false,

                /**
                 * Checks if a user is already logged
                 *
                 * @returns true if a user is already logged in
                 */
                isAuthenticated: function() {
                    return this.isLogged === true;
                },

                /**
                 * Reset the authentication status
                 */
                resetAuthenticated: function() {
                    this.isLogged = false;
                    this.user = null;
                    $cookies["XSRF-TOKEN"] = undefined;
                },

                /**
                 * Set the authenticated user object.
                 *
                 * @param {Object} user data
                 */
                setAuthenticated: function(user) {
                    this.isLogged = true;
                    this.user = user;
                },

                storeAuthToken: function(authToken){
                    // Store the token in a cookie
                    $cookies['XSRF-TOKEN'] = authToken;

                    // Set the token as default X-AUTH-TOKEN header for all the authenticated calls
                    $http.defaults.headers.common['X-AUTH-TOKEN'] = authToken;
                },

                /**
                 * Description of what this does.
                 *
                 * @param {String} successState the state to redirect to on authentication success
                 * @returns
                 */
                authenticate: function(successState) {
                    var self = this;

                    var token = $cookies["XSRF-TOKEN"];
                    if (token) {
                        $http.get(ServerBaseUrl + "/")
                            .then(
                                function(response) {
                                    // Store the token as default authentication token header
                                    self.storeAuthToken(token);

                                    // Token valid, fetch user data
                                    return $http.get(ServerBaseUrl + "/user");
                                },
                                function(response) {
                                    // Reset the authentication status
                                    self.resetAuthenticated();

                                    return $q.reject("Token invalid");
                                }
                        ).then(
                            function(response) {
                                // The server returned the connected user
                                // We store it in the AuthService
                                self.setAuthenticated(response.data);

                                // Redirect to the main user page
                                $state.transitionTo(successState);
                            }, function(response) {
                                // Token invalid or fetching the user failed
                                $state.transitionTo("login");
                            }
                        );
                    } else {
                        $state.transitionTo("login");
                    }
                }

            };
        });

})();
