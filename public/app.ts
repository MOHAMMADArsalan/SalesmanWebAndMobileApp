/// <reference path="../typings/tsd.d.ts" />

angular.module("myApp", ["ui.router", 'leaflet-directive', "ngMaterial", 'md.data.table', "ngMdIcons", "app.signin", "app.signup", "app.home", "app.company", "app.dashboard", "app.navtoolbar", "app.navloginbar", "app.addsaleman", "app.product", "app.deliveryrecord",'app.location'])
      .config(function ($mdThemingProvider) {
            $mdThemingProvider.theme("default")
                .primaryPalette("teal")
                .accentPalette("orange");
        })

    .controller("myCtrl", function ($scope) { 
       var  _self = this;
    //   angular.extend($scope, {
    //     center: {
    //         lat: 24.8135954,
    //         lng: 67.0482967,
    //         zoom: 20
    //     },
    //     markers :{
    //         center  : {
    //            lat: 24.8135954,
    //            lng: 67.0482967, 
    //            message: "Order received from here!",
    //            focus: true,
    //            draggable: false
    //         }
    //     }
    // });
  });

