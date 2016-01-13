/// <reference path="../../../typings/tsd.d.ts" />
angular.module("app.signin", [])
    .controller("SigninController", function($scope, $http, $state) {
        $scope.user = { username: '', password: '' };

        $scope.error = '';
        $scope.signin = function() {
            if ($scope.user.username != '' && $scope.user.password != '') {
                $http.post('/api/signin', $scope.user).then(function(response) {
                    console.log(response)
                    if (response.data == "User Signin Successfully") {
                        $state.go("home");
                    } else {
                        $scope.error = response.data;
                        console.log($scope.error);
                    }
                }, function(err) {
                    $scope.err = err;
                    console.log(err);
                });
            } else {
                $scope.error = "Username or password is missing";
            }
        }
        

    })