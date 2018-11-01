angular.module('myApp.report', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/report/:type', {
            templateUrl: 'reports/report.html',
            controller: 'ReportCtrl'
        });
    }])
    .controller('ReportCtrl', ['$scope', '$rootScope', '$http', '$location', '$routeParams',
        function ($scope, $rootScope, $http, $location, $routeParams) {

            $scope.typeReport = $routeParams.type;

            if (["1", "2"].indexOf($scope.typeReport) === -1) {
                $location.path("error/404");
            }




        }]);