//
// (function () {
//     'use strict';
//
//     angular
//         .module('easyrateApp')
//         .factory('DraftDataService', DraftDataService);
//
//     DraftDataService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout', 'UserService','UserDataService'];
//     function DraftDataService($http, $cookieStore, $rootScope, $timeout, UserService,UserDataService) {
//         // var productSaveDraftData={};
//         var service = {};
//         var currentProductData={};
//
//
//         service.ClearProductsSaveDraftData = ClearProductsSaveDraftData;
//         service.SetProductSaveDraftData=SetProductSaveDraftData;
//         // service.ChangeProductsSaveDraftData=ChangeProductsSaveDraftData;
//         service.GetProductSaveDraftData=GetProductSaveDraftData;
//         return service;
//
//    
//
//
//
//
//         function SetProductSaveDraftData(data) {
//             currentProductData=data;
//
//         }
//         function GetProductSaveDraftData() {
//
//           return currentProductData;
//         }
//         function ClearProductsSaveDraftData() {
//
//           return  currentProductData={};
//         }
//
//     }
//
//
// })();