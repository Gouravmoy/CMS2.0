'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
    controller('AdminPagesCtrl', ['$scope', '$log', 'pagesFactory', '$location', 'flashMessageService', '$route',
        function ($scope, $log, pagesFactory, $location, flashMessageService, $route) {
            pagesFactory.getPages().then(
                function (response) {
                    $scope.allPages = response.data;
                },
                function (err) {
                    $log.error(err);
                });

            $scope.deletePage = function (id) {
                pagesFactory.deletePage(id);
                flashMessageService.setMessage('Page Deleted');
                $location.path('/admin/pages');
                $route.reload();
            };
        }
    ])
    .controller('AdminLoginCtrl', ['$scope', '$location', '$cookies', 'AuthService', 'flashMessageService', '$log',
        function ($scope, $location, $cookies, AuthService, flashMessageService, $log) {
            $scope.credentials = {
                username: '',
                password: ''
            };
            $scope.login = function (credentials) {
                AuthService.login(credentials).then(
                    function (res, err) {
                        $cookies.loggedInUser = res.data;
                        $location.path('/admin/pages');
                    },
                    function (err) {
                        console.log(err.data);
                        flashMessageService.setMessage(err.data);
                        $log.log(err);
                    });
            };
        }
    ])
    .controller('AddEditPageCtrl', ['$scope', '$log', 'pagesFactory', '$routeParams', '$location', 'flashMessageService', '$filter',
        function ($scope, $log, pagesFactory, $routeParams, $location, flashMessageService, $filter) {
            $scope.pageContent = {};
            $scope.pageContent._id = $routeParams.id;
            $scope.heading = "Add a New Page";
            $scope.updateURL = function () {
                $scope.pageContent.url = $filter('formatURL')($scope.pageContent.title);
            };

            /*if (!angular.equals($scope.pageContent._id, 0)) {*/
            if ($scope.pageContent._id !== 'new') {
                $scope.heading = "Update Page";
                pagesFactory.getAdminPageContent($scope.pageContent._id).then(
                    function (response) {
                        $scope.pageContent = response.data;
                        $log.info($scope.pageContent);
                    },
                    function (err) {
                        $log.error(err);
                    });
            }

            $scope.savePage = function () {
                pagesFactory.savePages($scope.pageContent).then(
                    function () {
                        flashMessageService.setMessage("Page Saved Successfully");
                        $location.path('/admin/pages');
                    },
                    function () {
                        $log.error('error saving data');
                    }
                );
            };
        }
    ])
    .controller('AppCtrl', ['$scope', 'AuthService', 'flashMessageService', '$location', function ($scope, AuthService, flashMessageService, $location) {
        $scope.site = {
            logo: "img/logo.png",
            footer: "Gouravmoy Mohanty 2016 Angular CMS"
        };
        $scope.logout = function () {
            AuthService.logout().then(
                function () {

                    $location.path('/admin/login');
                    flashMessageService.setMessage("Successfully logged out");

                }, function (err) {
                    console.log('there was an error tying to logout');
                });
        };
    }
    ])
    .controller('PageCtrl', ['$scope', 'pagesFactory', '$routeParams', '$sce', function ($scope, pagesFactory, $routeParams, $sce) {
        var url = $routeParams.url;
        if(!url) url="home";
        pagesFactory.getPageContent(url).then(
            function (response) {
                $scope.pageContent = {};
                $scope.pageContent.title = response.data.title;
                $scope.pageContent.content = $sce.trustAsHtml(response.data.content);

            }, function () {
                console.log('error fetching data');
            });
    }]);

