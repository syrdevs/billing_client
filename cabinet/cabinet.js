angular.module('myApp.cabinet', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/cabinet', {
            templateUrl: 'cabinet/cabinet.html',
            controller: 'CabinetCtrl'
        });
    }])
    .controller('CabinetCtrl', ['$scope', '$rootScope', '$http', '$location', '$routeParams',
        function ($scope, $rootScope, $http, $location, $routeParams) {

            $scope.myProducts = [];

            $scope.cancelSubscribe = function (product) {
                loaderToggle();

                // to do handler error
                $http.get('auth/cancelcredit?guid='+$rootScope.userGuid+'&product=' + product.telecomName + '&reasonid=1')
                    .then(function (res) {

                        var _prod = $scope.myProducts.find(function (prod) {
                            return prod.telecomName == product.telecomName;
                        });

                        console.log(_prod);

                        loaderToggle(true);
                    });
            };

            function loaderToggle(state) {
                var x = document.getElementById("cube-loader");

                if (state) {
                    x.style.display = "none";
                    return;
                }
                x.style.display = "flex";
            }

            // to do handler error
            $http.get('auth/clientproducts?guid='+$rootScope.userGuid)
                .then(function (res) {
                    $scope.myProducts = res.data;
                });
        }]);
