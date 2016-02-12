/// <reference path="../../../typings/tsd.d.ts" />

angular
    .module("myApp")

    .service("commonService", function($http, $q, $mdToast) {

        let _self = this;
        _self.getAdmin = function() {
            var deferred = $q.defer();
            $http.get("/router/token").then(function(response) {
                deferred.resolve(response)
            }), function(err) {
                deferred.resolve(err)
            };
            return deferred.promise;
        }
       _self.getsaleman = function(){
           var deffered = $q.defer();
           $http.get("/router/getsaleman").then(function(response){
             deffered.resolve(response);  
           }),function(err){
               deffered.reject(err);
           }
           
           return deffered.promise;
       }
       _self.getCompany = function(){
           var deffered = $q.defer();
           $http.get("/router/getcompany").then(function(response){
             deffered.resolve(response);  
           }),function(err){
               deffered.reject(err);
           }
           
           return deffered.promise;
       }
        _self.showMsg = function(msg) {
            $mdToast.show(
                $mdToast
                    .simple()
                    .textContent(msg)
                    .position("top right")
                    .hideDelay(2000)
            )

       }
   
    });
