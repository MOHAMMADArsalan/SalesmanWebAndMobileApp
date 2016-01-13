/// <reference path="../../../typings/tsd.d.ts" />
angular.module("app.home", [])
    .controller("HomeController", function ($scope) {
    $scope.greeting = "Hello World";
});
