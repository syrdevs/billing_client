angular.module('myApp.purchase', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/purchase/:code', {
            templateUrl: 'purchase/purchase.html',
            controller: 'PurchaseCtrl'
        });
    }])
    .controller('PurchaseCtrl', ['$scope', '$rootScope', '$http', '$location', '$routeParams', '$timeout',
        function ($scope, $rootScope, $http, $location, $routeParams, $timeout) {

            $scope.productData = {};
            $scope.clientEmail = "";

            $scope.toProducts = function () {
                $location.path("products/guid=" + $rootScope.userGuid + $rootScope.encodeByObj($rootScope.serviceParams, "/"));
            };

            function loaderToggle(state) {
                var x = document.getElementById("cube-loader");

                if (state) {
                    x.style.display = "none";
                    return;
                }
                x.style.display = "flex";
            }

            $http.get('auth/getoneproduct?guid=' + $rootScope.userGuid + "&product=" + $routeParams.code + $rootScope.encodeByObj($rootScope.serviceParams))
                .then(function (res) {
                    $scope.productData = res.data;
                });

            function ValidateEmail(mail) {
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
                    return (true)
                }
                return (false)
            }

            $scope.onPurchase = function () {

                $check = $("#confirm-purchase-agree").prop('checked');
                $email_error = $("#email-error-message");
                $email = $("#email").val();

                if ($email.length > 0 && !ValidateEmail($scope.clientEmail)) {
                    $email_error.show();
                    $email_error.text("Неправильный email адрес");
                    $("#email").focus();
                    return;
                } else if ($email.length == 0) {
                    $email_error.show();
                    $email_error.text("Заполните поле");
                    $("#email").focus();
                    return;
                } else {
                    $email_error.hide();
                }

                if ($check && $email.length > 0) {
                    ///to email
                    loaderToggle();
                    // to do handler error
                    $http.get('auth/setcredit?guid=' + $rootScope.userGuid + '&product_code=' + $routeParams.code + "&email=" + $scope.clientEmail + $rootScope.encodeByObj($rootScope.serviceParams))
                        .then(function (res) {
                            loaderToggle(true);

                            if (res.data.errcode == "100") {
                                $location.path("distributor/" + $routeParams.code);
                            } else {
                                $rootScope.showModalBoot(res.data.errcode);
                            }
                        });
                    $("#confirm-purchase-agree-message").hide();
                } else {
                    $("#confirm-purchase-agree-message").show();
                }
            };

        }]);
