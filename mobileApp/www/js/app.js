// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ionic-material', 'ionMdInput','ngCordova'])

.run(function($ionicPlatform,$rootScope, $state) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
    //if user is login it will redirect to dashboard
     $rootScope.$on("$stateChangeStart", function(event, toState){
      var firebaseLocalToken = localStorage.getItem("token");
      if (toState.loginCompulsory && firebaseLocalToken != null) {
        event.preventDefault();
        $state.go("app.dashboard");
      }
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // Turn off caching for demo simplicity's sake
//    $ionicConfigProvider.views.maxCache(0);

    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

        $stateProvider.state('login', {
        url: '/login',
        loginCompulsory : true,
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'

    })



    .state('app.order', {
        url: '/order',
        views: {
            'menuContent': {
                templateUrl: 'templates/order.html',
                controller: 'OrderCtrl',
            },

        }
    })

    .state('app.dashboard', {
        url: '/dashboard',
        views: {
            'menuContent': {
                templateUrl: 'templates/dashboard.html',
                controller: 'DashboardCtrl',
            },

        }
    })
  .state('app.profile', {
        url: '/profile',
        views: {
            'menuContent': {
                templateUrl: 'templates/profile.html',
                controller: 'ProfileCtrl',

            },

        }
    })
    ;

    // if none of the above states are matched, use this as the fallback
  //  $urlRouterProvider.otherwise('/login');
    $urlRouterProvider.otherwise(function($injector, $location){
     var $state = $injector.get("$state");
     $state.go('login');
})
})
