'use strict';

/* Directives */


angular.module('myApp.directives', []).
    /*directive('appVersion', ['version', function(version) {
     return function(scope, elm, attrs) {
     elm.text(version);
     };
     }]);*/

    directive('navBar', [
        function () {
            return {
                controller: function ($scope, pagesFactory, $location) {
                    var path = $location.path().substr(0, 6);
                    if (path == "/admin") {
                        $scope.navLinks = [{
                            title: 'Pages',
                            url: 'admin'
                        }, {
                            title: 'Site Settings',
                            url: 'admin/site-settings'
                        },];
                    } else {
                        pagesFactory.getPages().then(
                            function (response) {
                                $scope.navLinks = response.data;
                            }, function () {

                            });
                    }
                },
                templateUrl: 'partials/directives/nav.html'

            };
        }
    ])
    .directive('adminLogin', [
        function() {
            return {
                controller: function($scope, $cookies) {
                    $scope.loggedInUser = $cookies.loggedInUser;
                },
                templateUrl: 'partials/directives/admin-login.html'
            };
        }
    ]);
