/* global angular, document, window */
'use strict';

angular.module('starter.controllers', ['firebase'])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})

.controller('LoginCtrl', function($scope, $timeout, $http ,$stateParams, $state,ionicMaterialInk) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
      $scope.user = { username: '', password: '' };
           $scope.signin = function() {
            if ($scope.user.username != '' && $scope.user.password != '') {
                $scope.loader = true;
                $http.post('http://localhost:9000/api/signin', $scope.user)
                    .then(
                    function(data) {
                        var user = data.data;
                        console.log(user)
                        if (!user) {
                            //commonService.showMsg("Invalid user or password")
                            $scope.loader = false;
                        }
                        else {
                           // commonService.showMsg("Signin Successfully")
                            localStorage.setItem("token", user.firebaseToken);
                            $state.go("app.dashboard");
                            $scope.loader = false;
                        }
                    },
                    function(err) {
                        //commonService.showMsg("Error Signin")
                        $scope.loader = false;
                    });
}
}
    ionicMaterialInk.displayEffect();
})

.controller('OrderCtrl', function($scope, $stateParams,$http,$timeout, ionicMaterialInk,$firebaseObject,$firebaseArray,ionicMaterialMotion) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
    
    //submit order request
    var token = localStorage.getItem("token")
    var companyId = localStorage.getItem("data");
    $scope.order = {}
    $scope.order.salemanId = token;
    $scope.order.companyId = companyId;
    $scope.takeOrder = function(user){
        var ref = new Firebase("/https://salesmanhybirdapp.firebaseio.com");
       // var refObj = new Firebase("/https://salesmanhybirdapp.firebaseio.com/order");
        $scope.order = $firebaseArray(ref)
      // $scope.User = $firebaseObject(refObj)
      
        $scope.order.$add(user)
        $http.post("http://localhost:9000/router/takeorder?token="+token,user).then(function(response){
            console.log(response)
        }),function(err){
            console.log(err);
        }
    }
})

.controller('ProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ActivityCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})

.controller('DashboardCtrl', function($scope,$http,$stateParams, $q,$timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });
      var token = localStorage.getItem("token")
    //Get company data from Mongodb
     $scope.getCompany = function(){
           var deffered = $q.defer();
           $http.get("http://localhost:9000/router/getcompany?token="+token).then(function(response){
             deffered.resolve(response);  
           }),function(err){
               deffered.reject(err);
           }
           
           return deffered.promise;
       }
       $scope.adminId = "";
     $scope.getCompany().then(function(response){
              console.log(response.data[0].adminId);
              $scope.adminId = response.data[0].adminId;
              localStorage.setItem("data" ,response.data[0].adminId)
            },function(err){
            //  console.log(err);
          })
           //Get product data from Mongodb
      $scope.getproduct = function(){
           var deffered = $q.defer();
           var adminId = localStorage.getItem("data")
           $http.get("http://localhost:9000/router/getproduct?token="+adminId).then(function(response){
             deffered.resolve(response);  
           }),function(err){
               deffered.reject(err);
           }
           
           return deffered.promise;
       }
       
         $scope.getproduct().then(function(response){
             console.log(response.data);
              $scope.product = response.data;
              
              //$rootScope.comapanyName = response.data[0].companyName
          },function(err){
              //console.log(err);
          })

})

;
