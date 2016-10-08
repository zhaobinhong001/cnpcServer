'use strict';

angular.module('core.role').factory('Role', ['$http', function ($http) {
    return {
        getRoles: function (cb) {
            var url = U_HOST_URL + "api/angular/getRole";
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
        getMenus:function (cb) {
            var url = U_HOST_URL + "api/angular/getMenu";
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
        addRoles:function (userInfo,cb) {
            var url = U_HOST_URL + "api/angular/addRole";
            $http({
                method:'POST',
                url:url,
                data:userInfo
            }).then(function success(response) {
                console.log(response);
                cb(response);
            }, function error(response) {
                cb(response);
            });
        },
        getRoleById:function (id,cb) {
            var url = U_HOST_URL + "api/angular/getRoleById";
            $http({
                method:'POST',
                url:url,
                data: {id:id},
            }).then(function success(response) {
                console.log(response);
                cb(response);
            }, function error(response) {
                cb(response);
            });
        },
        updateRoles:function (userInfo,cb) {
            var url = U_HOST_URL + "api/angular/updateRole";
            $http({
                method:'POST',
                url:url,
                data:userInfo
            }).then(function success(response) {
                console.log(response);
                cb(response);
            }, function error(response) {
                cb(response);
            });
        },
    }
}])
