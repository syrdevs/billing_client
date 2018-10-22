'use strict';
angular.module('myApp', [
    'ngRoute',
    'myApp.dashboard',
    'myApp.client',
    'myApp.login',
    'myApp.services',
    'myApp.products',
    'myApp.cabinet',
    'myApp.purchase',
    'myApp.distributor'
]).config(['$locationProvider', '$routeProvider', "$httpProvider", function ($locationProvider, $routeProvider, $httpProvider) {
    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    $routeProvider.otherwise({redirectTo: '/'});
}])
    .controller('NavigationCtrl', ['$scope', '$rootScope', '$http', '$location', 'AuthService',
        function ($scope, $rootScope, $http, $location, authService) {

            $("#myModal").on("click",".btn-primary", function()
            {
                $location.path("products/guid=" + $rootScope.userGuid);
            });

            $rootScope.showModalBoot = function (errCode) {

                if(!errCode) return;

                var errors = {
                    "101":"Сервис Касперского не доступна",
                    "102":"Сервис Телеком не доступен",
                    "103":"Указанного продукта не существует!",
                    "100":"Успешно",
                    "105":"Имеется подписка на услугу!"
                };

                $('#myModal .modal-body').html("<p>"+errors[errCode]+"</p>");
                $('#myModal').modal('toggle');
            };

            var self = this

            $rootScope.selectedTab = $location.path() || '/';

            $scope.logout = function () {
                authService.removeJwtToken();
                $rootScope.authenticated = false;
                $location.path("#/");
                $rootScope.selectedTab = "/";
            }

            $scope.setSelectedTab = function (tab) {
                $rootScope.selectedTab = tab;
            }

            $scope.tabClass = function (tab) {
                if ($rootScope.selectedTab == tab) {
                    return "active";
                } else {
                    return "";
                }
            }

            if ($rootScope.authenticated) {
                $location.path('/');
                $rootScope.selectedTab = '/';
                return;
            }
        }
    ]);