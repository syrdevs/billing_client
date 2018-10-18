angular.module('myApp.client', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/client/uuid=:uuid', {
            templateUrl: 'client/client.html',
            controller: 'ClientCtrl'
        });
    }])

    .controller('ClientCtrl', ['$scope', '$rootScope', '$http', '$location','$routeParams',
        function($scope, $rootScope, $http, $location, $routeParams) {
            $scope.uuid = $routeParams.uuid;
            console.log($routeParams.uuid);
//
             }]);


