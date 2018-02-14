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

easyrateApp.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
 
                event.preventDefault();
            }
        });
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