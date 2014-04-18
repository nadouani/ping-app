// Create all modules and define dependencies to make sure they exist
// and are loaded in the correct order to satisfy dependency injection
// before all nested files are concatenated by Grunt

// Config
angular.module('ping-auth.config', [])
    .value('ping-auth.config', {
        debug: true
    });

// Modules
angular.module('ping-auth.directives', []);
angular.module('ping-auth.filters', []);
angular.module('ping-auth.services', []);
angular.module('ping-auth',
    [
        'ping-auth.config',
        'ping-auth.directives',
        'ping-auth.filters',
        'ping-auth.services',
        'ngCookies',
        'ngSanitize'
    ]);
