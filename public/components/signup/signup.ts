/// <reference path="../../../typings/tsd.d.ts" />
angular.module("app.signup", [])
    .controller("SignupController", function($http, $state) {
        var _self = this;
        _self.loader = false;
        this.signup = function() {
            if (this.user.password == this.user.confirmpass) {
                _self.loader = true;
                $http.post("/api/signup", this.user).then(function(response) {
                    localStorage.setItem("token", response.data.token);
                    _self.loader = false;
                    $state.go("signin");

                }, function(err) {
                    this.error = err;
                    _self.loader = false;
                })
            } else {
                _self.missMatchPass = "password don't match"
            }

        }
    })