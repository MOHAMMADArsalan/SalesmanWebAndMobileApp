/// <reference path="../../../typings/tsd.d.ts" />
angular
    .module("app.addsaleman", [])
    .controller("SalemanController", function ($http, $state) {
    var _self = this;
    _self.loader = false;
    _self.user = {};
    this.addsalesman = function () {
        _self.user.role_admin = false;
        if (this.user.password == this.user.confirmpass) {
            _self.loader = true;
            $http.post("/api/addSalesman", this.user).then(function (response) {
                // localStorage.setItem("token", response.data.token);
                _self.loader = false;
                $state.go("dashboard");
            }, function (err) {
                this.error = err;
                _self.loader = false;
            });
        }
        else {
            _self.missMatchPass = "password don't match";
            _self.loader = false;
        }
    };
});
