'use strict';

angular.module('core.auth').factory('Auth', ['$http', function ($http) {
    return {
        login: function (loginInfo, cb) {
            var url = U_HOST_URL + "api/web/login";
            $http({
                method: 'POST',
                url: url,
                data: loginInfo,
            }).then(function success(response) {
                console.log(response);
                cb(response);
            }, function error(response) {
                cb(response);
            });
        },
        getAuthRecords: function (cb) {
            var url = U_HOST_URL + "api/angular/records";
            $http({
                method: 'POST',
                url: url,
            }).then(function success(response) {
                console.log(response);
                cb(response);
            }, function error(response) {
                cb(response);
            });
        },
        reviewRecord: function (id,allow,cb) {
            var url = U_HOST_URL + "api/angular/reviewRecord";
            $http({
                method: 'POST',
                url: url,
                data: {id:id,allow:allow},
            }).then(function success(response) {
                console.log(response);
                cb(response);
            }, function error(response) {
                cb(response);
            });
        },
        getAuthRecordById: function (id,cb) {
            var url = U_HOST_URL + "api/angular/getRecord";
            $http({
                method: 'POST',
                url: url,
                data: {id:id},
            }).then(function success(response) {
                console.log(response);
                cb(response);
            }, function error(response) {
                cb(response);
            });
        }

    }

}
]);
