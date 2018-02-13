(function () {
    'use strict';

    angular
        .module('easyrateApp')
        .factory('UserService', UserService);

    UserService.$inject = ['$http',  '$q'];
    function UserService($http, $q) {
        var service = {};

        service.GetProductList = GetProductList;
        service.getSimilarProductList = getSimilarProductList;
        service.GetCategoryLvL1=GetCategoryLvL1;
        service.GetCategoryLvL2=GetCategoryLvL2;
        service.GetProductDetailById=GetProductDetailById;
        service.GetProductListByManufacturerId=GetProductListByManufacturerId;
        service.GetProductReviewtById=GetProductReviewtById;
        service.getProductDetaiExternalReviewList=getProductDetaiExternalReviewList;
        service.GetFollowProductById=GetFollowProductById;
        service.DeleteProductById=DeleteProductById;
        service.RestoreProductById=RestoreProductById;
        service.GetProductDetailImageById=GetProductDetailImageById;
        service.GetProductReviewImageById=GetProductReviewImageById;
        service.GetProductReviewCreatorNameById=GetProductReviewCreatorNameById;
        service.PostProductReviewById=PostProductReviewById;
        service.GetFollowProductDetailsByid=GetFollowProductDetailsByid
        service.DeleteFollowProduct=DeleteFollowProduct;
        service.AddFollowProduct=AddFollowProduct;
        service.AddReviewActivity=AddReviewActivity;
        service.GetReviewCountByCreatorId=GetReviewCountByCreatorId;
        service.GetAddProductCountByCreatorId=GetAddProductCountByCreatorId;
        service.AddProductScore=AddProductScore;
        service.GetFollowProductByUserId=GetFollowProductByUserId;
        service.GetManufacturerId=GetManufacturerId;
        service.GetProductCategory=GetProductCategory;
        service.AddProductCategory=AddProductCategory;
        service.DeleteImage=DeleteImage;
        service.AddManufacturerId=AddManufacturerId;
        service.GetproductReviewRaiting=GetproductReviewRaiting;
        service.AddBrandId=AddBrandId;
        service.GetBrandId=GetBrandId;
        service.AddEULA=AddEULA;
        service.AddLike=AddLike;
        service.LikeRecovere=LikeRecovere;
        service.DisLikeRecovere=DisLikeRecovere;
        service.AddDisLike=AddDisLike;
        service.GetUserActivityByUserId=GetUserActivityByUserId;
        service.GetAll = GetAll;
        service.GetById = GetById;
        service.UserAuthentication = UserAuthentication;
        service.GetUserById = GetUserById;
        service.Create = Create;
        service.Reset = Reset;
        service.ChangePassword=ChangePassword;
        service.ChangeEmail=ChangeEmail;
        service.Forgot=Forgot;
        service.Update = Update;
        service.Delete = Delete;


        return service;
        function GetProductList(searchingText,pageNumber,categoryId) {
            // return $http.post('/getProductList/' + searchingText+pageNumber).then(handleSuccess, handleError('Error getting product by searchingText'));
            var deferred = $q.defer();
            $http({

                method: 'POST',
                url: '/getProductList',
                data: 'searchingText=' + searchingText + '&pageNumber=' + pageNumber+'&categoryId='+categoryId,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (respond) {
                deferred.resolve(respond);
                // if success
                console.log(respond);
            }, function (error) {
                // if an error
                 console.error(error);
                deferred.resolve({success: false, message: error.data});
            });
            return deferred.promise;
        }
        function getSimilarProductList(searchingText,pageNumber,categoryId) {
            // return $http.post('/getSimilarProductList/' + searchingText+pageNumber).then(handleSuccess, handleError('Error getting product by searchingText'));
            var deferred = $q.defer();
            $http({

                method: 'POST',
                url: '/getSimilarProductList',
                data: 'searchingText=' + searchingText + '&pageNumber=' + pageNumber+'&categoryId='+categoryId,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (respond) {
                deferred.resolve(respond);
                // if success
                console.log(respond);
            }, function (error) {
                // if an error
                 console.error(error);
                deferred.resolve({success: false, message: error.data});
                });
            return deferred.promise;
        }
        function GetCategoryLvL1() {
            return $http.post('/GetCategoryLvL1').then(handleSuccess, handleError('Error getting Product Detail Image image by id'));
        }
        function GetCategoryLvL2() {
            return $http.post('/GetCategoryLvL2').then(handleSuccess, handleError('Error getting Product Detail Image image by id'));
        }
        function GetProductDetailImageById(id) {
            return $http.post('/GetProductDetailImageById/' + id).then(handleSuccess, handleError('Error getting Product Detail Image image by id'));
        }
        function GetProductReviewImageById(id) {
            return $http.post('/GetProductReviewImageById/' + id).then(handleSuccess, handleError('Error getting Product Review Imageimage by id'));
        }
        function GetProductReviewCreatorNameById(id) {
            return $http.post('/GetProductReviewCreatorNameById/' + id).then(handleSuccess, handleError('Error getting Product Review Creator Name by id'));
        }
        
        function GetProductDetailById(id) {
            return $http.post('/GetProductDetailById/' + id).then(handleSuccess, handleError('Error getting product detail by id'));
        }
        function GetProductListByManufacturerId(manufactId) {
            return $http.post('/GetProductListByManufacturerId/' + manufactId).then(handleSuccess, handleError('Error getting product detail by manufacturer id'));
        }
        
        function GetProductReviewtById(id) {
            return $http.post('/GetProductReviewtById/' + id)
                .then(handleSuccess, handleError('Error getting product by id'));
        }
        function GetReviewCountByCreatorId(id) {
            return $http.post('/GetReviewCountByCreatorId/' + id)
                .then(handleSuccess, handleError('Error getting product by id'));
        }
        function GetAddProductCountByCreatorId(id) {
            return $http.post('/GetAddProductCountByCreatorId/' + id)
                .then(handleSuccess, handleError('Error getting product by id'));
        }
        function getProductDetaiExternalReviewList(productId) {
            return $http.post('/getProductDetaiExternalReviewList/' + productId)
                .then(handleSuccess, handleError('Error getting External Review List by productId'));
        }
        
        function GetFollowProductById(productId) {
            return $http.post('/GetFollowProductById/' + productId)
                .then(handleSuccess, handleError('Error getting  product by id'));
        }
        function DeleteProductById(id) {
            return $http.post('/DeleteProductById/' + id)
                .then(handleSuccess, handleError('Error deleting product by id'));
        }
        function RestoreProductById(id) {
            return $http.post('/RestoreProductById/' + id)
                .then(handleSuccess, handleError('Error restoring product by id'));
        }
        function GetProductCategory(categoryId) {
            return $http.post('/GetProductCategory/' + categoryId)
                .then(handleSuccess, handleError('Error getting Product Category by id'));
        }
        function AddProductCategory(productId,categoryName) {
            var deferred = $q.defer();
            $http.post('/UpdateProductCategory', {productId:productId,categoryArr:categoryName}).then(function(respond){
                // if success
                deferred.resolve(respond);
                console.log(respond);
            }, function(error){
                // if an error
                deferred.resolve({success: false, message: error.data});
                console.error(error);
            });
 
            return deferred.promise;
        }
        function DeleteImage(imageUrlArray) {
            var deferred = $q.defer();
            $http.post('/DeleteImage', {imageUrlArray:imageUrlArray}).then(function(respond){
                // if success
                deferred.resolve(respond);
                console.log(respond);
            }, function(error){
                // if an error
                deferred.resolve({success: false, message: error.data});
                console.error(error);
            });

            return deferred.promise;
        }
        function AddManufacturerId(name) {
            return $http.post('/AddManufacturerId/' + name)
                .then(handleSuccess, handleError('Error getting product by id'));
        }
        function GetproductReviewRaiting(productId) {
            return $http.post('/GetproductReviewRaiting/' + productId)
                .then(handleSuccess, handleError('Error getting product by id'));
        }
        
        function AddBrandId(name,manufactId) {
                    var deferred = $q.defer();
                $http({

                    method: 'POST',
                    url: '/AddBrandId',
                    data: 'name=' + name + '&manufactId=' + manufactId ,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function (respond) {
                    deferred.resolve(respond);
                    // if success
                    console.log(respond);
                }, function (error) {
                    // if an error
                    deferred.resolve({success: false, message: error.data});
                    console.error(error);
                });
                return deferred.promise;
            }
        function AddLike(reviewId,userId,productId,like,dislike) {
                var like=like+1;
                var dislike;
                if(dislike-1<0){dislike=0;}
                else{dislike=dislike-1;}


                var deferred = $q.defer();
                $http({

                    method: 'POST',
                    url: '/AddLike',
                    data: 'userId=' + userId + '&productId=' + productId + '&reviewId=' + reviewId+ '&like=' + like + '&dislike=' + dislike,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function (respond) {
                    deferred.resolve({success: true});
                    // if success
                    console.log(respond);
                }, function (error) {
                    // if an error
                    deferred.resolve({success: false, message: error.data});
                    console.error(error);
                });
                return deferred.promise;
        }

        function LikeRecovere(reviewId,userId,productId,like) {
            var like=like-1;
          


            var deferred = $q.defer();
            $http({

                method: 'POST',
                url: '/LikeRecovere',
                data: 'userId=' + userId + '&productId=' + productId + '&reviewId=' + reviewId+ '&like=' + like ,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (respond) {
                deferred.resolve({success: true});
                // if success
                console.log(respond);
            }, function (error) {
                // if an error
                deferred.resolve({success: false, message: error.data});
                console.error(error);
            });
            return deferred.promise;
        }
        function AddDisLike(reviewId,userId,productId,like,dislike) {
            var like;
            var dislike=dislike+1;
            if(like-1<0){like=0;}
            else{like=like-1;}


            var deferred = $q.defer();
            $http({

                method: 'POST',
                url: '/AddDisLike',
                data: 'userId=' + userId + '&productId=' + productId + '&reviewId=' + reviewId+ '&like=' + like + '&dislike=' + dislike,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (respond) {
                deferred.resolve({success: true});
                // if success
                console.log(respond);
            }, function (error) {
                // if an error
                deferred.resolve({success: false, message: error.data});
                console.error(error);
            });
            return deferred.promise;
        }
        function DisLikeRecovere(reviewId,userId,productId,dislike) {
            var dislike=dislike-1;



            var deferred = $q.defer();
            $http({

                method: 'POST',
                url: '/DisLikeRecovere',
                data: 'userId=' + userId + '&productId=' + productId + '&reviewId=' + reviewId+ '&dislike=' + dislike ,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (respond) {
                deferred.resolve({success: true});
                // if success
                console.log(respond);
            }, function (error) {
                // if an error
                deferred.resolve({success: false, message: error.data});
                console.error(error);
            });
            return deferred.promise;
        }
        // function AddDisLike(id) {
        //     return $http.post('/AddDisLike/' + id).then(handleSuccess, handleError('Error getting product by id'));
        // }
        function GetUserActivityByUserId(id) {
            return $http.post('/GetUserActivityByUserId/' + id).then(handleSuccess, handleError('Error getting  User Activity  '));
        }
     
        function GetFollowProductDetailsByid(productId,userId) {
            var deferred = $q.defer();
            $http({

                method: 'POST',
                url: '/GetFollowProductDetailsByid',
                data: 'userId=' + userId + '&productId=' + productId ,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (respond) {
                deferred.resolve({success: true});
                // if success
                console.log(respond);
            }, function (error) {
                // if an error
                deferred.resolve({success: false, message: error.data});
                console.error(error);
            });
            return deferred.promise;
            // return $http.post('AddFollowProduct/' + productId).then(handleSuccess, handleError('Error updating user'));
        }
        
        function DeleteFollowProduct(userId,productId,categoryId) {
            var deferred = $q.defer();
            $http({

                method: 'POST',
                url: '/DeleteFollowProduct',
                data: 'userId=' + userId + '&productId=' + productId+ '&categoryId=' + categoryId ,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (respond) {
                deferred.resolve({success: true});
                // if success
                console.log(respond);
            }, function (error) {
                // if an error
                deferred.resolve({success: false, message: error.data});
                console.error(error);
            });
            return deferred.promise;
            // return $http.post('AddFollowProduct/' + productId).then(handleSuccess, handleError('Error updating user'));
        }
        function AddFollowProduct(userId,productId,categoryId) {
            var deferred = $q.defer();
            $http({

                method: 'POST',
                url: '/AddFollowProduct',
                data: 'userId=' + userId + '&productId=' + productId + '&categoryId=' + categoryId,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (respond) {
                deferred.resolve({success: true});
                // if success
                console.log(respond);
            }, function (error) {
                // if an error
                deferred.resolve({success: false, message: error.data});
                console.error(error);
            });
            return deferred.promise;
            // return $http.post('AddFollowProduct/' + productId).then(handleSuccess, handleError('Error updating user'));
        }
        function AddReviewActivity(userId,productId,reviewId) {
            var deferred = $q.defer();
            $http({

                method: 'POST',
                url: '/AddReviewActivity',
                data: 'userId=' + userId + '&productId=' + productId + '&reviewId=' + reviewId,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (respond) {
                deferred.resolve({success: true});
                // if success
                console.log(respond);
            }, function (error) {
                // if an error
                deferred.resolve({success: false, message: error.data});
                console.error(error);
            });
            return deferred.promise;

        }
        function AddProductScore (id) {
            return $http.post('/AddProductScore/' + id).then(handleSuccess, handleError('Error setting product scoring by id'));
        }
        function GetFollowProductByUserId(userId) {
            return $http.post('/GetFollowProductByUserId/' + userId).then(handleSuccess, handleError('Error getting follow product  by id'));
        }
        function GetManufacturerId(name) {
            return $http.post('/GetManufacturerId/' + name).then(handleSuccess, handleError('Error getting product image by id'));
        }
        function GetBrandId(name) {
            return $http.post('/GetBrandsId/' + name).then(handleSuccess, handleError('Error getting brand   by name'));
        }
        function AddEULA(id) {
            return $http.post('/AddEULA/' + id).then(handleSuccess, handleError('Error getting Eula by id'));
        }
        function GetAll() {
            return $http.get('/api/users').then(handleSuccess, handleError('Error getting all users'));
        }
        function GetById(id) {
            return $http.get('/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function UserAuthentication(userName,password) {
            return $http.post('/userAuthentication', { username: userName, password: password }).then(handleSuccess, handleError('Error getting user by username'));
        //
            // return $http.post('/getDataByUserName/' + userName)
        }
        function GetUserById(id) {
            return $http.post('/getDataUserById/',{ id: id}).then(handleSuccess, handleError('Error getting user by id'));
        }

        function Create(user) {
            var deferred = $q.defer();
            $http({

                method: 'POST',
                url: '/api/usersCreate',
                data: 'PASSWORD=' + user.PASSWORD + '&USERNAME=' + user.USERNAME + '&E_MAIL=' + user.eMail,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (respond) {
                deferred.resolve({success: true});
                // if success
                console.log(respond);
            }, function (error) {
                // if an error
                deferred.resolve({success: false, message: error.data});
                console.error(error);
            });
            return deferred.promise;
        }
            function PostProductReviewById(addReview) {
                

                var deferred = $q.defer();
                $http({

                    method: 'POST',
                    url: '/PostProductReviewById/',
                    data:'review=' + addReview.review+'&userId='+addReview.userId+'&productId='+addReview.productId+'&like='+addReview.like+'&disLike='+addReview.disLike+'&curRate='+addReview.rat+'&status='+addReview.status,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function(respond){
                    deferred.resolve({ success: true });
                    // if success
                    console.log(respond);
                }, function(error){
                    // if an error
                    deferred.resolve({ success: false ,message:error.data });
                    console.error(error);
                });
                return deferred.promise;
            }

        function Reset(password,confirm,token) {
            var deferred = $q.defer();
            $http({

                method: 'POST',
                url: '/reset/'+token,
                data:
                'PASSWORD=' + password +'&CONFIRM_PASSWORD='+confirm,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function(respond){
                deferred.resolve({ success: true,message:respond.data });
                // if success
                console.log(respond);
            }, function(error){
                // if an error
                deferred.resolve({ success: false,message:error.data  });
                // console.error(error);
            });
            return deferred.promise;
         }
        function ChangePassword(password,confirm,email) {
            var deferred = $q.defer();
            $http({

                method: 'POST',
                url: '/ChangePassword/'+email,
                data:
                'PASSWORD=' + password +'&CONFIRM_PASSWORD='+confirm,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function(respond){
                deferred.resolve({ success: true,message:respond.data.message });
                // if success
                console.log(respond);
            }, function(error){
                // if an error
                deferred.resolve({ success: false,message:error.data  });
                // console.error(error);
            });
            return deferred.promise;
        }
        function ChangeEmail(email,emailParam) {
            var deferred = $q.defer();
            $http({

                method: 'POST',
                url: '/ChangeEmail/'+emailParam,
                data:
                'EMAIL=' + email ,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function(respond){
                deferred.resolve({ success: true,message:respond.data.message });
                // if success
                console.log(respond);
            }, function(error){
                // if an error
                deferred.resolve({ success: false,message:error.data  });
                // console.error(error);
            });
            return deferred.promise;
        }
        function Forgot(email) {
            var deferred = $q.defer();
            $http({

                method: 'POST',
                url: '/api/sendemail/',
                data:
                'email=' + email ,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function(respond){
                deferred.resolve({ success: true ,message:respond.data});
                // if success
                console.log(respond);
            }, function(error){
                // if an error
                deferred.resolve({ success: false,message:error.data });
                console.log(error);
            });
            return deferred.promise;
        }
        function Update(user) {
          
                var deferred = $q.defer();
                $http({

                    method: 'POST',
                    url: '/productEdit',
                    data: 'productId=' + user.productId + '&userId=' + user.userId + '&name=' + user.name + '&shortText=' + user.shortText + '&description=' + user.description + '&brandId=' + user.brandId+ '&manufacturer=' + user.manufacturer+ '&rating=' + user.rating,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function (respond) {
                    deferred.resolve({success: true});
                    // if success
                    console.log(respond);
                }, function (error) {
                    // if an error
                    deferred.resolve({success: false, message: error.data});
                    console.error(error);
                });
                return deferred.promise;
            }
          

        function Delete(id) {
            return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
