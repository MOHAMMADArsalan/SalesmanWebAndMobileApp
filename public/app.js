/// <reference path="../typings/tsd.d.ts" />
angular.module("myApp", ['ui.router', "ngMaterial", "app.signin", "app.signup", "app.home"])
    .controller("myCtrl", function () {
})
    .config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('teal')
        .accentPalette('orange');
});
