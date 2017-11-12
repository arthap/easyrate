// (function () {
//     'use strict';
//
//     angular
//         .module('easyrateApp')
//         .service('FollowService', FollowService);
//
//     FollowService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout', 'UserService'];
//     function FollowService($http, $cookieStore, $rootScope, $timeout, UserService) {
//         var service = {};
//         service.followProduct = followProduct;
//         service.getFollowProductByUserId = getFollowProductByUserId;
//         service.isFollowProduct=isFollowProduct;
//         service.getMaanufactureProductDetList=[];
//         return service;
//
//         function followProduct(productId) {
//             var productId = productId;
//             var parentCategoryId;
//             UserService.GetProductCategory(productId).then(function (reg) {
//                 if (reg.length > 0) {
//                     parentCategoryId = reg[0].CATEGORY_PARENT_ID;
//                     console.log(parentCategoryId);
//                     UserService.DeleteFollowProduct(vm.userId, productId, parentCategoryId)
//                         .then(function (reg) {
//                             if (reg.success === true) {
//                                 // $scope.getProductDetaiReviewList = [];
//                                 // $scope.getFollowProductId()
//                             }
//                         });
//                 }
//             });
//         }
//
//         function getFollowProductByUserId(userId) {
//             UserService.GetFollowProductByUserId(userId)
//                 .then(function (followIdList) {
//                     var followIdList = [];
//                     if (followIdList.length > 0) {
//                       var followListByUserId = followIdList;
//                         followListByUserId.forEach(function (followId) {
//                             productData(followId.PRODUCT_ID);
//                         }, this);
//                         return  service.getMaanufactureProductDetList;
//                     }   
//                 });
//         }
//         function isFollowProduct(productId, userId) {
//             var isActive;
//             UserService.GetFollowProductDetailsByid(productId, userId)
//                 .then(function (handleSuccess) {
//                     if (handleSuccess.success === true) {
//                          isActive = true;
//                     } else {
//                         isActive = false;
//                     }
//                     return isActive;
//                 });
//
//         }
//         function productData(productId) {
//             UserService.GetFollowProductById(productId)
//                 .then(function (product) {
//                     if (product.length > 0) {
//                         service.getMaanufactureProductDetList.push(product[0]);
//                      }
//                     return  service.getMaanufactureProductDetList;
//                 });
//         }
//
//     }
// })();