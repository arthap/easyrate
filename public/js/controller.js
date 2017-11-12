/**
 * Created by Hayarpi on 6/1/2016.
 */
'use strict';

/* Controllers */
var easyrateApp = angular.module('easyrateApp', ['ngRoute','ngImgCrop', 'ngResource', 'ngCookies', 'ngFileUpload', 'ngAnimate', 'angularUtils.directives.dirPagination', 'angular-whenScrolled', 'angucomplete-alt', 'ui-notification', 'nvd3']);


/* Config */
easyrateApp.config(['$routeProvider', '$locationProvider', function ($routeProvide, $locationProvider) {
    // $locationProvider.html5Mode({
    // 	enabled: true,
    // 	requireBase: false
    // });
    $locationProvider.hashPrefix = '!';
    $routeProvide
    // .when('/',{
    // 	templateUrl:'index.html',
    // 	controller:'easyRateListCtrl',
    // 	controllerAs: 'vm'
    // })
    
        .when('/eula', {
            templateUrl: 'template/eula.html',
            controller: 'EULACtrl'
        })
        .when('/login', {
            templateUrl: 'html/login.html',
            controller: 'LoginInCtrl',
            controllerAs: 'vm'
        })
        .when('/register', {
            templateUrl: 'html/register.html',
            controller: 'RegisterCtrl',
            controllerAs: 'vm'
        })
        .when('/forgot', {
            templateUrl: 'template/forgot.html',
            controller: 'ForgotCtrl',
            controllerAs: 'vm'
        })
        .when('/tokenError', {
            templateUrl: 'template/tokenError.html',

        })
        .when('/profile', {
            templateUrl: 'html/profile.html',
            controller: 'UserPageCtrl',
            controllerAs: 'vm'
        })
        .when('/profile-follow', {
            templateUrl: 'html/products-large.html',
            controller: 'UserPageCtrl',
            controllerAs: 'vm'
        })
        .when('/profile-follow2', {
            // templateUrl: 'template/administrationUserPage.html',
            templateUrl: 'html/products-large2.html',
            controller: 'UserPageCtrl',
            controllerAs: 'vm'
        })
        .when('/image-crop', {
            templateUrl: 'html/image.html',
            controller: 'ImageCropCtrl',
            controllerAs: 'vm'
        })
        .when('/administrationUserPage', {
             templateUrl: 'template/administrationUserPage.html',
           // templateUrl: 'html/products-large2.html',
            controller: 'AdministrationUserPageCtrl',
            controllerAs: 'vm'
        })
        .when('/chart', {
            templateUrl: 'template/chartPage.html',
            controller: 'ChartCtrl',
            controllerAs: 'vm'
        })
        .when('/changePassword', {
            templateUrl: 'template/changePassword.html',
            controller: 'changePasswordCtrl',
            controllerAs: 'vm'
        })
        .when('/changeEmail', {
            templateUrl: 'template/ChangeEmail.html',
            controller: 'changeEmailCtrl',
            controllerAs: 'vm'
        })
        .when('/add', {
            templateUrl: 'html/add.html',
            controller: 'addProductCtrl',
            controllerAs: 'vm'
        })
        .when('/addEditAdministrationProduct/:productId', {
            templateUrl: 'html/add.html',
            controller: 'addProductCtrl',
            controllerAs: 'vm'
        })
        .when('/reset/:tokenId', {
            templateUrl: 'template/reset.html',
            controller: 'ResetCtrl',
            controllerAs: 'vm'
        })
        .when('/similar/:productId', {
            templateUrl: 'template/similar.html',
            controller: 'SimilarCtrl',
            controllerAs: 'vm'
        })
        .when('/addReview/:productId', {
            templateUrl: 'html/product-review.html',
            controller: 'AddReviewCtrl',
            controllerAs: 'vm'
        })
        .when('/products/:productId', {
            templateUrl: 'html/product-detail.html',
            controller: 'ProductDetailCtrl',
            controllerAs: 'vm'
        })
        .when('/profile/:userId', {
            templateUrl: 'html/products-large2.html',
            controller: 'ProfileDetailCtrl',
            controllerAs: 'vm'
        })
        .when('/chart/:productId', {
            templateUrl: 'template/chartPage.html',
            controller: 'ChartCtrl',
            controllerAs: 'vm'
        })
        .otherwise({
            redirectTo: '/'
        });

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
}
]);

// run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
// function run($rootScope, $location, $cookieStore, $http) {
//     // keep user logged in after page refresh
//     $rootScope.globals = $cookieStore.get('globals') || {};
//     if ($rootScope.globals.currentUser) {
//         $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
//     }
//
//     $rootScope.$on('$locationChangeStart', function (event, next, current) {
//         // redirect to login page if not logged in and trying to access a restricted page
//         var restrictedPage = $.inArray($location.path(), ['/signIn', '/register', '/forgot', '/reset/:tokenId', '/', '/userPage', '/fauct', '/changeEmail', '/changePassword', '/products/:productId]']) === -1;
//         console.log(restrictedPage);
//         console.log(loggedIn);
//         var loggedIn = $rootScope.globals.currentUser;
//         if (restrictedPage && !loggedIn) {
//             $location.path('/');
//         }
//
//     });
// }

easyrateApp.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        // $rootScope.userData = $cookieStore.get('userData') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            var restrictedPage = $.inArray($location.path(), ['/signIn', '/register', '/forgot', '/reset/:tokenId', '/', '/userPage', '/fauct', '/changeEmail', '/changePassword', '/products/:productId]']) === -1;
            // console.log(restrictedPage);
            // console.log(loggedIn);
            var loggedIn = $rootScope.globals.currentUser;
            // var userData= $rootScope.userData.currentUser;
            // if (restrictedPage && !loggedIn) {
            //     $location.path('/');
            // }
            // if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
            //     $location.path('/login');
            // }

            //
            if ($location.path() != "/"  && !($location.path().indexOf("/similar") >=0)) {
                $rootScope.hideit = true;
            }else{
                $rootScope.hideit = false;
            }
            if ($location.path() != "/"  ) {
                $rootScope.hideProduct = true;
            }else{
                $rootScope.hideProduct = false;
            }
            if ( !($location.path().indexOf("/similar") >=0) ) {
                $rootScope.hideSimilar = true;
            }else{
                $rootScope.hideSimilar = false;
            }
            if ($location.path() == "/register") {  $location.path('/register');}
            // if ($location.path() == "/login") { $location.path('/login');}

            // if ($location.path().indexOf("/add") >= 0   && !loggedIn) {  $location.path('/login');}
            // if ($location.path().indexOf("/addReview/") >= 0   && loggedIn === undefined) {  $location.path('/login');}
            // if ($location.path().indexOf("/profile") >= 0   && loggedIn === undefined) {  $location.path('/login');}
            // if ($location.path().indexOf("/administrationUserPage") >= 0   && loggedIn === undefined) {  $location.path('/login');}
            // if ($location.path() == "/image-crop") {
            //     $scope.openUrl("/image-crop")
            // }
            // if ( !userData && userData !== undefined) {
            //     if ($location.path() === "/profile"  && userData.USER_TYPE === "1") {
            //         $location.path('/administrationUserPage');
            //         // $scope.manufactShow=false;
            //     }
            // }

        });
    }]);

easyrateApp.animation('.slide-animation', function () {
    return {
        beforeAddClass: function (element, className, done) {
            var scope = element.scope();

            if (className == 'ng-hide') {
                var finishPoint = element.parent().width();
                if (scope.direction !== 'right') {
                    finishPoint = -finishPoint;
                }
                TweenMax.to(element, 0.5, {left: finishPoint, onComplete: done});
            }
            else {
                done();
            }
        },
        removeClass: function (element, className, done) {
            var scope = element.scope();

            if (className == 'ng-hide') {
                element.removeClass('ng-hide');

                var startPoint = element.parent().width();
                if (scope.direction === 'right') {
                    startPoint = -startPoint;
                }

                TweenMax.fromTo(element, 0.5, {left: startPoint}, {left: 0, onComplete: done});
            }
            else {
                done();
            }
        }
    };
});


easyrateApp.directive('checkImage', function ($http) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            attrs.$observe('ngSrc', function (ngSrc) {
                if (ngSrc === undefined) {
                    element.attr('src', 'img/avatar.png');
                    ngSrc = 'img/avatar.png';
                }
                $http.get(ngSrc).success(function () {
                    if (ngSrc === "" || ngSrc === " ") {
                        element.attr('src', 'img/avatar.png');
                    }
                    // alert('image exist');
                }).error(function () {
                    // alert('image not exist');
                    element.attr('src', 'img/avatar.png'); // set default image
                });
            });
        }
    };
});

easyrateApp.directive('starRating',
    function () {
        return {
            restrict: 'A',
            template: '<ul class="rating">'
            + '	<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">'
            + '\u2605'
            + '</li>'
            + '</ul>',
            scope: {
                ratingValue: '=',
                max: '=',
                onRatingSelected: '&'
            },
            link: function (scope, elem, attrs) {
                var updateStars = function () {
                    scope.stars = [];
                    for (var i = 0; i < scope.max; i++) {
                        scope.stars.push({
                            filled: i < scope.ratingValue
                        });
                    }
                };

                scope.toggle = function (index) {
                    scope.ratingValue = index + 1;
                    scope.onRatingSelected({
                        rating: index + 1
                    });
                };

                scope.$watch('ratingValue',
                    function (oldVal, newVal) {
                        if (newVal) {
                            updateStars();
                        }
                    }
                );
            }
        };
    }
);
easyrateApp.directive('smileRating',
    function () {
        return {
            restrict: 'A',
            template: '<ul class="rating">'
            + '	<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">'
            + '\u263A'
            + '</li>'
            + '</ul>',
            scope: {
                ratingValue: '=',
                max: '=',
                onRatingSelected: '&'
            },
            link: function (scope, elem, attrs) {
                var updateStars = function () {
                    scope.stars = [];
                    for (var i = 0; i < scope.max; i++) {
                        scope.stars.push({
                            filled: i < scope.ratingValue
                        });
                    }
                };

                scope.toggle = function (index) {
                    scope.ratingValue = index + 1;
                    scope.onRatingSelected({
                        rating: index + 1
                    });
                };

                scope.$watch('ratingValue',
                    function (oldVal, newVal) {
                        if (newVal) {
                            updateStars();
                        }
                    }
                );
            }
        };
    }
);
/* Factory */
easyrateApp.factory('Product', [
    '$resource', function ($resource) {
        return $resource('products/:productId.:format', {
            productId: 'products',
            format: 'json',
            apiKey: 'someKeyThis'
            /* http://localhost:8888/phones/phones.json?apiKey=someKeyThis */
        }, {
            // action: {method: <?>, params: <?>, isArray: <?>, ...}
            update: {method: 'PUT', params: {productId: '@product'}, isArray: true}
        });
        //Phone.update(params, successcb, errorcb);
    }
]);
// easyrateApp.service('UserDataService', function($cookieStore,$rootScope){
// 	var service = {};
// 	var myData = [];
//
// 	service.setUserData = setUserData;
// 	service.getUserData = getUserData;
// 	service.ClearData=ClearData;
// 	return service;
//
//
// 	function setUserData (){
// 		$rootScope.globals = $cookieStore.get('globals') || {};
// 		if ($rootScope.globals.currentUser) {
// 		myData.push($cookieStore.get('userData').currentUser);}
// 	};
//
// 	function getUserData(){
// 		return  myData[0];
// 	};
// 	function ClearData() {
// 		myData=[];
// 	}
//
// });
/* Filter */
easyrateApp.filter('checkmark', function () {
    return function (input) {
        return input ? '\u2713' : '\u2718';
    }
});
// easyrateApp.directive('whenScrollEnds', function() {
// 	return {
// 		restrict: "A",
// 		link: function(scope, element, attrs) {
// 			var visibleHeight = element.height();
// 			var threshold = 100;
//
// 			element.scroll(function() {
// 				var scrollableHeight = element.prop('scrollHeight');
// 				var hiddenContentHeight = scrollableHeight - visibleHeight;
//
// 				if (hiddenContentHeight - element.scrollTop() <= threshold) {
// 					// Scroll is almost at the bottom. Loading more rows
// 					scope.$apply(attrs.whenScrollEnds);
// 				}
// 			});
// 		}
// 	};
// });

easyrateApp.service('MyAppLocation', function () {
    var searchTeamp = {};
    // searchTeamp.AddMySearchTemp = AddMySearchTemp;

    this.add = function (searchTotal, scrollStop, stopLoadingData) {
        searchTeamp.total = searchTotal;
        searchTeamp.scrollSt = scrollStop;
        searchTeamp.stopLoadingData = stopLoadingData;

    }
    this.addLoc = function (mainPageRoot) {
        searchTeamp.mainPageRoot = mainPageRoot;


    }
    this.get = function () {
        return searchTeamp;
    }
})
 
easyrateApp.filter('filesize', function () {
    return function (size) {
        if (isNaN(size))
            size = 0;

        if (size < 1024)
            return size + ' Bytes';

        size /= 1024;

        if (size < 1024)
            return size.toFixed(2) + ' Kb';

        size /= 1024;

        if (size < 1024)
            return size.toFixed(2) + ' Mb';

        size /= 1024;

        if (size < 1024)
            return size.toFixed(2) + ' Gb';

        size /= 1024;

        return size.toFixed(2) + ' Tb';
    };
});
easyrateApp.filter('filerounded', function () {
    return function (randNum) {
        if (isNaN(randNum))
            randNum = 0;
        
        return randNum.toFixed();
    };
});
easyrateApp.filter('status', function () {
    return function (status) {
        if (status === 1) {
            status = "Active"
        }
        ;
        if (status === 2) {
            status = "Deleted"
        }
        ;
        if (status === 3) {
            status = "Confirmed"
        }
        ;
        if (status === 4) {
            status = "New"
        }
        ;
        if (status === 5) {
            status = "Draft"
        }
        ;
        return status;
    };
});
easyrateApp.filter('round', function () {
    return function (item) {
        return Math.round(item*100)/100;;
    };
});

 
/* EULA Controller */
easyrateApp.controller('EULACtrl', [
    '$scope', '$http', '$location', '$rootScope', '$cookieStore', 'UserService', 'UserDataService',
    function ($scope, $http, $location, $rootScope, $cookieStore, UserService, UserDataService) {
        $scope.checkboxModel = {
            value1: false

        };
        $scope.userData = $rootScope.userData;
        var profileUserId;
        if ($scope.userData !== undefined) {

            profileUserId = $scope.userData.currentUser[0].ID;
        }

        $scope.reject = function () {
            $location.path('/');
        }
        $scope.agree = function () {
            UserService.AddEULA(profileUserId)
                .then(function (reg) {

                    if (reg) {
                        $location.path('/');
                        // $scope.mainReviewImageUrl =  $scope.getProductDetaiReviewList[0].RESOURCE;
                    } else {
                    }

                })
        }
    }
]);


easyrateApp.factory('$remember', function () {
    return function (name, values) {
        var cookie = name + '=';

        cookie += values + ';';

        var date = new Date();
        date.setDate(date.getDate() + 365);

        cookie += 'expires=' + date.toString() + ';';

        document.cookie = cookie;
    }
});



easyrateApp.directive('starRat', function () {
    return {
        scope: {
            rating: '=',
            maxRating: '@',
            readOnly: '@',
            click: "&",
            mouseHover: "&",
            mouseLeave: "&"
        },
        restrict: 'EA',
        template: "<div style='display: inline-block; margin: 0px; padding: 0px; cursor:pointer;' ng-repeat='idx in maxRatings track by $index'> \
                    <img ng-src='{{((hoverValue + _rating) <= $index)&& \"img/starsImage/star-empty-lg.png\" || \"img/starsImage/star-fill-lg.png\"}}' \
                    ng-Click='isolatedClick($index + 1)' \
                    ng-mouseenter='isolatedMouseHover($index + 1)' \
                    ng-mouseleave='isolatedMouseLeave($index + 1)'></img> \
            </div>",
        compile: function (element, attrs) {
            if (!attrs.maxRating || (Number(attrs.maxRating) <= 0)) {
                attrs.maxRating = '5';
            }
            ;
        },
        controller: function ($scope, $element, $attrs) {
            $scope.maxRatings = [];

            for (var i = 1; i <= $scope.maxRating; i++) {
                $scope.maxRatings.push({});
            }
            $scope._rating = $scope.rating;

            $scope.isolatedClick = function (param) {
                if ($scope.readOnly == 'true') return;

                $scope.rating = $scope._rating = param;
                $scope.hoverValue = 0;
                $scope.click({
                    param: param
                });
            };

            $scope.isolatedMouseHover = function (param) {
                if ($scope.readOnly == 'true') return;
                $scope._rating = 0;
                $scope.hoverValue = param;
                $scope.mouseHover({
                    param: param
                });
            };

            $scope.isolatedMouseLeave = function (param) {
                if ($scope.readOnly == 'true') return;

                $scope._rating = $scope.rating;
                $scope.hoverValue = 0;
                $scope.mouseLeave({
                    param: param
                });
            };
        }
    };
});
/* Sing in Controller */
easyrateApp.controller('LoginInCtrl', [
    '$scope', '$cookieStore', '$http', '$location', 'AuthenticationService', 'FlashService', 'UserDataService', '$remember',
    function ($scope, $cookieStore, $http, $location, AuthenticationService, FlashService, UserDataService, $remember) {
        var vm = this;
        vm.login = login;

        if ($cookieStore.get('globals') !== undefined) {
            vm.userdata = $cookieStore.get('globals').currentUser;
            vm.remembeMe = vm.userdata.remembeMe;
        } else {
            vm.remembeMe = false;
        }

       (function initController() {
            // reset login status
            if (!vm.remembeMe) {
                AuthenticationService.ClearCredentials();
            }
            UserDataService.ClearData();
            AuthenticationService.ClearUserData();
           // AuthenticationService.ClearCredentials();

        })();

        $scope.remembeMeModel = {
            value: false
        };
        $scope.checkRemembeMe = function () {
            if (!$scope.remembeMeModel.value) {
                AuthenticationService.ClearCredentials();
                vm.remembeMe = false;
            }
        }
        $scope.change = function () {
            vm.password = vm.password;
            vm.remembeMe = false;
        }
        if (vm.remembeMe) {
            vm.userName = vm.userdata.username;
            vm.password = vm.userdata.authdata;
            vm.email = vm.userdata.email;
            $scope.remembeMeModel.value = true;
        }
        $scope.logout = function () {
            window.location.reload();
        }

        function login() {
            if(vm.password === undefined || vm.userName === undefined){return null}
            vm.dataLoading = true;
            AuthenticationService.Login(vm, $scope.remembeMeModel.value, function (response) {
                if (response.success) {
                    // if(!vm.remembeMe){AuthenticationService.SetCredentials(vm.email,vm.password,$scope.remembeMeModel.value);}
                    // $remember('my_cookie_name', vm.email);
                    if (response.eula === "1") {
                        $location.path('/');
                        window.location.reload();
                    }
                    else {
                        $location.path('/eula')
                    }
                    $scope.singshow();
                } else {
                    $scope.notification = response.message;
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };
    }
]);
/* Registration Controller */
easyrateApp.controller('RegisterCtrl', [
    '$scope', '$http', '$location', 'AuthenticationService', 'FlashService', 'UserService',
    function ($scope, $http, $location, AuthenticationService, FlashService, UserService) {
        $scope.confirmePassError = false;
        var vm = this;

        vm.register = register;
        vm.cheakPassword=cheakPassword;

        function register() {
            vm.dataLoading = true;
            UserService.Create(vm.user)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Registration successful', true);
                        $location.path('/login');
                    } else {
                        $scope.errorMessage = response.message;
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }

      function  cheakPassword () {
            if (vm.user.CONFIRMEPASSWORD !== vm.user.PASSWORD) {
                $scope.confirmePassError = true;
            }
            else {
                $scope.confirmePassError = false;
            }
        }
    }

]);
/* Forgot Password Controller */
easyrateApp.controller('ForgotCtrl', [
    '$scope', '$http', '$location', 'AuthenticationService', 'FlashService', 'UserService',
    function ($scope, $http, $location, AuthenticationService, FlashService, UserService) {
        var vm = this;
        $scope.message = false;
        $scope.errorMsg = false;
        vm.forgot = forgot;

        function forgot() {
            $scope.message = false;
            $scope.errorMsg = false;
            vm.dataLoading = true;
            UserService.Forgot(vm.email)
                .then(function (response) {
                    if (response.success) {
                        // FlashService.Success('Forgot successful', true);
                        // $location.path('/login');
                        $scope.message = true;
                        $scope.notification = response.message;
                        vm.dataLoading = false;
                    } else {
                        FlashService.Error(response.message);

                        $scope.errorMsg = true;
                        $scope.notification = response.message;
                        vm.dataLoading = false;
                    }
                });
        }
    }

]);
/* Reset Password Controller */
easyrateApp.controller('ResetCtrl', [
    '$scope', '$http', '$location', 'AuthenticationService', 'FlashService', 'UserService', '$routeParams',
    function ($scope, $http, $location, AuthenticationService, FlashService, UserService, $routeParams) {
        var vm = this;
        var tokenId = $routeParams.tokenId;
        $scope.inputType = 'password';
        $scope.hideShowPassword = function () {
            if ($scope.inputType == 'password')
                $scope.inputType = 'text';
            else
                $scope.inputType = 'password';
        };


        $scope.message = false;
        $scope.errorMsg = false;
        $scope.errorMsg = false;
        vm.reset = reset;

        function reset() {


            $scope.err = false;
            $scope.resp = false;

            vm.dataLoading = true;
            UserService.Reset(vm.password, vm.password_confirm, tokenId)
                .then(function (response) {
                    if (response.success) {
                        // FlashService.Success('Forgot successful', true);
                        // $location.path('/login');

                        $scope.resp = true;
                        $scope.message = response.message;

                        vm.dataLoading = false;
                    } else {
                        // FlashService.Error(response.message);
                        $scope.err = true;

                        $scope.message = response.message;
                        vm.dataLoading = false;
                    }
                });
        }
    }

]);
/* User Page in Controller */
easyrateApp.controller('UserPageCtrl', [
    '$scope','$timeout', '$rootScope', '$cookieStore', '$http', '$location', 'AuthenticationService', 'FlashService', 'UserService', 'Upload',
    function ($scope,$timeout, $rootScope, $cookieStore, $http, $location, AuthenticationService, FlashService, UserService, Upload) {
        var vm = this;
        vm.userData = $cookieStore.get('userData').currentUser;
        vm.user = vm.userData.username;
        vm.email = vm.userData.email;
        vm.userId = vm.userData.ID

        vm.followProduct = followProduct;
        // vm.login = login;
        vm.productData = productData;
        vm.submit = submit;
        vm.updateCookie=updateCookie;
        // vm.reviewData=reviewData;


        $scope.imageAdd = function () {
            if ($scope.file !== undefined) {
                vm.file = $scope.file;
            }
        }

        // function followProduct(productId) {
        // 	$rootScope.userData = $cookieStore.get('userData') || {};
        // 	if ($rootScope.userData.currentUser) {
        // 		var userId = $rootScope.userData.currentUser[0].ID
        // 	}
        //     var productId=productId;
        // 	UserService.DeleteFollowProduct(userId,productId)
        // 		.then(function (reg) {
        //
        // 			if (reg.success === true) {
        // 				$scope.getProductDetaiReviewList = [];
        // 				productData(productId);
        // 			}
        //
        // 		});
        // }
        $scope.inputType = 'password';
        $scope.hideShowPassword = function () {
            if ($scope.inputType == 'password')
                $scope.inputType = 'text';
            else
                $scope.inputType = 'password';
        };
        // vm.userdata = $cookieStore.get('globals').currentUser;
        // vm.user = vm.userdata.username;
        // vm.email = vm.userData.email;


        $scope.message = false;
        $scope.errorMsg = false;
        vm.change = change;

        function change() {
            $scope.err = false;
            $scope.resp = false;
            vm.dataLoading = true;
            if (vm.password === vm.confirmePassword) {
                UserService.ChangePassword(vm.password, vm.confirmePassword, vm.email)
                    .then(function (response) {
                        if (response.success) {
                            $scope.resp = true;
                            $scope.message = response.message;
                            vm.dataLoading = false;
                        } else {
                            $scope.err = true;
                            $scope.message = response.message;
                            vm.dataLoading = false;
                        }
                    });
            }
            else {
                $scope.err = true;
                vm.dataLoading = false;
                $scope.message = "Password and Confirm Password do not match!";
            }
        }

        function submit() {
            vm.progress = 0;
            $timeout(function () {
                Upload.upload({
                    url: '/api/photo',
                    data: {id: vm.userData.ID, file: vm.file}
                }).then(function (resp) {
                    console.log('Success ' + resp);
                    vm.updateCookie();
                }, function (resp) {
                    console.log('Error status: ' + resp);
                }, function (evt) {
                    vm.progress = parseInt(100.0 * evt.loaded / evt.total + '%');
                    // console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
            }, 500);
        };
        function updateCookie() {
            UserService.GetUserById(vm.userData.ID).then(function (user) {
                if (user != undefined && user.success !== false) {
                    AuthenticationService.UpdateCredentials(user);
                }
            });
        }
        $scope.getFollowProductByUserId = function () {
            UserService.GetFollowProductByUserId(vm.userId)
                .then(function (followIdList) {
                    $scope.followIdList = [];
                    if (followIdList.length > 0) {
                        $scope.followIdList = followIdList;
                        $scope.followIdList.forEach(function (followId) {
                            productData(followId.PRODUCT_ID);
                        }, this);
                    }
                });
        }
        $scope.getFollowProductByUserId();
        function followProduct(productId) {
            var productId = productId;
            var parentCategoryId;
            UserService.GetProductCategory(productId).then(function (reg) {
                if (reg.length > 0) {
                    parentCategoryId = reg[0].CATEGORY_PARENT_ID;
                    console.log(parentCategoryId);
                    UserService.DeleteFollowProduct(vm.userId, productId, parentCategoryId)
                        .then(function (reg) {
                            if (reg.success === true) {
                                // $scope.getProductDetaiReviewList = [];
                                // $scope.getFollowProductId()
                            }
                        });
                }
            });
        }

        $scope.ind;
        $scope.mainImagePath = [];
        $scope.imagePush = function (img) {
            $scope.mainImagePath.push(img)
        }
        $scope.setImage = function (imageUrl, index) {
            for (var i = 0; i < $scope.mainImagePath.length; i++)
                if (i === index) {
                    $scope.mainImagePath[i] = imageUrl;
                }
        }
        $scope.getImagelList = [];
        $scope.getProductDetaiReviewList = [];
        function productData(productId) {
            UserService.GetFollowProductById(productId)
                .then(function (product) {
                    if (product.length > 0) {
                        $scope.getProductDetaiReviewList.push(product[0]);
                        $scope.getImagelList.push(product);
                        console.log($scope.getImagelList);
                    } 
                });
        }

        // function login() {
        //     // UserService.GetByUserName(vm.userData.USERNAME,vm.userData.PASSWORD)
        //     //     .then(function (user) {
        //     //         if (user !== null) {
        //     //             vm.userData = user[0];
        //     //
        //     //         }
        //     //
        //     //     });
        //    
        //    
        // }
    }
]);

/* Chart Controller */
easyrateApp.controller('ChartCtrl', [
    '$scope', '$http', '$location', '$cookieStore', '$routeParams', 'UserService',
    function ($scope, $http, $location, $cookieStore, $routeParams, UserService) {
        $scope.productId = $routeParams.productId;
        var vm = this;

        vm.getproductReviewRaiting = function () {
            UserService.GetproductReviewRaiting($scope.productId)
                .then(function (productReviewRaitingArray) {
                    $scope.productReviewRaitingArray = [];
                    if (productReviewRaitingArray.data.length > 0) {
                        productReviewRaitingArray.data.forEach(function (d) {

                            $scope.productReviewRaitingArray.push([new Date(d.CREATED_AT).getTime(), d.CURRENT_RATE]);


                        }, this);
                        ;
                        $scope.data = [
                            {
                                "key": "Product statictics",
                                "values": $scope.productReviewRaitingArray
                            }
                        ]
                        console.log("Array");
                        console.log($scope.productReviewRaitingArray);

                    } else {
                        $scope.productReviewRaitingArray.push([new Date().getTime(), 0]);
                        $scope.data = [
                            {
                                "key": "Product statictics",
                                "values": $scope.productReviewRaitingArray
                            }
                        ]
                    }
                })

        }
        vm.getproductReviewRaiting();
        vm.timeInMilisec = new Date('2016-08-03 12:24:51.0').getTime();
        // $scope.t=2016-08-03 12:24:51.0
        var date = new Date(vm.timeInMilisec);


        $scope.options = {
            chart: {
                type: 'stackedAreaChart',
                height: 450,
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 30,
                    left: 40
                },
                x: function (d) {
                    return d[0];
                },
                y: function (d) {
                    return d[1];
                },
                useVoronoi: false,
                clipEdge: true,
                duration: 100,
                useInteractiveGuideline: true,
                xAxis: {
                    showMaxMin: false,
                    tickFormat: function (d) {
                        return d3.time.format('%x')(new Date(d))
                    }
                },
                yAxis: {
                    tickFormat: function (d) {
                        return d3.format(',.2f')(d);
                    }
                },
                zoom: {
                    enabled: true,
                    scaleExtent: [1, 10],
                    useFixedDomain: false,
                    useNiceScale: false,
                    horizontalOff: false,
                    verticalOff: true,
                    unzoomEventType: 'dblclick.zoom'
                }
            }
        };

        // $scope.data = [
        // 	{
        // 		"key" : "dur" ,
        // 		"values" : [ [ 1025409600000 , 5] , [ 1028088000000 , 2.854291255832] , [ 1030766400000 , 3.02286281168] , [ 1470212691000 , 4.093608385173] ]
        // 	}
        // ,
        //
        // {
        // 	"key" : "ak" ,
        // 	"values" : [ [ 1025409600000 , 1] , [ 1028088000000 , 2.4514668527298] , [ 1030766400000 , 4.9085410566608] , [ 1033358400000 , 3.8996782364764]]
        // },
        //
        // {
        // 	"key" : "sidelnik" ,
        // 	"values" : [ [ 1025409600000 , 2] , [ 1028088000000 , 1.0899888751059] , [ 1030766400000 , 4.5996132380614] , [ 1033358400000 , 3.2741174301034] ]
        // }


        // ]

    }

]);
/* Change Password Controller */
easyrateApp.controller('changePasswordCtrl', [
    '$scope', '$http', '$location', 'AuthenticationService', 'FlashService', 'UserService', '$routeParams', '$cookieStore',
    function ($scope, $http, $location, AuthenticationService, FlashService, UserService, $routeParams, $cookieStore) {
        var vm = this;
        // var tokenId = $routeParams.tokenId;
        $scope.inputType = 'password';
        $scope.hideShowPassword = function () {
            if ($scope.inputType == 'password')
                $scope.inputType = 'text';
            else
                $scope.inputType = 'password';
        };
        vm.userdata = $cookieStore.get('globals').currentUser;
        vm.user = vm.userdata.username;
        vm.email = vm.userdata.email;


        $scope.message = false;
        $scope.errorMsg = false;
        vm.change = change;

        function change() {


            $scope.err = false;
            $scope.resp = false;

            vm.dataLoading = true;
            if (vm.password === vm.confirmePassword) {
                UserService.ChangePassword(vm.password, vm.confirmePassword, vm.email)
                    .then(function (response) {
                        if (response.success) {
                            // FlashService.Success('Forgot successful', true);
                            // $location.path('/login');

                            $scope.resp = true;
                            $scope.message = response.message;

                            vm.dataLoading = false;
                        } else {
                            // FlashService.Error(response.message);
                            $scope.err = true;

                            $scope.message = response.message;
                            vm.dataLoading = false;
                        }
                    });
            }
            else {
                $scope.err = true;
                vm.dataLoading = false;
                $scope.message = "Password and Confirm Password do not match!";
            }
        }
    }

]);
/* Change Password Controller */
easyrateApp.controller('changeEmailCtrl', [
    '$scope', '$http', '$location', 'AuthenticationService', 'FlashService', 'UserService', '$routeParams', '$cookieStore',
    function ($scope, $http, $location, AuthenticationService, FlashService, UserService, $routeParams, $cookieStore) {
        var vm = this;

        vm.userdata = $cookieStore.get('globals').currentUser;
        vm.user = vm.userdata.username;
        vm.emailParam = vm.userdata.email;


        $scope.message = false;
        $scope.errorMsg = false;
        vm.change = change;

        function change() {


            $scope.err = false;
            $scope.resp = false;

            vm.dataLoading = true;

            UserService.ChangeEmail(vm.email, vm.emailParam)
                .then(function (response) {
                    if (response.success) {
                        // FlashService.Success('Forgot successful', true);
                        // $location.path('/login');

                        $scope.resp = true;
                        $scope.message = response.message;
                        AuthenticationService.ChangeCredentials(vm.email, vm.userdata.authdata, vm.userdata.remembeMe, vm.userdata.username);
                        vm.userdata = $cookieStore.get('globals').currentUser;
                        vm.user = vm.userdata.username;
                        vm.emailParam = vm.userdata.email;
                        vm.dataLoading = false;
                    } else {
                        // FlashService.Error(response.message);
                        $scope.err = true;

                        $scope.message = response.message;
                        vm.dataLoading = false;
                    }
                });
        }
    }

]);

easyrateApp.controller('AddAdministrationProductCtrl', [
    '$scope', '$rootScope', '$cookieStore', '$http', '$location', 'AuthenticationService', 'FlashService', 'UserService', 'Upload', 'Notification',
    function ($scope, $rootScope, $cookieStore, $http, $location, AuthenticationService, FlashService, UserService, Upload, Notification) {
        var vm = this;


        $rootScope.userData = $cookieStore.get('userData') || {};
        if ($rootScope.userData.currentUser) {
            vm.userId = $rootScope.userData.currentUser.ID
        }


    }
]);


easyrateApp.controller('addProductCtrl', [
    '$scope', '$rootScope', '$cookieStore', '$cookies', '$http', '$routeParams', '$location', 'AuthenticationService', 'FlashService', 'UserService', 'UserDataService', 'Upload', 'Notification',
    function ($scope, $rootScope, $cookieStore, $cookies, $http, $routeParams, $location, AuthenticationService, FlashService, UserService, UserDataService, Upload, Notification) {
        var vm = this;
        $scope.productId = $routeParams.productId;
        $scope.userPermission;
        $rootScope.userData = $cookieStore.get('userData') || {};
        if ($rootScope.userData.currentUser) {
            userId = $rootScope.userData.currentUser.ID
            $scope.userPermission = $rootScope.userData.currentUser.USER_TYPE;
            $scope.manufacturerId = $rootScope.userData.currentUser.MANUFACTURER_ID;

        }

        // $scope.currentProduct=DraftDataService.GetProductSaveDraftData();
        // if($scope.currentProduct.vm!==undefined){
        //
        // 	$scope.files= $scope.currentProduct.files,
        // 		$scope.productImageList= $scope.currentProduct.productImageList;
        // 	$scope.categoryArr=$scope.currentProduct.categoryArr;
        // 	this.vm=$scope.currentProduct.vm;
        //
        // }
        var userId;
        // if($scope.manufactShow){vm.manufactShow=true;}
        $scope.catLVL1Arr = [];
        $scope.catLVL2Arr = [];
        $scope.categArr = [];

///////////////////manufacturerSearch start/////////////////
        $scope.manufacData = [];
        UserService.GetManufacturerId("mersedes")
            .then(function (response) {
                if (response.length > 0) {
                    $scope.manufacData = response;
                }

            });

        $scope.manufacturerSearch = function (str) {
            var matches = [];


            $scope.manufacData.forEach(function (person) {
                var fullName = person.NAME + ' ' + person.ID;
                if ((person.NAME.toLowerCase().indexOf(str.toString().toLowerCase()) >= 0)) {
                    matches.push(person);
                }
            });
            if (matches.length === 0) {
                $scope.manufacturer = str;
            }
            return matches;

        };
        ///////////////////manufacturerSearch End/////////////////
        ///////////////////Brand Search Start/////////////////
        $scope.brands = [];
        UserService.GetBrandId("mersedes")
            .then(function (response) {
                if (response.length > 0) {
                    $scope.brands = response;


                }
            });

        $scope.localSearch = function (str) {

            var matches = [];


            $scope.brands.forEach(function (product) {
                var fullName = product.NAME + ' ' + product.ID;
                if ((product.NAME.toLowerCase().indexOf(str.toString().toLowerCase()) >= 0)) {
                    matches.push(product);
                }
            });
            if (matches.length === 0) {
                $scope.brand = str;
            } else {
                $scope.brandName = str;
            }
            return matches;

        };
        $scope.choseBrandById = function (id) {
            $scope.brands.forEach(function (brand) {

                if (brand.ID == id) {

                    $scope.localSearch(brand.NAME);
                }
            });
        }
///////////////////Brand Search End/////////////////
        /////////////get Product for Edit/////////////
        $scope.productImageListTemp = [];
        $scope.GetProductById = function () {
            // if($scope.currentProduct.vm===undefined){
            UserService.GetProductDetailImageById($scope.productId)
                .then(function (productImageById) {
                    $scope.productImageList = productImageById;
                    $scope.productImageListTemp = productImageById;

                });
            UserService.GetProductDetailById($scope.productId)
                .then(function (productDetailById) {
                    if (productDetailById.length > 0) {
                        vm.status = productDetailById[0].STATUS;
                        vm.description = productDetailById[0].DESCRIPTION;
                        vm.name = productDetailById[0].NAME;
                        vm.shortText = productDetailById[0].SHORT_TEXT;
                        vm.brand = productDetailById[0].BRAND_ID;
                        $scope.choseBrandById(vm.brand)
                        vm.rat = productDetailById[0].CURRENT_SCORE;
                        vm.manufacturer = productDetailById[0].MANUFACTURER_ID;
                        UserService.GetProductCategory($scope.productId)
                            .then(function (productCategory) {
                                if (productCategory.length > 0) {
                                    productCategory.forEach(function (productCat) {
                                        $scope.categoryLVL1.forEach(function (catl1) {
                                            if (productCat.CATEGORY_PARENT_ID === catl1.ID) {
                                                $scope.categoryArr.push({
                                                    parid: productCat.CATEGORY_PARENT_ID,
                                                    parentName: catl1.NAME,
                                                    Id: productCat.CATEGORY_ID,
                                                });
                                            }
                                        });
                                    });
                                    var temp = [];
                                    $scope.categoryArrTem = [];
                                    $scope.categoryArrTemp = $scope.categoryArr;
                                    $scope.categoryArr.forEach(function (categoryArrElement) {
                                        if (categoryArrElement.Id === 0) {
                                            temp.push({
                                                parentId: categoryArrElement.parid,
                                                parentName: categoryArrElement.parentName
                                            });
                                        }
                                        $scope.categoryLVL2.forEach(function (catl2) {
                                            if (categoryArrElement.Id === catl2.ID) {
                                                temp.push({
                                                    parentId: categoryArrElement.parid,
                                                    parentName: categoryArrElement.parentName,
                                                    Id: categoryArrElement.Id,
                                                    childName: catl2.NAME
                                                });
                                            }
                                        });

                                    });
                                    $scope.categoryArr = [];
                                    $scope.categoryArr = temp;

                                    // console.log($scope.categoryArr);

                                }
                            });
                    }
                });
        }

        if ($routeParams.productId) {
            $scope.GetProductById();
        }

        /////////////get Product for Edit-End /////////////


        //////////////raiting////////////

        $scope.starRating = 0;
        $scope.hoverRating = 0;


        $scope.click = function (param) {
            $scope.starRating = param;
            vm.rat = param;
            console.log('Click');
        };

        $scope.mouseHover = function (param) {
            console.log('mouseHover(' + param + ')');
            $scope.hoverRating = param;
        };

        $scope.mouseLeave = function (param) {
            console.log('mouseLeave(' + param + ')');
            $scope.hoverRating = param + '*';
        };

        //////////////raiting-end////////////


        $(window).on('hashchange', function () {
            $scope.manufactShow = false;
            if (!$scope.manufactShow) {
                vm.manufactShow = $scope.manufactShow;
            }

            // if ($location.path() === "/addProduct") {if(userPermission==="1") {$scope.editPermission=false;}}
            if ($location.path() === "/addEditAdministrationProduct/" + $scope.productId) {
                $scope.editPermission = true;
                if ($scope.editPermission) {
                    $scope.GetProductById();
                }
                ;
                $rootScope.userData = $cookieStore.get('userData') || {};
                if ($rootScope.userData.currentUser) {
                    userId = $rootScope.userData.currentUser.ID
                    vm.manufacturer = $rootScope.userData.currentUser.MANUFACTURER_ID;
                    // vm.manufactShow=false;
                }
            }

        });

        ////////////////////Notification////////////////////
        $scope.success = function (notification) {
            Notification.success(notification);
        };
        ///////////////////Notification-end/////////////////

        //////////////select box category-Start//////////////
        $scope.categoryLVL1 = [];
        $scope.categoryLVL2 = [];
        $scope.categoryDataGet = function () {
            UserService.GetCategoryLvL1()
                .then(function (response) {
                    $scope.categoryLVL1 = [];
                    if (response.length > 0) {
                        response.forEach(function (data) {

                            $scope.categoryLVL1.push(data);


                        }, this);
                        ;
                    }
                    console.log($scope.categoryLVL1);
                });

            UserService.GetCategoryLvL2()
                .then(function (response) {
                    if (response.length > 0) {
                        $scope.categoryLVL2 = [];
                        response.forEach(function (data) {

                            $scope.categoryLVL2.push(data);


                        }, this);
                        $scope.dataMake($scope.categoryLVL1, $scope.categoryLVL2);
                    }

                    console.log($scope.categoryLVL2);
                });
        }
        $scope.categoryDataGet();


        var dataOp = {
            "myOptions": []
        }
        $scope.dataMake = function (data1, data2) {
            var dataOp = {
                "myOptions": []
            }
            data1.forEach(function (a, ind) {
                var i = 0;
                data2.forEach(function (b) {

                    if (a.ID === b.PARENT_ID) {
                        $scope.b = b.PARENT_ID;
                        dataOp.myOptions.push({
                            "id": a.ID,
                            "group": a.NAME,
                            "label": b.NAME
                        });
                    }
                    i++;
                }, this);
                ;


                if ($scope.b !== a.ID) {
                    dataOp.myOptions.push({
                        "id": a.ID,
                        "group": a.NAME,
                        "label": a.NAME
                    })
                }
            }, this);
            ;
            $scope.myOptions = dataOp.myOptions;
            $scope.groupe = dataOp;
        }

        $scope.myOptions = dataOp.myOptions;
        $scope.categoryArr = [];
        $scope.selectAction = function () {

            // $scope.categoryArr.push({name:$scope.myOption});
            $scope.groupe.myOptions.forEach(function (name) {

                if (name.label === $scope.myOption) {
                    if (name.group === name.label) {
                        $scope.categoryArr.push({parentName: name.group, parentId: name.id});
                    }
                    else {
                        $scope.categoryArr.push({parentName: name.group, childName: name.label, parentId: name.id});
                    }
                }
                ;
            });
        };
        $scope.delete = function (ind) {
            $scope.categoryArrtemp = [];
            $scope.categoryArr.forEach(function (b, i) {

                if (ind !== i) {
                    $scope.categoryArrtemp.push(b);
                }
            }, this);
            ;
            $scope.categoryArr = $scope.categoryArrtemp;
        }
        //////////////////select box category-End//////////////
        ////////////  image validation   /////////////////
        $scope.imageErrorChk = function () {
            if ($scope.files === undefined) {
                $scope.imgError = true;
            }
            else {
                if ($scope.files.length === 0) {
                    $scope.imgError = true;
                }
                else {
                    $scope.imgError = false;
                }
            }
            if ($scope.productImageList !== undefined) {
                if ($scope.userPermission === '1' && $scope.productImageList.length > 0) {
                    $scope.imgError = false;
                } else {
                    $scope.imgError = true;
                }
            }
        }
        ////////////  image validation-End  /////////////////
        var files = [];
        $scope.imageAdd = function () {

            if ($scope.files !== undefined) {
                for (var i = 0; i < $scope.files.length; i++) {
                    files.push($scope.files[i]);
                }
                $scope.files = files;
            }
            $scope.imageErrorChk();
        }
        $scope.imgDelete = function (index) {
            $scope.files;
            var filesAfterDel = [];
            for (var i = 0; i < $scope.files.length; i++) {
                if (i !== index) {
                    filesAfterDel.push($scope.files[i]);
                }
            }
            $scope.files = filesAfterDel;
            files = filesAfterDel;
            $scope.imageErrorChk();
            $scope.files.forEach(function (entry) {
                console.log(entry);
            });
            console.log($scope.files);
        }
        /*
         Edit thumb image delete
         */
        $scope.imageDeleteUrl = [];
        $scope.imgEditDelete = function (index) {

            var filesAfterDel = [];
            for (var i = 0; i < $scope.productImageList.length; i++) {
                if (i === index) {
                    $scope.imageDeleteUrl.push($scope.productImageList[i].RESOURCE);
                }
                if (i !== index) {
                    filesAfterDel.push($scope.productImageList[i]);
                }
            }
            $scope.productImageList = filesAfterDel;
            $scope.imageErrorChk();

        }
        /**
         * thumb image delete -end
         */

        var valueUpdate = function () {
            $scope.manufacturer = undefined;
            $scope.brand = undefined
        }
        $scope.imageUpload = function (productId, files) {

            files.forEach(function (file) {

                Upload.upload({
                    url: '/productImgUpload',
                    data: {productId: productId, file: file}
                }).then(function (resp) {
                    console.log('Success ' + resp);
                    console.log(resp);

                    $location.path('/userPage');
                }, function (resp) {
                    console.log('Error status: ' + resp);
                }, function (evt) {
                    vm.progress = parseInt(100.0 * evt.loaded / evt.total + '%');
                    vm.message = 'Your review has been added successfully!'
                    // console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
            });
        };
        var addProductCategory = function (productId, categoryArr) {
            UserService.AddProductCategory(productId, categoryArr)
                .then(function (response) {
                    if (response.length > 0) {
                        $scope.manufacData = response;
                    }

                });
        }
        var dbImageDelete = function (imageDeleteUrl) {
            UserService.DeleteImage(imageDeleteUrl)
                .then(function (response) {


                });
        }
        $scope.messageProductAdd = false;
        $scope.ArrayEquals = function test(arr, arr2) {
            if (arr === undefined) return false
            if (arr2 === undefined) return false
            if (arr.length != arr2.length) return false
            var on = 0;
            for (var i = 0; i < arr.length; i++) {
                for (var j = 0; j < arr2.length; j++) {
                    if (arr[i] === arr2[j]) {
                        on++
                        break
                    }
                }
            }
            return on == arr.length ? true : false
        }
        /**
         * Add Product function
         */
        var addProduct = function () {
            if ($routeParams.productId) {
                var productId = $routeParams.productId;
                UserService.Update({
                        productId: $routeParams.productId,
                        userId: userId,
                        name: vm.name,
                        shortText: vm.shortText,
                        description: vm.description,
                        status: vm.status,
                        manufacturer: vm.manufacturer,
                        brandId: vm.brand,
                        rating: vm.rat
                    })
                    .then(function (response) {


                        if ($scope.files !== undefined) {
                            $scope.imageUpload(productId, $scope.files);
                        }
                        if ($scope.productImageList.length !== $scope.productImageListTemp.length) {
                            dbImageDelete($scope.imageDeleteUrl);
                        }

                        var arrayEquals = $scope.ArrayEquals($scope.categoryArr, $scope.categoryArrTemp);
                        if (!arrayEquals) {
                            addProductCategory(productId, $scope.categoryArr);
                        }


                        $scope.messageProductAdd = "The product is successfully registered!";
                        $scope.success('The product is successfully Update!');
                        setTimeout($location.path('/userPage'), 3000);


                    }, function (resp) {
                        console.log('Error status: ' + resp);
                    }, function (evt) {
                        vm.progress = parseInt(100.0 * evt.loaded / evt.total + '%');
                        vm.message = 'Your review has been added successfully!'
                        // console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);

                    });
            }
            else {
                Upload.upload({
                    url: '/productAdd',
                    data: {
                        id: vm.id,
                        userId: userId,
                        name: vm.name,
                        shortText: vm.shortText,
                        description: vm.description,
                        status: vm.status,
                        manufacturer: vm.manufacturer,
                        brandId: vm.brand,
                        rating: vm.rat
                    }
                }).then(function (resp) {
                    console.log('Success ' + resp);
                    valueUpdate();
                    var productId = resp.data.id;
                    console.log(productId);
                    $scope.success('The product is successfully registered!');
                    $scope.imageUpload(productId, $scope.files);
                    // $scope.categoryArr.forEach(function(categoryElement) {
                    // 	$scope.categoryArrTemp.forEach(function(categoryTempElement) {
                    //
                    // 	});
                    // });
                    var arrayEquals = $scope.ArrayEquals($scope.categoryArr, $scope.categoryArrTemp);
                    if (!arrayEquals) {
                        addProductCategory(productId, $scope.categoryArr);
                    }
                    // addProductCategory(productId,$scope.categoryArr);
                    // $scope.addActivoty();
                    $scope.messageProductAdd = "The product is successfully registered!";

                    setTimeout($location.path('/userPage'), 3000);


                }, function (resp) {
                    console.log('Error status: ' + resp);
                }, function (evt) {
                    vm.progress = parseInt(100.0 * evt.loaded / evt.total + '%');
                    vm.message = 'Your review has been added successfully!'
                    // console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);

                });
            }
        }
        /**
         * Add Product function-End
         */

        vm.submit = function (manufact, brand) {
            // $scope.files.forEach(function(file) {
            if (manufact !== undefined) {
                vm.manufacturer = manufact
            }
            if (brand !== undefined) {
                vm.brand = brand
            }
            if ($scope.manufacturer !== undefined) {
                vm.manufacturer = $scope.manufacturer
            }
            if ($scope.brand !== undefined) {
                vm.brand = $scope.brand
            }
            if (vm.manufacturer === undefined || vm.brand === "" || vm.manufacturer === " ") {
                return $scope.manufacturerError = true;
            } else {
                $scope.manufacturerError = false;
            }
            if (vm.brand === undefined || vm.brand === "" || vm.barnd === " ") {
                return $scope.brandError = true;
            } else {
                $scope.brandError = false;
            }
            if (isNaN(vm.manufacturer)) {
                UserService.AddManufacturerId(vm.manufacturer)
                    .then(function (response) {
                        if (response) {
                            vm.manufacturer = response.data;
                            UserService.AddBrandId(vm.brand, vm.manufacturer)
                                .then(function (res) {
                                    if (res) {
                                        vm.brand = res.data.id;
                                        addProduct();
                                    }

                                });

                        }


                    });
            } else {
                if (isNaN(vm.brand)) {
                    UserService.AddBrandId(vm.brand, vm.manufacturer)
                        .then(function (res) {
                            if (res) {
                                vm.brand = res.data.id;
                                addProduct();
                            }

                        });
                }
                else {
                    addProduct();
                }
            }

        };
        $scope.draft = function (manufact, brand) {
            vm.status = 5;
            vm.submit(manufact, brand);
        }

// // NOW UPLOAD THE FILES.
// 		$scope.uploadFiles = function (productId) {
//
// 			//FILL FormData WITH FILE DETAILS.
// 			var data = new FormData();
//
// 			for (var i in $scope.files) {
// 				data.append("productId",productId)
// 				data.append("reviewPhoto", $scope.files[i]);
// 			}
//
// 			// ADD LISTENERS.
// 			var objXhr = new XMLHttpRequest();
//
//
// 			// SEND FILE DETAILS TO THE API.
// 			objXhr.open("POST", "/productImgUpload");
// 			objXhr.send(data);
// 		}


    }
]);
/* Similar Search Controller */
easyrateApp.controller('SimilarCtrl', [
    '$scope', '$http', '$location', '$routeParams', 'Product', 'UserService', 'UserDataService', '$rootScope', '$cookieStore', 'Upload',
    function ($scope, $http, $location, $routeParams, Product, UserService, UserDataService, $rootScope, $cookieStore, Upload) {
        var vm = this;
        $scope.totalItems;
        $scope.scroleIndex = 0;
        $scope.startList;
        $scope.stopLoadingData;
        $scope.letterLimit = 30;
        vm.productId = $routeParams.productId;
        vm.status = 1;
        var userId;
        $rootScope.userData = $cookieStore.get('userData') || {};
        if ($rootScope.userData.currentUser) {
            userId = $rootScope.userData.currentUser.ID
        }
        $scope.close = function () {
            $location.path('/home');
        }

        UserService.GetProductCategory(vm.productId)
            .then(function (reg) {

                if (reg.length > 0) {

                    reg[0].CATEGORY_ID;
                    $scope.searching(reg[0].CATEGORY_ID, 0, 0);
                } else {

                }
            });

        $scope.searching = function (categoryId, newPageNumber, searcheIndex) {
            $scope.getProductList = [];
            $scope.startList = 0;
            $scope.totalItems;
            $scope.errorResult = ""
            UserService.getSimilarProductList($scope.searchingText, newPageNumber, categoryId)
                .then(function (user) {

                    if (user.data.product.length > 0) {
                        $scope.totalItems = user.data.total;

                        if (searcheIndex === 0) {
                            $scope.getSimilarProductList = user.data.product;
                            console.log($scope.getSimilarProductList);
                        }
                        else {

                            user.data.product.forEach(function (data) {
                                // if($scope.index===)
                                $scope.getSimilarProductList.push(data);
                                console.log($scope.getSimilarProductList);
                                $scope.scroleIndex = 0;
                            }, this);


                        }
                        if ($scope.getProductList.length === $scope.totalItems) {
                            $scope.stopLoadingData = true;
                            $scope.scrollDataStop = true;
                        }
                        else {
                            $scope.stopLoadingData = false;
                            $scope.scrollDataStop = false;
                        }
                        // $scope.getProductList = user.data;
                        $scope.loading = false;
                    } else {
                        $scope.getSimilarProductList = [];
                        $scope.loading = false;
                        $scope.errorResult = "Result Not Found!"

                    }
                    if ($scope.getSimilarProductList.length === $scope.totalItems) {
                        $scope.stopLoadingData = true;
                    }
                    else {
                        $scope.stopLoadingData = false;
                    }

                    if ($scope.startList === undefined) {
                        $scope.startList = 0;
                    }
                    $scope.startList += 1;
                    console.log($scope.startList);
                });

        }


        $scope.show_more = function () {
            if (!$scope.stopLoadingData) {
                return;
            }
            $scope.scroleIndex++;
            if ($scope.scroleIndex === 6) {
                $scope.loading = true;
                if (!$scope.stopLoadingData) {
                    $scope.searching($scope.searchingText, $scope.startList, 1);
                }
                $scope.scroleIndex = 0;
            }
        };

    }
]);
/* Add Review Controller */
easyrateApp.controller('AddReviewCtrl', [
    '$scope', '$http', '$location','$window', '$routeParams', 'Product', 'UserService', 'UserDataService', '$rootScope', '$cookieStore', 'Upload',
    function ($scope, $http, $location,$window, $routeParams, Product, UserService, UserDataService, $rootScope, $cookieStore, Upload) {
        var vm = this;
        vm.productId = $routeParams.productId;
        vm.status = 4;
        vm.followProduct=followProduct;
        var userId;
        $rootScope.userData = $cookieStore.get('userData') || {};
        if ($rootScope.userData.currentUser) {
            userId = $rootScope.userData.currentUser.ID
        }
        $scope.close = function () {
            $window.history.back();
            // $location.path('/home');
        }
        $scope.go_back = function() {
            $window.history.back();
        };
        /**
         *
         * get product by id
         */
        $scope.getProductDetail = {};
        (function () {
            UserService.GetProductDetailById($routeParams.productId)
                .then(function (productDetailById) {
                    if (productDetailById.length > 0) {
                        $scope.getProductDetail = productDetailById[0];
                    }
                });
        }());
        
        $scope.productImage = [];
        (function () {
        UserService.GetProductDetailImageById($routeParams.productId)
            .then(function (productImageById) {
                if (productImageById.length > 0) {
                    $scope.productImage = productImageById;
                    $scope.mainImageUrl = productImageById[0].RESOURCE;
                }
            });
        }());
        //////////////raiting////////////
        // function followProduct() {FollowService.followProduct(vm.productId)}
        // $scope.getMaanufactureProductDetList=FollowService.getFollowProductByUserId(userId);
        // $scope.isActive = FollowService.isFollowProduct(vm.productId,userId)
        $scope.getImagelList = [];
        $scope.getProductDetaiReviewList = [];
        function productData(productId) {
            UserService.GetFollowProductById(productId)
                .then(function (product) {

                    if (product.length > 0) {
                        $scope.getProductDetaiReviewList.push(product[0]);

                        $scope.getImagelList.push(product);
                        console.log($scope.getImagelList);

                    } else {

                    }
                });
        }
        (function ()  {
            UserService.GetFollowProductByUserId(userId)
                .then(function (followIdList) {
                    $scope.followIdList = [];
                    if (followIdList.length > 0) {
                        $scope.followIdList = followIdList;
                        $scope.followIdList.forEach(function (followId) {
                            productData(followId.PRODUCT_ID);
                        }, this);
                    } else {

                    }
                });
        }());

        function followProduct() {

            var parentCategoryId;
            UserService.GetProductCategory(vm.productId).then(function (reg) {
                if (reg.length > 0) {
                    parentCategoryId = reg[0].CATEGORY_PARENT_ID;
                    console.log(parentCategoryId);
                    UserService.DeleteFollowProduct(userId, vm.productId, parentCategoryId)
                        .then(function (reg) {
                            if (reg.success === true) {

                            }
                        });
                }
            });
        }
        UserService.GetFollowProductDetailsByid($routeParams.productId, userId)
            .then(function (handleSuccess) {
                if (handleSuccess.success === true) {
                    $scope.isActive = true;

                } else {
                    $scope.isActive = false;
                }
            });

        $scope.starRating = 0;
        $scope.hoverRating = 0;
        vm.hoverRating = 0;


        $scope.click = function (param) {
            vm.rat = param;
            console.log('Click');
        };

        $scope.mouseHover = function (param) {
            console.log('mouseHover(' + param + ')');
            $scope.hoverRating = param;
            vm.hoverRating = param;

        };

        $scope.mouseLeave = function (param) {
            console.log('mouseLeave(' + param + ')');
            $scope.hoverRating = param + '*';
        };

        //////////////raiting-end////////////
        ///////////////////////////image review upload start/////////////

        $scope.imageErrorChk = function () {
            if ($scope.files === undefined) {
                $scope.imgError = true;
            }
            else {
                if ($scope.files.length === 0) {
                    $scope.imgError = true;
                }
                else {
                    $scope.imgError = false;
                }
            }
        }
        var files = [];
        $scope.imageAdd = function () {

            if ($scope.files !== undefined) {
                for (var i = 0; i < $scope.files.length; i++) {
                    files.push($scope.files[i]);
                }
                $scope.files = files;
            }
            $scope.imageErrorChk();
        }
        $scope.imgDelete = function (index) {
            $scope.files;
            var filesAfterDel = [];
            for (var i = 0; i < $scope.files.length; i++) {
                if (i !== index) {
                    filesAfterDel.push($scope.files[i]);
                }
            }
            $scope.files = filesAfterDel;
            files = filesAfterDel;
            $scope.imageErrorChk();
            $scope.files.forEach(function (entry) {
                console.log(entry);
            });
            console.log($scope.files);
        }
        // $scope.imgDelete = function (index) {
        // 	$scope.files;
        // 	var files = [];
        // 	for (var i = 0; i < $scope.files.length; i++) {
        // 		if (i !== index) {
        // 			files.push($scope.files[i]);
        // 		}
        // 	}
        // 	$scope.files = files;
        // 	$scope.files.forEach(function (entry) {
        // 		console.log(entry);
        // 	});
        // 	console.log($scope.files);
        // }
        $scope.AddReviewActivity = function (reviewId) {
            UserService.AddReviewActivity(userId, $routeParams.productId, reviewId)
                .then(function (reg) {

                    if (reg.sucsess === true) {

                        // $scope.mainReviewImageUrl =  $scope.getProductDetaiReviewList[0].RESOURCE;
                    } else {

                    }
                });
        }
        $scope.reviewProductScoring = function (productId) {
            UserService.AddProductScore(productId)
                .then(function (reg) {

                    if (reg.sucsess === true) {

                        // $scope.mainReviewImageUrl =  $scope.getProductDetaiReviewList[0].RESOURCE;
                    } else {

                    }
                });
        }

        $scope.submit = function () {

            Upload.upload({
                url: '/reviewAdd',
                data: {userId: userId, review: vm.review, rating: vm.rat, productId: vm.productId, status: vm.status}
            }).then(function (resp) {
                console.log('Success ' + resp);
                var reviewId = resp.data.id;
                $scope.imageUpload(reviewId);
                $scope.AddReviewActivity(reviewId);
                $scope.reviewProductScoring(vm.productId)
                // $location.path('/userPage');
            }, function (resp) {
                console.log('Error status: ' + resp);
            }, function (evt) {
                vm.progress = parseInt(100.0 * evt.loaded / evt.total + '%');
                vm.message = 'Your review has been added successfully!'
                // console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });

        };
        $scope.imageUpload = function (reviewId) {
            $scope.files.forEach(function (file) {

                Upload.upload({
                    url: '/reviewImgUpload',
                    data: {reviewId: reviewId, userId: userId, file: file}
                }).then(function (resp) {
                    console.log('Success ' + resp);
                    console.log(resp);
                    // vm.reviewData();
                    // $scope.addReviewHide = false;
                }, function (resp) {
                    console.log('Error status: ' + resp);
                }, function (evt) {
                    vm.progress = parseInt(100.0 * evt.loaded / evt.total + '%');
                    // console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
            });
        };

/////////////////////////image review upload -end//////////////

    }
]);



