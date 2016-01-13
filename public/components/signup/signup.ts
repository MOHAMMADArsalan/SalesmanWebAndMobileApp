/// <reference path="../../../typings/tsd.d.ts" />
angular.module("app.signup",[])
.controller("SignupController",function($scope ,$http){
   $scope.signup = function(){
        $http.post("/api/signup",$scope.user).then(function(response){
            console.log(response);
        },function(err){
            console.log(err);
        })
    }
})