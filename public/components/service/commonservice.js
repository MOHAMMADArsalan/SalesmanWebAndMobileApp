/// <reference path="../../../typings/tsd.d.ts" />
angular
    .module("myApp")
    .service("commonService", function ($http, $firebaseArray, $q, $mdToast) {
    var _self = this;
    _self.Order = function (ref) {
        _self.OrderArray = $firebaseArray(ref);
        return _self.OrderArray;
    };
    _self.GetLocation = function ($scope, lat, long) {
        console.log(lat, long);
    };
    _self.getAdmin = function () {
        var deferred = $q.defer();
        $http.get("/router/token").then(function (response) {
            deferred.resolve(response);
        }), function (err) {
            deferred.resolve(err);
        };
        return deferred.promise;
    };
    _self.getsaleman = function () {
        var deffered = $q.defer();
        $http.get("/router/getsaleman").then(function (response) {
            deffered.resolve(response);
        }), function (err) {
            deffered.reject(err);
        };
        return deffered.promise;
    };
    _self.getproduct = function () {
        var deffered = $q.defer();
        $http.get("/router/getproduct").then(function (response) {
            deffered.resolve(response);
        }), function (err) {
            deffered.reject(err);
        };
        return deffered.promise;
    };
    _self.getCompany = function () {
        var deffered = $q.defer();
        $http.get("/router/getcompany").then(function (response) {
            deffered.resolve(response);
        }), function (err) {
            deffered.reject(err);
        };
        return deffered.promise;
    };
    _self.getOrder = function () {
        var deffered = $q.defer();
        $http.get("/router/getorder").then(function (response) {
            deffered.resolve(response);
        }), function (err) {
            deffered.reject(err);
        };
        return deffered.promise;
    };
    _self.deliveryOrder = function (order) {
        var deffered = $q.defer();
        $http.post("/router/deliveryOrder", order).then(function (response) {
            deffered.resolve(response);
        }), function (err) {
            deffered.reject(err);
        };
        return deffered.promise;
    };
    _self.getDeliveryOrder = function (companyid) {
        var deffered = $q.defer();
        $http.get("/router/deliveryOrder/" + companyid).then(function (response) {
            deffered.resolve(response);
        }), function (err) {
            deffered.reject(err);
        };
        return deffered.promise;
    };
    _self.showMsg = function (msg) {
        $mdToast.show($mdToast
            .simple()
            .textContent(msg)
            .position("top right")
            .hideDelay(2000));
    };
});
