/// <reference path="../../../typings/tsd.d.ts" />
angular.module("app.signin", [])
    .controller("SigninController", function ($http, $state, commonService) {
    var _self = this;
    _self.user = { username: '', password: '' };
    _self.error = 'Error';
    _self.loader = false;
    _self.signin = function () {
        if (_self.user.username != '' && _self.user.password != '') {
            _self.loader = true;
            $http.post('/api/signin', _self.user)
                .then(function (data) {
                var user = data.data;
                if (!user) {
                    commonService.showMsg("Invalid user or password");
                    _self.loader = false;
                }
                else {
                    commonService.showMsg("Signin Successfully");
                    localStorage.setItem("token", user.firebaseToken);
                    $state.go("home");
                    _self.loader = false;
                }
            }, function (err) {
                commonService.showMsg("Error Signin");
                _self.loader = false;
            });
        }
    };
});
