/// <reference path="../../typings/tsd.d.ts" />
angular.module("myApp")
    .config(function ($stateProvider, $urlRouterProvider) {
    var navtoolbar = {
        templateUrl: "../components/navtoolbar/navtoolbar.html"
    };
    $stateProvider.state("signin", {
        url: "/signin",
        views: {
            'nav': navtoolbar,
            'main': {
                templateUrl: "../components/signin/signin.html",
                controller: "SigninController"
            }
        }
    }).state("signup", {
        url: "/signup",
        views: {
            'nav': navtoolbar,
            'main': {
                templateUrl: "../components/signup/signup.html",
                controller: "SignupController"
            }
        }
    })
        .state("home", {
        url: "/",
        views: {
            'nav': navtoolbar,
            'main': {
                templateUrl: "../components/home/home.html",
                controller: "SignupController",
                notLoggedIn: true
            }
        }
    });
    $urlRouterProvider.otherwise("/home");
})
    .run(function ($rootScope, $state) {
    var FirebaseToken = localStorage.getItem("token");
    $rootScope.$on("$stateChangeStart", function (event, toState) {
        if (toState.notLoggedIn) {
            event.preventDefault();
            $state.go("signin");
        }
    });
});
