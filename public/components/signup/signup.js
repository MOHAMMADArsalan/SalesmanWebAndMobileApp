/// <reference path="../../../typings/tsd.d.ts" />
angular.module("app.signup", [])
    .controller("SignupController", function ($http, $state) {
    var _self = this;
    this.signup = function () {
        $http.post("/api/signup", this.user).then(function (response) {
            console.log(response.data.token);
            localStorage.setItem("token", response.data.token);
            $state.go("signin");
        }, function (err) {
            this.error = err;
        });
    };
});
