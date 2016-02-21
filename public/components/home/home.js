/// <reference path="../../../typings/tsd.d.ts" />
angular.module("app.home", [])
    .controller("HomeController", function ($scope, $state, commonService) {
    var _self = this;
    _self.isCompany = false;
    commonService.getCompany().then(function (response) {
        if (response.data.length == 0) {
        }
        else {
            _self.isCompany = response.data[0].comapanyName;
            $state.go("dashboard");
        }
    }, function (err) {
        console.log(err);
    });
});
