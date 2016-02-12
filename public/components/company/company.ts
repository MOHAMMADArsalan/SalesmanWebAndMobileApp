/// <reference path="../../../typings/tsd.d.ts" />

angular
    .module("app.company", [])

    .controller("CompanyController", function($http, commonService, $state) {
        let _self = this;
        _self.lodder = false;
        _self.user = {};
        _self.user.adminID = null;
        commonService.getAdmin().then(function(response) {
            console.log(response)
            _self.user.adminID = response.data.data[0]._id;
        }, function(error) {
            console.log(error)
        })
        _self.addCompany = function() {
            _self.lodder = true;
            let fireToken = localStorage.getItem("token")
            $http.post("/api/addcompany", this.user).then(function(response) {
                commonService.showMsg(response.data.data)
                _self.lodder = false;
                $state.go("dashboard");
            }), function(err) {
               commonService.showMsg(err.data.Error)
                _self.lodder = false;
            };
        };

    }
    );
