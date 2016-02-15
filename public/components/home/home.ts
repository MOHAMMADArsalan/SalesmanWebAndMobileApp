/// <reference path="../../../typings/tsd.d.ts" />

angular.module("app.home",[])
.controller("HomeController", function($scope,$state,commonService){
     var _self = this;
     _self.isCompany = false;
     commonService.getCompany().then(function(response){
             // console.log(response.data[0].companyName);
          _self.isCompany = response.data[0].companyName;
          $state.go("dashboard")
          },function(err){
              console.log(err);
          })
})