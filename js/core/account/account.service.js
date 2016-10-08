'use strict';

angular.module('core.account').factory('Account', ['$http', function ($http) {
    return {
        register: function (userInfo, cb) {
            var url = U_HOST_URL + "api/angular/register";
            $http({
                method: 'POST',
                url: url,
                data: userInfo,
            }).then(function success(response) {
                console.log(response);
                cb(response);
            }, function error(response) {
                cb(response);
            });
        },
        getAccounts: function (cb) {
            var url = U_HOST_URL + "api/angular/accounts";
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
        getAccountById: function (id,cb) {
            var url = U_HOST_URL + "api/angular/getAccount";
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
