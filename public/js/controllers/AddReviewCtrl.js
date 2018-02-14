
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



