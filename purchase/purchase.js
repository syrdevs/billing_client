angular.module('myApp.purchase', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/purchase/:code', {
            templateUrl: 'purchase/purchase.html',
            controller: 'PurchaseCtrl'
        });
    }])
    .controller('PurchaseCtrl', ['$scope', '$rootScope', '$http', '$location', '$routeParams', '$timeout',
        function ($scope, $rootScope, $http, $location, $routeParams, $timeout) {

            function loaderToggle(state) {
                var x = document.getElementById("cube-loader");

                if (state) {
                    x.style.display = "none";
                    return;
                }
                x.style.display = "flex";
            }

            $scope.onPurchase = function () {

                loaderToggle();

                // to do handler error
                $http.get('auth/setcredit?guid='+$rootScope.userGuid+'&product_code=' +$routeParams.code)
                    .then(function (res) {
                        loaderToggle(true);
                        $location.path("distributor/"+$routeParams.code);
                    });


            };

        }]);
