/// <reference path="../../../typings/tsd.d.ts" />
angular
    .module("app.viewproduct", [])

    .controller("ViewProductController", ["$http", "$state", "commonService", ProductController])

function ProductController($http, $state, commonService) {
    var _self = this;
    _self.loader = false;
    commonService.getproduct().then(function(response) {
        _self.product = response.data;
    }, function(err) {
        //console.log(err);
    })
}
       