/// <reference path="../../typings/tsd.d.ts" />
angular.module("myApp")
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    var navtoolbar = {
        templateUrl: "../components/navtoolbar/navtoolbar.html",
        controller: "NavtoolbarController",
        controllerAs: "navtoolbar"
    };
    var navloginbar = {
        templateUrl: "../components/navloginbar/navloginbar.html",
        controller: "NavLoginbarController",
        controllerAs: "navloginbar"
    };
    $stateProvider.state("signin", {
        url: "/signin",
        views: {
            "nav": navloginbar,
            "main": {
                templateUrl: "../components/signin/signin.html",
                controller: "SigninController",
                controllerAs: "signin"
            }
        }
    }).state("signup", {
        url: "/signup",
        views: {
            "nav": navloginbar,
            "main": {
                templateUrl: "../components/signup/signup.html",
                controller: "SignupController",
                controllerAs: "signup"
            }
        }
    })
        .state("home", {
        url: "/",
        loginCompulsory: true,
        views: {
            "nav": navtoolbar,
            "main": {
                templateUrl: "../components/home/home.html",
                controller: "HomeController",
            }
        }
    })
        .state("company", {
        url: "/addCompany",
        loginCompulsory: true,
        views: {
            "nav": navtoolbar,
            "main": {
                templateUrl: "../components/company/company.html",
                controller: "CompanyController",
                controllerAs: "company"
            }
        }
    })
        .state("dashboard", {
        url: "/dashboard",
        loginCompulsory: true,
        views: {
            "nav": navtoolbar,
            "main": {
                templateUrl: "../components/dashboard/dashboard.html",
                controller: "DashboardController",
                controllerAs: "dashboard"
            }
        }
    })
        .state("addsaleman", {
        url: "/addsaleman",
        loginCompulsory: true,
        views: {
            "nav": navtoolbar,
            "main": {
                templateUrl: "../components/addsaleman/addsaleman.html",
                controller: "SalemanController",
                controllerAs: "saleman"
            }
        }
    });
    $urlRouterProvider.otherwise("/");
    $httpProvider.interceptors.push("httpInterceptor");
})
    .run(function ($rootScope, $state) {
    $rootScope.$on("$stateChangeStart", function (event, toState) {
        var firebaseLocalToken = localStorage.getItem("token");
        if (toState.loginCompulsory && firebaseLocalToken == null) {
            event.preventDefault();
            $state.go("signin");
        }
    });
})
    .factory("httpInterceptor", function () {
    return {
        request: function (config) {
            var firebaseToken = localStorage.getItem("token");
            if (firebaseToken) {
                config.url = config.url + "?token=" + firebaseToken;
            }
            return config;
        }
    };
});
