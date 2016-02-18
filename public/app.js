/// <reference path="../typings/tsd.d.ts" />
angular.module("myApp", ["ui.router", "ngMaterial", 'md.data.table', "ngMdIcons", "app.signin", "app.signup", "app.home", "app.company", "app.dashboard", "app.navtoolbar", "app.navloginbar", "app.addsaleman", "app.product", "app.deliveryrecord"])
    .controller("myCtrl", function () {
})
    .config(function ($mdThemingProvider) {
    $mdThemingProvider.theme("default")
        .primaryPalette("teal")
        .accentPalette("orange");
});
