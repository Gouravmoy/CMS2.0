'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
    controller('AdminPagesCtrl', ['$scope', '$log', 'pagesFactory',
        function ($scope, $log, pagesFactory) {
            pagesFactory.getPages().then(
                function (response) {
                    $scope.allPages = response.data;
                },
                function (err) {
                    $log.error(err);
                });

            $scope.deletePage = function (id) {
                pagesFactory.deletePage(id);
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
    ]);
