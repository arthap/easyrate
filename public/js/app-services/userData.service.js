(function () {
    'use strict';

    angular
        .module('easyrateApp')
        .factory('UserDataService', UserDataService);

    UserDataService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout', 'UserService'];
    function UserDataService($http, $cookieStore, $rootScope, $timeout, UserService) {

        var service = {};
        var myData = [];

        service.setUserData = setUserData;
        service.getUserData = getUserData;
        service.ClearData=ClearData;

        service.ClearProductsSaveDraftData = ClearProductsSaveDraftData;
        service.SetProductSaveDraftData=SetProductSaveDraftData;
        service.ChangeProductsSaveDraftData=ChangeProductsSaveDraftData;
        return service;


        function setUserData (){
            $rootScope.globals = $cookieStore.get('globals') || {};
            if ($rootScope.globals.currentUser) {
                if($cookieStore.get('userData')!==undefined){
                myData.push($cookieStore.get('userData').currentUser);}}
            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
        };

        function getUserData(){
            return  myData[0];
        };
        function ClearData() {
            myData=[];
        }

        function ChangeProductsSaveDraftData(product) {



            $rootScope.productSaveDraftData = {
                currentProduct: product
            };

            $cookieStore.put('productSaveDraftData', $rootScope.productSaveDraftData);
        }

        function SetProductSaveDraftData(data) {

            $rootScope.productSaveDraftData = {
                currentProduct: data
            };


            $cookieStore.put('productSaveDraftData', $rootScope.productSaveDraftData);
        }
        function ClearProductsSaveDraftData() {
            $rootScope.productSaveDraftData = {};
            // productSaveDraftData={};
            $cookieStore.remove('productSaveDraftData');


            $http.defaults.headers.common.Authorization = 'Basic';
        }

   
    }
})();