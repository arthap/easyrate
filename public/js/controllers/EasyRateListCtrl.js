easyrateApp.controller('easyRateListCtrl', [
    '$scope', '$http', '$q', '$location', '$routeParams', 'Product', '$cookieStore', '$rootScope', 'UserService', 'UserDataService','$anchorScroll','AuthenticationService',
    function ($scope, $http, $q, $location, $routeParams, Product, $cookieStore, $rootScope, UserService, UserDataService,$anchorScroll,AuthenticationService ) {
        // AuthenticationService.ClearUserData();
        var vm = this;
        $scope.myCroppedImage;
        $scope.mainPage = true;
        $scope.totalItems = 0;
        $scope.scroleIndex = 0;
        $scope.startList;
        $scope.stopLoadingData;
        $scope.scrollDataStop = false;
        $scope.editPermission = false;
        $scope.manufactShow = true;
        vm.logOut = false;
        var paPromise = $q.defer()
        $scope.letterLimit = 30;

        if($cookieStore.get('userData')){
            vm.userData = $cookieStore.get('userData').currentUser;

            vm.user = vm.userData.username;
            vm.email = vm.userData.email;
            vm.userId = vm.userData.ID;
        }
        $scope.openUrl=function (url){
            window.open(url, '_blank','heigth=600,width=600');   // may alse try $window
        }

        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            // if ($location.path() != "/"  && !($location.path().indexOf("/similar") >=0)) {
            //     $rootScope.hideit = true;
            // }else{
            //     $rootScope.hideit = false;
            // }
           console.log($rootScope.user);
            if ($location.path() == "/register") {  $location.path('/register');}
            if ($location.path() == "/login") {vm.userData=[]; vm.userId=undefined; $location.path('/login');}
            // if ($location.path() == "/add") {  $location.path('/login');}
            if ($location.path().indexOf("/add") >= 0   && !$cookieStore.get('userData')) {  $location.path('/login');}
            if ($location.path().indexOf("/addReview/") >= 0   && vm.userId === undefined) {  $location.path('/login');}
            if ($location.path().indexOf("/profile") >= 0   && vm.userId === undefined) {  $location.path('/login');}
            if ($location.path().indexOf("/administrationUserPage") >= 0   && vm.userId === undefined) {  $location.path('/login');}
            // if ($location.path() == "/image-crop") {
            //     $scope.openUrl("/image-crop")
            // }
            if ( vm.userData !== undefined && vm.userData.USER_TYPE === "1") {
                if ($location.path() === "/profile") {
                    $location.path('/administrationUserPage');
                    // $scope.manufactShow=false;
                }
            }

        });


        $(window).on('hashchange', function () {

            if ($location.path() === "/") {

                $scope.mainPage = true;
            }
            else {
                if ($location.path() === "/login") {
                    if (vm.logOut === true) {
                        $scope.userData = undefined;
                        vm.userData = undefined;
                        vm.userName = undefined;
                        $scope.userName = undefined;
                        vm.logOut = false;
                        $location.path('/');
                    }
                }
                $scope.mainPage = false;
            }



            // if ($location.path().indexOf( "/addEditAdministrationProduct/")>=0) {$scope.editPermission=true;
            // }
            // if ($location.path() === "/addProduct") {if(userPermission==="1") {$scope.editPermission=false;}}
        });
        $scope.logOut = function () {
            vm.logOut = true;

        }

        $scope.mainPage = $rootScope.locRoot;

        // Product.query({productId: 'products'}, function (data) {
        // 	$scope.phones = data;
        // });
        $scope.verify = function () {
            if (vm.userData!== undefined) {
                var userId = vm.userData.ID;
            }
            if (userId === undefined) {
                $location.path('/signIn');
            } else {
                $location.path('/userPage');
            }
        }
        $scope.mainPageDisable = function () {
            $scope.mainPage = false;
            $scope.scrollDataStop = false;

        }
        $scope.mainPageEnable = function () {
            $scope.mainPage = true;
            $scope.scrollDataStop = true;

        }

        // $scope.singshow=function () {
        // 	if($location.path()==="/singIn"){
        // 	$scope.singShow=false;}
        // 	else{$scope.singShow=true;}
        //
        //
        // }
        $scope.reloadFn = function () {
            // location.reload();
        }


        if ($scope.searchingText === undefined) {
            $scope.searchingText = "";
        }
        // $scope.searchingText = "";

        $scope.categoryLVL1 = [];

        $scope.getCategoryLvL1 = function () {

            if ($scope.categoryLVL1.length == 0) {
                UserService.GetCategoryLvL1()
                    .then(function (response) {
                        if (response.length > 0) {
                            response.forEach(function (data) {
                                $scope.categoryLVL1.push(data);
                            }, this);
                        }
                        console.log($scope.categoryLVL1);
                    });
            }
        }
        $scope.getCategoryLvL1();
        // $http.post('/productCategoriAdd')
        // 	.then(handleSuccess, handleError('Error getting product by id'));

        $scope.catId;
        $scope.searching = function (searchingText, newPageNumber, searcheIndex, categoryId) {
            if (searcheIndex === 1) {
                $scope.scrollDataStop = true;
            }
            if (searcheIndex === 0) {
                $scope.scrollDataStop = false;
                $scope.stopLoadingData = false;
            }
            if (categoryId === undefined) {
                $scope.catId = "*";
            } else {
                $scope.catId = categoryId;
            }
            if (searcheIndex === 0) {
                $scope.getProductList = [];
                $scope.startList = 0;
                $scope.totalItems;
            }
            // if(newPageNumber==undefined){newPageNumber=1;}
            // $scope.pageNumber=newPageNumber;
            if (newPageNumber === 0) {
                $location.path('/');
            }
            $scope.errorResult = ""
            $scope.product = {};
            UserService.GetProductList(searchingText, newPageNumber, $scope.catId)
                .then(function (user) {
                    if (user.data.product.length > 0) {
                        $scope.totalItems = user.data.total;

                        if (searcheIndex === 0) {
                            $scope.getProductList = user.data.product;
                            $scope.stopLoadingData = false;
                            console.log($scope.getProductList);
                        }
                        else {
                            user.data.product.forEach(function (data) {
                                // if($scope.index===)
                                $scope.getProductList.push(data);
                                console.log($scope.getProductList);
                                $scope.scroleIndex = 0;
                            }, this);
                            paPromise.resolve(user)
                            $scope.loading = false;
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
                        $scope.getProductList = [];
                        $scope.loading = false;
                        $scope.errorResult = "Result Not Found!"

                    }
                    if ($scope.startList === undefined) {
                        $scope.startList = 0;
                    }
                    $scope.startList += 1;
                    console.log($scope.startList);
                });
            //
            var ele = document.getElementById('product');
            window.scrollTo(ele.offsetLeft,ele.offsetTop);
            // $location.hash('/');
            //
            // // call $anchorScroll()
            // $anchorScroll();
        }
        $scope.show_more = function (scrollDataStp) {
            if ($scope.scrollDataStop) {
                return;
            }
            else {
                $scope.scroleIndex++;
                if ($scope.scroleIndex === 6) {
                    // $scope.loading = true;
                    if (!$scope.stopLoadingData) {
                        $scope.searching($scope.searchingText, $scope.startList, 1, $scope.catId);
                        $scope.scroleIndex = 0;
                    }
                }
            }
        };
        // UserDataService.setUserData();
        // $scope.userData = {};
        // $scope.userData = UserDataService.getUserData();

        // if($cookieStore.get('globals').isObject){
        //     UserModelService.setUser($cookieStore.get('globals').currentUser);
        //     $scope.userData= $cookieStore.get('globals').currentUser;
        $scope.avatarShow = false;
        if (vm.userData !== undefined ) {
            // $scope.userCurrentRate=userData[0].CURRENT_RATE;
            $scope.userName = vm.userData.USERNAME;
            $scope.userAvatar = vm.userData.AVATAR;
            if ($scope.userAvatar !== null) {
                if ($scope.userAvatar.indexOf(".jpg") || $scope.userAvatar.indexOf(".png")) {
                    $scope.avatarShow = true;
                }
            }
            console.log(vm.userData.USERNAME);
            console.log(vm.userData.CURRENT_RATE);
        }
        $scope.singout = function () {
            $scope.singOut = !$scope.singOut;
        }
    }
]);