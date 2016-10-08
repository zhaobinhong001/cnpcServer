'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.module('auth').component('auth', {
    templateUrl: 'js/auth/auth.template.html',
    controller: ['$scope', 'Auth', '$location',
        function AuthController($scope, Auth, $location) {
             // alert("AuthController");
            $scope.login = function () {
                var data = {'userName': $scope.username, 'password': $scope.password};
                Auth.login(data, function (result) {
                    $scope.status = result.status;
                    if (result.status == 200) {
                        $location.path("/home")
                    } else {
                        $scope.error = result.data.message;
                    }
                    //console.log(JSON.stringify(result));
                });
            }

        }
    ]
});
