'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
    factory('pagesFactory', ['$http', function ($http) {
        return {
            getPages: function () {
                return $http.get('/api/pages');
            },
            savePages: function (pageData) {
                var id = pageData._id;
                if (id === 'new') {
                    return $http.post('/api/pages/add', pageData);
                } else {
                    //return $http.post('/api/pages/add', pageData);
                    return $http.post('/api/pages/update', pageData);
                }

            }, deletePage: function (id) {
                return $http.get('/api/pages/delete/' + id);
            },
            getAdminPageContent: function (id) {
                return $http.get('/api/pages/admin-details/' + id);
            },
            getPageContent: function (url) {
                return $http.get('/api/pages/details/' + url);
            }
        };
    }])
    .factory('AuthService', ['$http', function ($http) {
        console.log('Redirrected Successfully');
        return {

            login: function (credentials) {
                return $http.post('/api/login', credentials);
            }
            ,
            logout: function () {
                return $http.get('/api/logout')
            }
        }
            ;
    }])
    .factory('myHttpInterceptor', ['$q', '$location', function ($q, $location) {
        return {
            response: function (response) {
                return response;
            },
            responseError: function (response) {
                if (response.status === 401) {
                    $location.path('/admin/login');
                    return $q.reject(response);
                }
                return $q.reject(response);
            }
        };
    }]);
