'use strict';

angular.module('pingWebApp')
    .controller('TodosCtrl', function($scope, $http, ServerBaseUrl) {

        $scope.todos = [];

        $http.get(ServerBaseUrl + '/todos').then(function(response){            
            $scope.todos = response.data;
        });

    });
