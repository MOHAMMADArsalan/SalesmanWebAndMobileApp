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
                controller: "SignupController",
                controllerAs: "signup"
            }
        }
    })
        .state("home", {
        url: "/",
        views: {
            'nav': navtoolbar,
            'main': {
                templateUrl: "../components/home/home.html",
                controller: "HomeController",
                notLoggedIn: true
            }
        }
    });
    $urlRouterProvider.otherwise("/signin");
})
    .run(function ($rootScope, $state) {
    $rootScope.$on("$stateChangeStart", function (event, $state, toState) {
        var FirebaseToken = localStorage.getItem("token");
        if (toState.notLoggedIn && !FirebaseToken.token) {
            event.preventDefault();
            $state.go("signin");
        }
    });
});
