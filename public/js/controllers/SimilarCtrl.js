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
