/// <reference path="../../../typings/tsd.d.ts" />
angular
    .module("app.viewsaleman", [])
    .controller("ViewSalemnanController", ["$http", "$state", "commonService", ViewSalemnanController]);
function ViewSalemnanController($http, $state, commonService) {
    var _self = this;
    _self.loader = false;
    _self.show = false;
    //Get all Saleman 
    commonService.getsaleman().then(function (response) {
        _self.salemanData = response.data;
    }, function (err) {
        //  console.log(err);
    });
    //Get one saleman
    _self.viewSalemanDetail = function (obj) {
        var firebaseToken = obj;
        _self.show = true;
        commonService.getsalemandetail(firebaseToken).then(function (response) {
            _self.saleman = response.data;
            console.log
        }, function (err) {
            //  console.log(err);
        });
    };
}
