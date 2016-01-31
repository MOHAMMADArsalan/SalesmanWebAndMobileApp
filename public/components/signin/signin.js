/// <reference path="../../../typings/tsd.d.ts" />
angular.module("app.signin", [])
    .controller("SigninController", function ($scope, $http, $state) {
    $scope.user = { username: '', password: '' };
    $scope.error = 'Error';
    $scope.signin = function () {
        if ($scope.user.username != '' && $scope.user.password != '') {
            $http.post('/api/signin', $scope.user)
                .then(function (data) {
                var user = data.data;
                if (!user) {
                    console.log("Invalid user or password");
                }
                else {
                    localStorage.setItem("token", user.firebaseToken);
                    $state.go("home");
                }
            }, function (err) {
                console.log(err);
            });
        }
    };
});
