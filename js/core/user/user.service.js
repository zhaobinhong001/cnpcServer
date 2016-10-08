'use strict';

angular.module('core.user').factory('User', ['$http', function ($http) {
    return {
        getUser: function (cb) {
            var url = U_HOST_URL + "api/angular/users";
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
        addUser:function (userInfo,cb) {
            var url = U_HOST_URL + "api/angular/addUsers";
            $http({
                method: 'POST',
                url: url,
                data:userInfo,
            }).then(function success(response) {
                console.log(response);
                cb(response);
            }, function error(response) {
                cb(response);
            });
        },
        getUserById:function (id,cb) {
            var url = U_HOST_URL + "api/angular/getUserById";
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
        },
        updateUsers:function (userInfo,cb) {
            var url = U_HOST_URL + "api/angular/updateUser";
            $http({
                method: 'POST',
                url: url,
                data:userInfo,
            }).then(function success(response) {
                console.log(response);
                cb(response);
            }, function error(response) {
                cb(response);
            });
        },
        stopUser:function (id,cb) {
            var url = U_HOST_URL + "api/angular/stopUser";
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
        },
        getUserName:function (name,cb) {
            var url = U_HOST_URL + "api/angular/getUserName";
            $http({
                method: 'POST',
                url: url,
                data: {name:name},
            }).then(function success(response) {
                console.log(response);
                cb(response);
            }, function error(response) {
                cb(response);
            });
        },
        updateUserpwd:function (userInfo,cb) {
            var url = U_HOST_URL + "api/angular/updateUserpwd";
            $http({
                method: 'POST',
                url: url,
                data:userInfo,
            }).then(function success(response) {
                console.log(response);
                cb(response);
            }, function error(response) {
                cb(response);
            });
        }
    }
}]);