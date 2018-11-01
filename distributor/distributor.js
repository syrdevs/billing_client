angular.module('myApp.distributor', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/distributor/:code', {
            templateUrl: '/distributor/distributor.html',
            controller: 'DistributorCtrl'
        });
    }])
    .controller('DistributorCtrl', ['$scope', '$rootScope', '$http', '$location', '$routeParams',
        function ($scope, $rootScope, $http, $location, $routeParams) {

            $scope.productData = {};
            $scope.distrData = {};

            $scope.toMyCabinet=function(e){
                $location.path("cabinet/");
            };

            $scope.downloadFile = function(){
                document.getElementById('download_frame').src = $scope.distrData.distrList[0].value;
            };

            $http.get('auth/gettransaction?guid=' + $rootScope.userGuid + "&product=" + $routeParams.code+ $rootScope.encodeByObj($rootScope.serviceParams))
                .then(function (res) {
                    $scope.distrData = JSON.parse(res.data.distrjson);
                    $scope.productData = res.data.product;
                });

        }]);
