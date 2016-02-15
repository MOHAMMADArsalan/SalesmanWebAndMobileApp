/// <reference path="../../../typings/tsd.d.ts" />
angular
    .module("app.addsaleman", [])
    .controller("SalemanController", function ($http, $state, commonService) {
    var _self = this;
    _self.loader = false;
    _self.user = {};
    _self.user.companyName = null;
    commonService.getCompany().then(function (response) {
        console.log(response.data);
        _self.user.companyName = response.data[0].companyName;
    }, function (err) {
        //  console.log(err);
    });
    this.addsalesman = function () {
        _self.user.role_admin = false;
        // _self.user.companyName = response.data[0].companyName;
        if (this.user.password == this.user.confirmpass) {
            _self.loader = true;
            $http.post("/api/addSalesman", this.user).then(function (response) {
                commonService.showMsg("saleman add successfully");
                _self.loader = false;
                $state.go("dashboard");
            }, function (err) {
                commonService.showMsg("Error to sign up");
                console.log("6272");
                this.error = err;
                _self.loader = false;
            });
        }
        else {
            commonService.showMsg("password don't match");
            // _self.missMatchPass = ""
            console.log("62");
            _self.loader = false;
        }
    };
});
