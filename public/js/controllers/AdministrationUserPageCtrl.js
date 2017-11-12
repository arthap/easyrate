
/* Administration User  Page in Controller */
easyrateApp.controller('AdministrationUserPageCtrl', [
    '$scope', '$timeout','$rootScope', '$cookieStore', '$http', '$location', 'AuthenticationService', 'FlashService', 'UserService', 'Upload', 'Notification',
    function ($scope,$timeout, $rootScope, $cookieStore, $http, $location, AuthenticationService, FlashService, UserService, Upload, Notification) {
        var vm = this;
        vm.productData = productData;
        vm.addProfileImage = addProfileImage;
        vm.updateCookie = updateCookie;
        vm.change = change;
        $rootScope.userData = $cookieStore.get('userData') || {};
        if ($rootScope.userData.currentUser) {
            vm.currentUser = $rootScope.userData.currentUser;
            vm.userId = $rootScope.userData.currentUser.ID;
            vm.manufacturerId = $rootScope.userData.currentUser.MANUFACTURER_ID;
        }
        vm.userGlobalData = $cookieStore.get('globals').currentUser;
        $scope.inputType = 'password';
        $scope.hideShowPassword = function () {
            if ($scope.inputType == 'password')
                $scope.inputType = 'text';
            else
                $scope.inputType = 'password';
        };

        function addProfileImage() {
             vm.progress=0;
             $timeout(function () {
                 Upload.upload({
                     url: '/api/photo',
                     data: {id: vm.currentUser.ID, file: vm.file}
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
        function updateCookie(){
            UserService.GetUserById(vm.currentUser.ID).then(function (user) {

                if (user !=undefined && user.success!== false) {
                    AuthenticationService.UpdateCredentials(user);

                }
            });

        }
        $scope.imageAdd = function () {
            if ($scope.file !== undefined) {
                vm.file = $scope.file;
            }
        }
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

        vm.getProductListByManufacturerId = function () {
            UserService.GetProductListByManufacturerId(vm.manufacturerId)
                .then(function (productListbyManufacturId) {
                    $scope.productList = [];
                    if (productListbyManufacturId.length > 0) {
                        $scope.productList = productListbyManufacturId;
                        // productListbyManufacturId.data.forEach(function(d) {
                        //
                        // 	$scope.productReviewRaitingArray.push([new Date(d.CREATED_AT).getTime()  , d.CURRENT_RATE]);
                        //
                        //
                        // }, this);;

                        console.log("Array");
                        console.log($scope.productList);

                    } else {

                    }
                })

        }
        vm.getProductListByManufacturerId();


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


        $scope.getMaanufactureProduct = [];
        $scope.getMaanufactureProductDetList = [];
        function productData(productId) {
            UserService.GetFollowProductById(productId)
                .then(function (product) {

                    if (product.length > 0) {
                        $scope.getMaanufactureProductDetList.push(product[0]);

                        $scope.getMaanufactureProduct.push(product);
                        console.log($scope.getMaanufactureProduct);

                    } else {

                    }
                });
        }

        ////////////////////Notification////////////////////
        $scope.success = function (notification) {
            Notification.success(notification);
        };
        ///////////////////Notification-end/////////////////
        $scope.deleteProduct = function (productId) {
            UserService.DeleteProductById(productId)
                .then(function (resp) {

                    if (resp) {
                        $scope.success('The product is successfully Deleted!');
                        vm.getProductListByManufacturerId();
                    } else {

                    }
                });
        }
        $scope.restoreProduct = function (productId) {
            UserService.RestoreProductById(productId)
                .then(function (resp) {

                    if (resp) {
                        $scope.success('The product is successfully Restored!');
                        vm.getProductListByManufacturerId();
                    } else {

                    }
                });
        }
        // $scope.getManufactureProductId=function () {
        // 	UserService.GetFollowProductId(vm.userId)
        // 		.then(function (followIdList) {
        // 			$scope.followIdList = [];
        // 			if (followIdList.length > 0) {
        // 				$scope.followIdList = followIdList;
        // 				$scope.followIdList.forEach(function(followId) {
        // 					productData(followId.PRODUCT_ID) ;
        // 				}, this);
        // 			} else {
        //
        // 			}
        // 		});
        // }
        // $scope.getManufactureProductId();
        // function login() {
        //     UserService.GetByUserName(vm.currentUser.USERNAME)
        //         .then(function (user) {
        //             if (user !== null) {
        //                 vm.remembeMe = vm.userGlobalData.remembeMe;
        //                 vm.currentUser = user[0];
        //                 AuthenticationService.Login(vm.currentUser.USERNAME, vm.currentUser.PASSWORD, vm.remembeMe, vm.remembeMe, function (response) {
        //                     if (response.success) {
        //                         $rootScope.userData = $cookieStore.get('userData') || {};
        //                         if ($rootScope.userData.currentUser) {
        //                             vm.currentUser = $rootScope.userData.currentUser;
        //                             vm.userId = $rootScope.userData.currentUser.ID;
        //                         }
        //                         location.reload();
        //
        //                     }
        //                 });
        //
        //             }
        //
        //         });
        // };
    }
]);