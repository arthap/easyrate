easyrateApp.controller('ProfileDetailCtrl', [
    '$scope', '$http', '$location','$window', '$routeParams', 'Product', 'UserService', 'UserDataService', '$rootScope', '$cookieStore', 'Upload',
    function ($scope, $http, $location, $window, $routeParams, Product, UserService, UserDataService, $rootScope, $cookieStore, Upload) {

        var vm = this;
        vm.userData = $cookieStore.get('userData').currentUser;
        vm.user = vm.userData.username;
        vm.email = vm.userData.email;
        vm.userId = vm.userData.ID;
        vm.currentUserId =  $routeParams.userId;;

        vm.followProduct = followProduct;
        
        vm.productData = productData;
        vm.submit = submit;
        vm.updateCookie=updateCookie;
        vm.getUserById=getUserById;
        vm.GetReviewCountByCreatorId=GetReviewCountByCreatorId;
        vm.GetAddProductCountByCreatorId=GetAddProductCountByCreatorId


        $scope.imageAdd = function () {
            if ($scope.file !== undefined) {
                vm.file = $scope.file;
            }
        }

        $scope.inputType = 'password';
        $scope.hideShowPassword = function () {
            if ($scope.inputType == 'password')
                $scope.inputType = 'text';
            else
                $scope.inputType = 'password';
        };

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

        function submit () {
            vm.progress=0;
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
        function updateCookie(){
            UserService.GetUserById(vm.userData.ID).then(function (user) {

                if (user !=undefined && user.success!== false) {
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
                    } else {

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
                                $scope.isActive=!$scope.isActive;
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

        function getUserById() {
            UserService.GetUserById(vm.currentUserId)
                .then(function (user) {
                    if (user) {
                        vm.user = user;
                    }
                });
        }

        function GetReviewCountByCreatorId(){
            UserService.GetReviewCountByCreatorId(vm.userId)
                .then(function (reviewCount) {
                    if (reviewCount) {
                        vm.reviewCount = reviewCount;
                    }
                });
        }
        function GetAddProductCountByCreatorId(){
            UserService.GetAddProductCountByCreatorId(vm.userId)
                .then(function (addProductCoun) {
                    if (addProductCoun) {
                        vm.addProductCoun = addProductCoun;
                    }
                });
        }
    }
]);