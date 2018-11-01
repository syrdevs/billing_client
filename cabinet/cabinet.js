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


            $scope.toCabinet = function () {
                $location.path("products/guid=" + $rootScope.userGuid + $rootScope.encodeByObj($rootScope.serviceParams, "/"));
            };

            $scope.getDistrubutor = function (product, e) {
                $location.path("distributor/" + product.telecomName);
            };

            $scope.cancelSubscribe = function (product) {
                loaderToggle();

                // to do handler error
                $http.get('auth/cancelcredit?guid=' + $rootScope.userGuid + '&product=' + product.telecomName + '&reasonid=1' + $rootScope.encodeByObj($rootScope.serviceParams))
                    .then(function (res) {
                        if (res.data.errcode == "100") {
                            $scope.myProducts = $scope.myProducts.filter(function (prod) {
                                return prod.telecomName != product.telecomName;
                            });
                        } else {
                            $rootScope.showModalBoot(res.data.errcode);
                        }

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
            $http.get('auth/clientproducts?guid=' + $rootScope.userGuid + $rootScope.encodeByObj($rootScope.serviceParams))
                .then(function (res) {
                    $scope.myProducts = res.data;
                });
        }]);
