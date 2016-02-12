/// <reference path="../../../typings/tsd.d.ts" />


angular
      .module("app.navtoolbar",[])
       
      .controller("NavtoolbarController",['$state',NavtoolbarController])
      
      function NavtoolbarController($state){
          var _self = this;
            _self.logout = function(){
             localStorage.removeItem("token");
            $state.go("signin");
    }
      }