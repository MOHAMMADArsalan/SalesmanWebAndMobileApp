/// <reference path="../../../typings/tsd.d.ts" />
angular
    .module("app.dashboard", ['firebase'])
    .controller("DashboardController", ['commonService', "$firebaseArray", '$http', '$timeout', "$state", dashboardController]);
function dashboardController(commonService, $http, $firebaseArray, $timeout, $state) {
    var _self = this;
    _self.companyName = "";
    commonService.getCompany().then(function (response) {
        _self.companyName = response.data[0].companyName;
        var ref = new Firebase("https://salesmanhybirdapp.firebaseio.com/" + _self.companyName + "/order");
        _self.OrderArray = commonService.Order(ref);
    }, function (err) {
        //  console.log(err);
    });
    _self.deliveredOrder = function (order) {
        commonService.deliveryOrder(order).then(function (response) {
            _self.OrderArray.$remove(order);
        }, function (err) {
            //  console.log(err);
        });
    };
}
