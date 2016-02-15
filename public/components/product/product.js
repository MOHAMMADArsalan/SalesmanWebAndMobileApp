/// <reference path="../../../typings/tsd.d.ts" />
angular
    .module("app.product", [])
    .controller("ProductController", function ($http, $state, commonService) {
    var _self = this;
    _self.loader = false;
    _self.product = {};
    var ID = localStorage.getItem("token");
    /*   commonService.getCompany().then(function(response){
           // console.log(response.data[0]);
            //$rootScope.comapanyName = response.data[0].companyName
        },function(err){
            console.log(err);
        })*/
    this.addproduct = function () {
        _self.product.adminId = ID;
        _self.product.companyId = ID;
        _self.loader = true;
        $http.post("/router/addproduct", this.product).then(function (response) {
            // localStorage.setItem("token", response.data.token);
            commonService.showMsg("Product add successfully");
            _self.loader = false;
            $state.go("dashboard");
        }, function (err) {
            commonService.showMsg("Error to add Product");
            _self.loader = false;
        });
    };
});
