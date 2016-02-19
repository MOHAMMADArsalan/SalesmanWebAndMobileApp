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
    //   var token  = localStorage.getItem("token");
    //   //Geo location Function
    //       _self.location = function (lat , long) {
    //           $state.go("location", {lat1 : lat , long1:  long });
    //       }
    _self.deliveredOrder = function (order) {
        commonService.deliveryOrder(order).then(function (response) {
            _self.OrderArray.$remove(order);
        }, function (err) {
            //  console.log(err);
        });
    };
    //   commonService.getOrder().then(function(response){
    //      console.log(response);
    //       _self.salemanData = response.data;
    //   },function(err){
    //     //  console.log(err);
    //   })
    commonService.getsaleman().then(function (response) {
        _self.salemanData = response.data;
    }, function (err) {
        //  console.log(err);
    });
    commonService.getproduct().then(function (response) {
        _self.product = response.data;
        //$rootScope.comapanyName = response.data[0].companyName
    }, function (err) {
        //console.log(err);
    });
}
