/// <reference path="../../typings/tsd.d.ts" />
angular.module("myApp")
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    var navtoolbar = {
        templateUrl: "../components/navtoolbar/navtoolbar.html"
    };
    var navloginbar = {
        templateUrl: "../components/navloginbar/navloginbar.html"
    };
    $stateProvider.state("signin", {
        url: "/signin",
        views: {
            'nav': navloginbar,
            'main': {
                templateUrl: "../components/signin/signin.html",
                controller: "SigninController"
            }
        }
    }).state("signup", {
        url: "/signup",
        views: {
            'nav': navloginbar,
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
                controller: "HomeController"
            }
        }
    })
        .state("company", {
        url: "/addcompany",
        loginCompulsory: true,
        views: {
            'nav': navtoolbar,
            'main': {
                templateUrl: "../components/company/company.html",
                controller: "CompanyController"
            }
        }
    })
        .state("dashboard", {
        url: "/dashboard",
        views: {
            'nav': navtoolbar,
            'main': {
                templateUrl: "../components/dashboard/dashboard.html",
                controller: "DashboardController",
                loginCompulsory: true
            }
        }
    });
    $urlRouterProvider.otherwise("/");
})
    .run(function ($rootScope, $state) {
    $rootScope.$on("$stateChangeStart", function (event, toState) {
        var firebaseLocalToken = localStorage.getItem("token");
        if (toState.loginCompulsory && firebaseLocalToken == null) {
            event.preventDefault();
            console.log(toState);
            $state.go("signin");
        }
    });
});
