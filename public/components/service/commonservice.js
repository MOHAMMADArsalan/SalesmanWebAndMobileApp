/// <reference path="../../../typings/tsd.d.ts" />
angular
    .module("myApp")
    .service("commonService", function ($http, $firebaseArray, $q, $mdToast) {
    var _self = this;
    //Firebase Array
    _self.Order = function (ref) {
        _self.OrderArray = $firebaseArray(ref);
        return _self.OrderArray;
    };
    //Get admin detail
    _self.getAdmin = function () {
        var deferred = $q.defer();
        $http.get("/router/token").then(function (response) {
            deferred.resolve(response);
        }), function (err) {
            deferred.resolve(err);
        };
        return deferred.promise;
    };
    //Get All Saleman Data 
    _self.getsaleman = function () {
        var deffered = $q.defer();
        $http.get("/router/getsaleman").then(function (response) {
            deffered.resolve(response);
        }), function (err) {
            deffered.reject(err);
        };
        return deffered.promise;
    };
    //Get One Saleman Data 
    _self.getsalemandetail = function (firebaseToken) {
        var deffered = $q.defer();
        $http.get("/router/getOnesaleman/" + firebaseToken).then(function (response) {
            deffered.resolve(response);
        }), function (err) {
            deffered.reject(err);
        };
        return deffered.promise;
    };
    //Get all Product        
    _self.getproduct = function () {
        var deffered = $q.defer();
        $http.get("/router/getproduct").then(function (response) {
            deffered.resolve(response);
        }), function (err) {
            deffered.reject(err);
        };
        return deffered.promise;
    };
    //Get current admin company
    _self.getCompany = function () {
        var deffered = $q.defer();
        $http.get("/router/getcompany").then(function (response) {
            deffered.resolve(response);
        }), function (err) {
            deffered.reject(err);
        };
        return deffered.promise;
    };
    //Get all order from mongodb
    _self.getOrder = function () {
        var deffered = $q.defer();
        $http.get("/router/getorder").then(function (response) {
            deffered.resolve(response);
        }), function (err) {
            deffered.reject(err);
        };
        return deffered.promise;
    };
    //Save devilry data to mongodb and remove order schema 
    _self.deliveryOrder = function (order) {
        var deffered = $q.defer();
        $http.post("/router/deliveryOrder", order).then(function (response) {
            deffered.resolve(response);
        }), function (err) {
            deffered.reject(err);
        };
        return deffered.promise;
    };
    //get all delivery data by company
    _self.getDeliveryOrder = function (companyid) {
        var deffered = $q.defer();
        $http.get("/router/deliveryOrder/" + companyid).then(function (response) {
            deffered.resolve(response);
        }), function (err) {
            deffered.reject(err);
        };
        return deffered.promise;
    };
    //md toast message
    _self.showMsg = function (msg) {
        $mdToast.show($mdToast
            .simple()
            .textContent(msg)
            .position("right top")
            .hideDelay(2000));
    };
});
