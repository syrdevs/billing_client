angular.module('myApp.distributor', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/distributor/:code', {
            templateUrl: '/distributor/distributor.html',
            controller: 'DistributorCtrl'
        });
    }])
    .controller('DistributorCtrl', ['$scope', '$rootScope', '$http', '$location', '$routeParams',
        function ($scope, $rootScope, $http, $location, $routeParams) {

        }]);
