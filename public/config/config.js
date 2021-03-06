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
                controllerAs: "home"
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
        .state("product", {
        url: "/addproduct",
        loginCompulsory: true,
        views: {
            "nav": navtoolbar,
            "main": {
                templateUrl: "../components/product/product.html",
                controller: "ProductController",
                controllerAs: "product"
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
    })
        .state("location", {
        url: "/location/:lat/:lng",
        loginCompulsory: true,
        views: {
            "main": {
                templateUrl: "../components/location/location.html",
                controller: "LocationController",
                controllerAs: "location"
            }
        }
    })
        .state("deliveryrecord", {
        url: "/deliveryrecord",
        loginCompulsory: true,
        views: {
            "main": {
                templateUrl: "../components/deliveryrecord/deliveryrecord.html",
                controller: "DeliveryRecordController",
                controllerAs: "deliveryrecord"
            }
        }
    })
        .state("viewproduct", {
        url: "/viewproduct",
        loginCompulsory: true,
        views: {
            "nav": navtoolbar,
            "main": {
                templateUrl: "../components/viewproduct/viewproduct.html",
                controller: "ViewProductController",
                controllerAs: "viewproduct"
            }
        }
    })
        .state("viewsaleman", {
        url: "/viewsaleman",
        loginCompulsory: true,
        views: {
            "main": {
                templateUrl: "../components/viewsaleman/viewsaleman.html",
                controller: "ViewSalemnanController",
                controllerAs: "viewsaleman"
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
