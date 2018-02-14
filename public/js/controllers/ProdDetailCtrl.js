easyrateApp.controller('ProductDetailCtrl', [
    '$scope', '$http', '$location','$window', '$routeParams', 'Product', 'UserService', 'UserDataService', '$rootScope', '$cookieStore', 'Upload',
    function ($scope, $http, $location,$window, $routeParams, Product, UserService, UserDataService, $rootScope, $cookieStore, Upload) {
        $scope.productId = $routeParams.productId;
        var vm = this;
        vm.reviewDiscription = reviewDiscription;
        vm.reviewData = reviewData;
        vm.followProduct = followProduct;
        // vm.rating=rating;
        var userId;
        $scope.index;
        $scope.ind;
        $scope.slideShow = false;
        
        $rootScope.userData = $cookieStore.get('userData') || {};
        if ($rootScope.userData.currentUser) {
            vm.user = $rootScope.userData.currentUser
            userId = vm.user.ID
        }
        $scope.slShow = function (index) {
            $scope.index = index;
            $scope.ind = $scope.index;
            $scope.slideShow = true;
            console.log(index);
        };
        //////////////raiting////////////
        $scope.starRating = 0;
        $scope.hoverRating = 0;
        $scope.click = function (param) {
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
        $scope.rating = function (number) {
            return number;
        }
        //////////////raiting-end////////////
        //////////////follow/unfollow///////////
        UserService.GetFollowProductDetailsByid($routeParams.productId, userId)
            .then(function (handleSuccess) {
                if (handleSuccess.success === true) {
                    $scope.isActive = true;

                } else {
                    $scope.isActive = false;
                }
            });
        //////////////follow/unfollow-end///////////
        // function reviewData() {
        //     UserService.GetProductReviewtById($routeParams.productId)
        //         .then(function (productReviewById) {
        //             $scope.getProductDetaiReviewList = [];
        //             if (productReviewById.length > 0) {
        //                 $scope.getProductDetaiReviewList = productReviewById;
        //                 // $scope.mainReviewImageUrl =  $scope.getProductDetaiReviewList[0].RESOURCE;
        //                 $scope.userData = UserDataService.getUserData();
        //                 UserService.GetUserActivityByUserId(userId)
        //                     .then(function (userActivity) {
        //                         $scope.errorLike = false;
        //                         $scope.errorDisLike = false;
        //                         if (userActivity.length > 0) {
        //                             $scope.userActivity = userActivity;
        //                             $scope.activType($scope.getProductDetaiReviewList, $scope.userActivity);
        //                             $scope.addReviewHide = false;
        //                             // setTimeout(function() {   location.reload(); }, 1);
        //                         } else {
        //                             $scope.activType($scope.getProductDetaiReviewList, 0);
        //                         }
        //                     });
        //             }
        //         });
        // }

        $scope.direction = 'left';
        $scope.currentIndex = 0;
        $scope.setCurrentSlideIndex = function (index) {
            $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
            $scope.currentIndex = index;
        };
        $scope.isCurrentSlideIndex = function (index) {
            return $scope.currentIndex === index;
        };
        $scope.isCurrentPhotoIndex = function (index, ind) {
            if ($scope.index === ind) {
                return $scope.currentIndex === index;
            }
                return false;
            
        };

        $scope.prevSlide = function () {
            $scope.direction = 'left';
            $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
        };

        $scope.nextSlide = function () {
            $scope.direction = 'right';
            $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
        };


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

        $scope.GetProductDetailById = function () {
            UserService.GetProductDetailById($routeParams.productId)
                .then(function (productDetailById) {
                    if (productDetailById.length > 0) {
                        $scope.getProductDetailList = [];
                        $scope.getProductDetailList = productDetailById;

                        vm.status = productDetailById[0].STATUS;

                    } else {

                    }
                });
        }
        $scope.GetProductDetailById();

        $scope.GetProductDetailImageById = function () {
            UserService.GetProductDetailImageById($routeParams.productId)
                .then(function (productImageById) {
                    if (productImageById.length > 0) {
                        $scope.getProductDetaiImagelList = [];
                        $scope.getProductDetaiImagelList = productImageById;
                        $scope.mainImageUrl = $scope.getProductDetaiImagelList[0].RESOURCE;
                    } else {

                    }
                });
        }
        $scope.GetProductDetailImageById();
        $scope.AddReviewActivity = function (reviewId) {
            UserService.AddReviewActivity(userId, $routeParams.productId, reviewId)
                .then(function (reg) {
                    if (reg.sucsess === true) {
                        // $scope.mainReviewImageUrl =  $scope.getProductDetaiReviewList[0].RESOURCE;
                    }
                });
        }
        $scope.reviewProductScoring = function (productId) {
            UserService.AddProductScore(productId)
                .then(function (reg) {
                    $scope.GetProductDetailById();
                    $scope.GetProductDetailImageById();
                    vm.reviewData();
                    if (reg.sucsess === true) {
                        // $scope.mainReviewImageUrl =  $scope.getProductDetaiReviewList[0].RESOURCE;
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
                vm.review = '';
                $scope.imageUpload(reviewId);
                $scope.AddReviewActivity(reviewId);
                // $location.path('/userPage');
            }, function (resp) {
                console.log('Error status: ' + resp);
            }, function (evt) {
                vm.progress = parseInt(100.0 * evt.loaded / evt.total + '%');
                // console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        };
        $scope.imageUpload = function (reviewId) {
            if ($scope.files !== undefined && $scope.files.length > 0) {
                $scope.files.forEach(function (file) {
                    Upload.upload({
                        url: '/reviewImgUpload',
                        data: {reviewId: reviewId, userId: userId, file: file}
                    }).then(function (resp) {
                        $scope.files = [];
                        // console.log('Success ' + resp);
                        // console.log(resp);
                        $scope.reviewProductScoring(vm.productId);
                        // vm.reviewData();
                        // $scope.addReviewHide = false;setTimeout(function() {   location.reload(); }, 1);
                    }, function (resp) {
                        console.log('Error status: ' + resp);
                    }, function (evt) {
                        vm.progress = parseInt(100.0 * evt.loaded / evt.total + '%');
                        // console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                    });
                });
            } else {
                $scope.reviewProductScoring(vm.productId);
            }
        };
/////////////////////////image review upload -end//////////////
//         Product.get({productId: $routeParams.productId}, function (data) {
//             $scope.phone = data;
//             $scope.mainImageUrl = data.images[0];
//             //data.$save();
//         });
        var i;
        $scope.activType = function (a, b) {
            $scope.likeDisLikeT = [];
            i++;
            a.forEach(function (data1, i) {
                $scope.likeDisLikeT.push({REVIEW_ID: data1.ID, ACTIVITY_TYPE: 0});
            }, this);
            if (b !== 0) {
                a.forEach(function (data, i) {
                    b.forEach(function (data2) {
                        if (data.ID === data2.REVIEW_ID) {
                            $scope.likeDisLikeT[i] = data2;
                        }
                    }, this);
                }, this);
            }
        }
        
        function reviewData() {
            UserService.GetProductReviewtById($routeParams.productId)
                .then(function (productReviewById) {
                    $scope.getProductDetaiReviewList = [];
                    if (productReviewById.length > 0) {
                        $scope.getProductDetaiReviewList = productReviewById;
                        // $scope.mainReviewImageUrl =  $scope.getProductDetaiReviewList[0].RESOURCE;
                        $scope.userData = vm.user;
                        UserService.GetUserActivityByUserId(userId)
                            .then(function (userActivity) {
                                $scope.errorLike = false;
                                $scope.errorDisLike = false;
                                if (userActivity.length > 0) {
                                    $scope.userActivity = userActivity;
                                    $scope.activType($scope.getProductDetaiReviewList, $scope.userActivity);
                                } else {
                                    $scope.activType($scope.getProductDetaiReviewList,0);
                                }
                            });
                    }
                });
        }
        $scope.addReview = function () {
            $scope.addReviewHide = !$scope.addReviewHide;
        }
        /////////////////review Tab//////////////////
        $scope.like = function (reviewId, like, dislike) {
            UserService.AddLike(reviewId, userId, $routeParams.productId, like, dislike)
                .then(function (req) {
                    if (req) {
                        vm.reviewData();
                        // $scope.userAct();
                        // $scope.mainReviewImageUrl =  $scope.getProductDetaiReviewList[0].RESOURCE;
                    } else {

                    }
                });
        }
        $scope.disLike = function (reviewId, like, dislike) {
            UserService.AddDisLike(reviewId, userId, $routeParams.productId, like, dislike)
                .then(function (req) {
                    if (req) {
                        vm.reviewData();
                    }  
                });
        }


        $scope.writeLikeDislakePermitions = function (likeDislike, detailId, like, dislike, likeDislikeType) {
            if (userId === undefined) {
                $location.path('/login');
            }
            else {
                if (likeDislike === 1) {
                    if (likeDislikeType === 6) {
                        dislike += 1;
                    }
                    $scope.like(detailId, like, dislike);
                }
                else {
                    if (likeDislikeType === 6) {
                        like += 1;
                    }
                    $scope.disLike(detailId, like, dislike);
                }
            }
        }
        $scope.abstain = function (likeDislike, detailId, like, dislike) {
            if (userId === undefined) {
                $location.path('/login');
            }
            else {
                if (likeDislike === 5) {

                    UserService.DisLikeRecovere(detailId, userId, $routeParams.productId, dislike)
                        .then(function (req) {

                            if (req) {
                                reviewData();
                            }
                        });
                }
                if (likeDislike === 4) {
                    UserService.LikeRecovere(detailId, userId, $routeParams.productId, like)
                        .then(function (req) {

                            if (req) {
                                reviewData();

                            }
                        });
                }
            }
        }
        $scope.writeReviewPermitions = function () {
            if (userId === undefined) {
                $location.path('/login');
            }
            else {
                $location.path('/addReview/'+$scope.productId);
                $scope.addReviewHide = true
            }
        }
        $scope.setImage = function (imageUrl) {
            $scope.mainImageUrl = imageUrl;
        }
        // $scope.addReviewHide=false;
        $scope.rating;
        $scope.active = 'active'
        $scope.active1 = '';
        $scope.active2 = '';
        $scope.active3 = '';
        $scope.hidden = false;
        $scope.hidden1 = true;
        $scope.hidden2 = true;
        $scope.hidden3 = true;
        $scope.userData = {};
        vm.productId = $routeParams.productId;
        vm.review = '';
        $scope.getReviewImg = function (id) {
            $scope.getProductReviewImageList = [];
            UserService.GetProductReviewImageById(id)
                .then(function (reviewImageById) {
                    if (reviewImageById.length > 0) {
                        $scope.getProductReviewImageList.push(reviewImageById[0]);

                    }
                });
        }
        $scope.getReviewCreatorName = function (creatorId) {
            $scope.reviewCreatorParamList = [];
            UserService.GetProductReviewCreatorNameById(creatorId)
                .then(function (reviewCreatorParams) {
                    if (reviewCreatorParams.length > 0) {
                        $scope.reviewCreatorParamList.push(reviewCreatorParams[0]);

                        console.log(reviewCreatorParams[0]+" :"+reviewCreatorParams[0].USERNAME );
                    }
                })
        }
/////////////// Review tab-End////////////
        $scope.getProductDetaiExternalReviewList = function () {
            $scope.externalReviewList = [];
            UserService.getProductDetaiExternalReviewList(vm.productId)
                .then(function (externalReviewList) {
                    if (externalReviewList.length > 0) {
                        $scope.externalReviewList = externalReviewList;

                    }
                })
        }
/////////////////External review tab/////


/////////////////External review tab-End/////
        var parentCategoryId;
        function followProduct() {
            UserService.GetProductCategory($routeParams.productId).then(function (reg) {
                if (reg.length > 0) {
                    parentCategoryId = reg[0].CATEGORY_PARENT_ID;
                    UserService.AddFollowProduct(userId, $routeParams.productId, parentCategoryId)
                        .then(function (reg) {
                            if (reg.sucsess === true) {
                                // $scope.mainReviewImageUrl =  $scope.getProductDetaiReviewList[0].RESOURCE;
                            }
                            });
                }
            });
        }


        vm.like = 0;
        vm.disLike = 0;
   
        function reviewDiscription() {
            $scope.userData = UserDataService.getUserData();
            if ($scope.userData !== undefined) {
                vm.userId = $scope.userData[0].ID;
            }
            UserService.PostProductReviewById(vm)
                .then(function (reviewAdd) {
                    if (reviewAdd.success === true) {
                        vm.reviewData();
                    } else {
                        $location.path('/signIn');
                    }
                });
        }
    }
]);