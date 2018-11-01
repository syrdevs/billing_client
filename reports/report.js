angular.module('myApp.report', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/report/:type', {
            templateUrl: 'reports/report.html',
            controller: 'ReportCtrl'
        });
    }])
    .controller('ReportCtrl', ['$scope', '$rootScope', '$http', '$location', '$routeParams',
        function ($scope, $rootScope, $http, $location, $routeParams) {

            $scope.reportData = [];
            $scope.typeReport = $routeParams.type;
            $scope.sumItems = 0;

            if (["1", "2"].indexOf($scope.typeReport) === -1) {
                $location.path("error/404");
                return;
            }

            $http.get('auth/report' + $scope.typeReport)
                .then(function (res) {
                    console.log(res);
                    $scope.reportData = res.data;
                    $scope.sumItems = res.data.reduce(function (a, b) {
                        return a + b.count;
                    }, 0);
                })

        }]);