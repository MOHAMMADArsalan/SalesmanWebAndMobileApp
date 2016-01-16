/// <reference path="../../../typings/tsd.d.ts" />

angular.module("app.home",[])
.controller("HomeController", function($scope,$state){
    $scope.logout = function(){
       localStorage.removeItem("token");
        $state.go("signin");
    }
})