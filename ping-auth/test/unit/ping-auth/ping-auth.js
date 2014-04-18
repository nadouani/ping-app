'use strict';

// Set the jasmine fixture path
// jasmine.getFixtures().fixturesPath = 'base/';

describe('ping-auth', function() {

    var module;
    var dependencies;
    dependencies = [];

    var hasModule = function(module) {
        return dependencies.indexOf(module) >= 0;
    };

    beforeEach(function() {

        // Get module
        module = angular.module('ping-auth');
        dependencies = module.requires;
    });

    it('should load config module', function() {
        expect(hasModule('ping-auth.config')).toBeTruthy();
    });

    
    it('should load filters module', function() {
        expect(hasModule('ping-auth.filters')).toBeTruthy();
    });
    

    
    it('should load directives module', function() {
        expect(hasModule('ping-auth.directives')).toBeTruthy();
    });
    

    
    it('should load services module', function() {
        expect(hasModule('ping-auth.services')).toBeTruthy();
    });
    

});
