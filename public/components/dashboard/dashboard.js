/// <reference path="../../../typings/tsd.d.ts" />
angular
    .module("app.dashboard", ['firebase'])
    .controller("DashboardController", ['commonService', "$firebaseArray", '$http', '$timeout', dashboardController]);
function dashboardController(commonService, $http, $firebaseArray, $timeout) {
    var _self = this;
    var ref = new Firebase("https://salesmanhybirdapp.firebaseio.com/");
    _self.OrderArray = commonService.Order(ref);
    var token = localStorage.getItem("token");
    //    $timeout(function(){
    //         $http.get("/router/getorder?token="+token).then(function(response){
    //         console.log(response)
    //     }),function(err){
    //         console.log(err);
    //     }
    //    },1000*60)
    //  _self.data = function(){
    //           $http.get("/route/getorder").then(function(response){
    //         console.log(response)
    //     }),function(err){
    //         console.log(err);
    //     }
    //  }
    //  commonService.getCompany().then(function(response){
    //      // console.log(response.data[0].companyName);
    //     },function(err){
    //     //  console.log(err);
    //   })
    commonService.getOrder().then(function (response) {
        console.log(response);
        //_self.salemanData = response.data;
    }, function (err) {
        //  console.log(err);
    });
    commonService.getsaleman().then(function (response) {
        _self.salemanData = response.data;
    }, function (err) {
        //  console.log(err);
    });
    commonService.getproduct().then(function (response) {
        console.log(response.data);
        _self.product = response.data;
        //$rootScope.comapanyName = response.data[0].companyName
    }, function (err) {
        //console.log(err);
    });
}
