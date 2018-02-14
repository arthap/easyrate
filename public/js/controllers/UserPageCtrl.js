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


