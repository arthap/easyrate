
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
