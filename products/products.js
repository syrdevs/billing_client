angular.module('myApp.products', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        //&ag_timestamp=:ag_timestamp%ag_rnd=:ag_rnd/ag_sign=:ag_sign
        $routeProvider.when('/products/guid=:guid/ag_timestamp=:timestamp/ag_rnd=:rnd/ag_sign=:sign'
            , {
                templateUrl: '/products/products.html',
                controller: 'ProductsCtrl'
            });
    }])
    .controller('ProductsCtrl', ['$scope', '$rootScope', '$http', '$location', '$routeParams',
        function ($scope, $rootScope, $http, $location, $routeParams) {

            $scope.guid = $routeParams.guid;
            $rootScope.userGuid = $routeParams.guid;
            $rootScope.serviceParams = {
                ag_timestamp: $routeParams.timestamp,
                ag_rnd: $routeParams.rnd,
                ag_sign: $routeParams.sign
            };

            function loaderToggle(state) {
                var x = document.getElementById("cube-loader");

                if (state) {
                    x.style.display = "none";
                    return;
                }
                x.style.display = "flex";
            }


            $scope.toProducts = function () {
                $location.path("products/guid=" + $rootScope.userGuid + $rootScope.encodeByObj($rootScope.serviceParams));
            };

            loaderToggle();

            $http.get('auth/getproducts?guid=' + $scope.guid + $rootScope.encodeByObj($rootScope.serviceParams))
                .then(function (res) {
                    loaderToggle(true);

                    if (res.data.length === 0) {
                        $location.path('error/404');
                        return;
                    }

                    $scope.products = res.data;

                }, function (err) {
                    if (err.status === 500) {
                        $location.path('error/404');
                    }
                })

            $scope.selected = -1;
            $scope.onDetailShow = function (product, index) {
                if ($scope.selected !== index)
                    $scope.selected = index;
                else $scope.selected = -1;
            };
            $scope.onPurchase = function (product, index) {
                $location.path("purchase/" + product.telecomName);
            };


            $scope.getisfree = function (guid, product) {
                $http.get('auth/isfree?guid=' + guid + "&product=" + product)
                    .then(function (res) {
                        return res.data;
                    });
            }


        }]);
