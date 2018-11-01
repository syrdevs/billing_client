angular.module('myApp.errors', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/error/404', {
            templateUrl: 'error/404.html',
            controller: 'ErrorCtrl'
        });
        $routeProvider.when('/error/401', {
            templateUrl: 'error/401.html',
            controller: 'ErrorCtrl'
        });
    }])
    .controller('ErrorCtrl', ['$scope', '$rootScope', '$http', '$location', '$routeParams',
        function ($scope, $rootScope, $http, $location, $routeParams) {


        }]);