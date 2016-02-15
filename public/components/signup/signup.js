/// <reference path="../../../typings/tsd.d.ts" />
angular.module("app.signup", [])
    .controller("SignupController", function ($http, $state, commonService) {
    var _self = this;
    _self.loader = false;
    this.signup = function () {
        if (this.user.password == this.user.confirmpass) {
            _self.loader = true;
            $http.post("/api/signup", this.user).then(function (response) {
                localStorage.setItem("token", response.data.token);
                commonService.showMsg("Signup Successfully");
                _self.loader = false;
                $state.go("signin");
            }, function (err) {
                commonService.showMsg("Error to sign up");
                _self.loader = false;
            });
        }
        else {
            commonService.showMsg("password does't match");
        }
    };
});
