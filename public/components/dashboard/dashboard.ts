/// <reference path="../../../typings/tsd.d.ts" />


angular 
      .module("app.dashboard",[])
      
      .controller("DashboardController",['$rootScope','commonService',dashboardController]);
      
      function dashboardController($rootScope,commonService) {
          let _self = this;
          commonService.getCompany().then(function(response){
              console.log(response.data[0].companyName);
              //$rootScope.comapanyName = response.data[0].companyName
          },function(err){
              console.log(err);
          })
        _self.getSaleman = function () {
              commonService.getsaleman().then(function(response){
              console.log(response.data);
              //$rootScope.comapanyName = response.data[0].companyName
          },function(err){
              console.log(err);
          })
        }
      }