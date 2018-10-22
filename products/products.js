angular.module('myApp.products', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/products/guid=:uuid', {
            templateUrl: '/products/products.html',
            controller: 'ProductsCtrl'
        });
    }])
    .controller('ProductsCtrl', ['$scope', '$rootScope', '$http', '$location', '$routeParams',
        function ($scope, $rootScope, $http, $location, $routeParams) {

            $scope.guid = $routeParams.uuid;
            $rootScope.userGuid = $routeParams.uuid;

            $scope.toProducts = function(){
                $location.path("products/guid=" + $rootScope.userGuid);
            };

            $rootScope.showModalBoot("101");

            $http.get('auth/getproducts?guid=' + $scope.guid)
                .then(function (res) {
                    $scope.products = res.data;
                });
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
                        console.log(res.data);
                        return res.data;
                    });
            }


        }]);
