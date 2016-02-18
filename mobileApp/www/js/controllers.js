/* global angular, document, window */
'use strict';

angular.module('starter.controllers', ['firebase'])
    .service("commonService" ,function($http,$q){
          var token = localStorage.getItem("token")
        //Get company data from Mongodb
        this.getCompany = function () {
            var deffered = $q.defer();
            $http.get("http://localhost:9000/router/getcompany?token=" + token).then(function (response) {
                deffered.resolve(response);
            }), function (err) {
                deffered.reject(err);
            }

            return deffered.promise;
        }
        
      
    })
    .controller('AppCtrl', function ($scope, $state, $ionicModal, $ionicPopover, $timeout) {
        // Form data for the login modal
        $scope.loginData = {};
        $scope.isExpanded = false;
        $scope.hasHeaderFabLeft = false;
        $scope.hasHeaderFabRight = false;

        var navIcons = document.getElementsByClassName('ion-navicon');
        for (var i = 0; i < navIcons.length; i++) {
            navIcons.addEventListener('click', function () {
                this.classList.toggle('active');
            });
        }
        // logout Function
    
        $scope.logout = function () {
            localStorage.removeItem("token");
            localStorage.removeItem("data");
            $state.go("login")
        }
   
        ////////////////////////////////////////
        // Layout Methods
        ////////////////////////////////////////

        $scope.hideNavBar = function () {
            document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
        };

        $scope.showNavBar = function () {
            document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
        };

        $scope.noHeader = function () {
            var content = document.getElementsByTagName('ion-content');
            for (var i = 0; i < content.length; i++) {
                if (content[i].classList.contains('has-header')) {
                    content[i].classList.toggle('has-header');
                }
            }
        };

        $scope.setExpanded = function (bool) {
            $scope.isExpanded = bool;
        };

        $scope.setHeaderFab = function (location) {
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

        $scope.hasHeader = function () {
            var content = document.getElementsByTagName('ion-content');
            for (var i = 0; i < content.length; i++) {
                if (!content[i].classList.contains('has-header')) {
                    content[i].classList.toggle('has-header');
                }
            }

        };

        $scope.hideHeader = function () {
            $scope.hideNavBar();
            $scope.noHeader();
        };

        $scope.showHeader = function () {
            $scope.showNavBar();
            $scope.hasHeader();
        };

        $scope.clearFabs = function () {
            var fabs = document.getElementsByClassName('button-fab');
            if (fabs.length && fabs.length > 1) {
                fabs[0].remove();
            }
        };
    })

    .controller('LoginCtrl', function ($scope, $timeout, $http, $stateParams, $state, ionicMaterialInk) {
      //  $scope.$parent.clearFabs();
        
        // $timeout(function () {
        //     $scope.$parent.hideHeader();
        // }, 0);
        
        $scope.user = { username: '', password: '' };

        $scope.signin = function () {
            if ($scope.user.username != '' && $scope.user.password != '') {
                $scope.loader = true;
                
                $http.post('http://localhost:9000/api/signin', $scope.user)
                    .then(
                        function (data) {
                            var user = data.data.companyId;
                            console.log(user)
                            if (!user) {
                                $scope.loader = false;
                            }
                            else {
                                localStorage.setItem("token", user.firebaseToken);
                                $state.go("app.dashboard");
                                $scope.loader = false;
                            }
                        },
                        function (err) {
                            $scope.loader = false;
                        });
            }
        }
        ionicMaterialInk.displayEffect();
    })

    .controller('OrderCtrl', function ($scope, $stateParams,commonService,$cordovaGeolocation, $http, $timeout, ionicMaterialInk, $firebaseObject, $firebaseArray, ionicMaterialMotion) {
        // Set Header
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.$parent.setHeaderFab('left');

        // Delay expansion
        $timeout(function () {
            $scope.isExpanded = true;
            $scope.$parent.setExpanded(true);
        }, 300);

        // Set Motion
        ionicMaterialMotion.fadeSlideInRight();

        // Set Ink
        ionicMaterialInk.displayEffect();
        //Get company Request
        
          
          

        //submit order request
        var token = localStorage.getItem("token")
        //var companyId = localStorage.getItem("data");
        $scope.order = {}
        $scope.order.salemanId = token;
        $scope.order.companyId = "";
        $scope.order.productId = Date.now();
        $scope.order.location = {};
        $scope.companyName = "";
         //Get Company Request
        commonService.getCompany().then(function (response) {
            $scope.order.companyId = response.data[0].adminId;
            $scope.companyName = response.data[0].companyName;
            //save data to firebase
            $scope.takeOrder = function (user) {
                var posOptions = { timeout: 10000, enableHighAccuracy: false };
                $cordovaGeolocation
                    .getCurrentPosition(posOptions)
                    .then(function (position) {
                        var lat = position.coords.latitude;
                        var long = position.coords.longitude;
                        $scope.order.location = { lat: lat, long: long }
                        var ref = new Firebase("/https://salesmanhybirdapp.firebaseio.com/" + $scope.companyName + "/order");
                        $scope.order = $firebaseArray(ref)
                        ref.push(user)
                        //then save data to mongoDB
                        $http.post("http://localhost:9000/router/takeorder", user).then(function (response) {
                            console.log(response)
                        }), function (err) {
                            console.log(err);
                        }
                    }, function (err) {
                        // error
                    });
                 }
        }, function (err) {
            //  console.log(err);
        })


    })

    .controller('ProfileCtrl', function ($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
        // Set Header
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Motion
        $timeout(function () {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 300);

        $timeout(function () {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();
    })

    .controller('DashboardCtrl', function ($scope, $http , commonService , $stateParams, $q, $timeout, ionicMaterialInk, ionicMaterialMotion) {
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
     
        $scope.adminId = "";
        
       //Get product data from Mongodb
        this.getproduct = function () {
            var deffered = $q.defer();
            var adminId = localStorage.getItem("data")
            $http.get("http://localhost:9000/router/getproduct?token=" + adminId).then(function (response) {
                deffered.resolve(response);
            }), function (err) {
                deffered.reject(err);
            }

            return deffered.promise;
        }
        //Get Company Request
        commonService.getCompany().then(function (response) {
           $scope.adminId = response.data[0].adminId;
            //Get product Request
             $http.get("http://localhost:9000/router/getproduct?token=" + $scope.adminId).then(function (response) {
                console.log(response);

                $scope.product = response.data;
              
                //$rootScope.comapanyName = response.data[0].companyName
            }, function (err) {
                //console.log(err);
            })
        }, function (err) {
            //  console.log(err);
        })

     

    })

;
