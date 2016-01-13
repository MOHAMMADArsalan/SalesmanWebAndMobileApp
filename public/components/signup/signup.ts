/// <reference path="../../../typings/tsd.d.ts" />
angular.module("app.signup",[])
.controller("SignupController",function($scope ,$http,$state){
   $scope.signup = function(){
        $http.post("/api/signup",$scope.user).then(function(response){
            localStorage.setItem("token",response.data.token);
            $state.go("signin");
            console.log(response.data.token);
        },function(err){
            console.log(err);
        })
    }
})