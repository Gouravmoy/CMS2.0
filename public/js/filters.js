'use strict';

/* Filters */

angular.module('myApp.filters', [])
    .filter('formatURL', [
        function () {
            return function (input) {
                var url = input.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
                var url = url.replace(/[\s+]/g, '-');
                return url.toLowerCase();

            };
        }
    ]);