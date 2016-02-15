/// <reference path="../typings/tsd.d.ts" />
angular.module("myApp", ["ui.router", "ngMaterial", "ngMdIcons", "app.signin", "app.signup", "app.home", "app.company", "app.dashboard", "app.navtoolbar", "app.navloginbar", "app.addsaleman", "app.product"])
    .controller("myCtrl", function () {
})
    .config(function ($mdThemingProvider) {
    $mdThemingProvider.theme("default")
        .primaryPalette("teal")
        .accentPalette("orange");
});
