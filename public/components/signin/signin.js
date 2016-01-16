/// <reference path="../../../typings/tsd.d.ts" />
angular.module("app.signin", [])
    .controller("SigninController", function ($scope, $http, $state) {
    $scope.user = { username: '', password: '' };
    $scope.error = 'Error';
    $scope.signin = function () {
        if ($scope.user.username != '' && $scope.user.password != '') {
            $http.post('/api/signin', $scope.user).then(function (response) {
                console.log(response.data.user);
                if (response.data.user == "User Signin Successfully") {
                    $state.go("home");
                    localStorage.setItem("token", response.data.data.firebaseToken);
                }
                else {
                    console.log($scope.error);
                }
            }, function (err) {
                $scope.err = err;
                console.log(err);
            });
        }
        else {
            $scope.error = "Username or password is missing";
        }
    };
});
