/// <reference path="../../../typings/tsd.d.ts" />

angular.module("app.location", [])
 
    .controller("LocationController", function ($scope,$stateParams,commonService) { 
       var  _self = this;
      var lat = $stateParams.lat * 1;
      var lng = $stateParams.lng * 1;
          angular.extend($scope, {
         center: {
            lat: lat,
            lng: lng,
            zoom: 20
        },
        markers :{
            center  : {
              lat: lat,
              lng: lng,
              message: "Order received from here!",
              focus: true,
              draggable: false
            }
        }
       });
  });