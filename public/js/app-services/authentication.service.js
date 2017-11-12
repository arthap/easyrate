(function () {
    'use strict';

    angular
        .module('easyrateApp')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout', 'UserService','UserDataService'];
    function AuthenticationService($http, $cookieStore, $rootScope, $timeout, UserService,UserDataService) {
        var userData={};
        var service = {};

        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;
        service.ClearUserData=ClearUserData;
        service.SetUserData=SetUserData;
        service.UpdateCredentials=UpdateCredentials;
        service.ChangeCredentials=ChangeCredentials;

        service.ClearProductsSaveDraftData = ClearProductsSaveDraftData;
        service.SetProductSaveDraftData=SetProductSaveDraftData;
        service.ChangeProductsSaveDraftData=ChangeProductsSaveDraftData;
        return service;

        function Login(vm,remembeMeValue, callback) {
            var password;
            if(vm.remembeMe){
                var globalAuthdata = $cookieStore.get('globals').currentUser.authdata;
                password = Base64.decode(globalAuthdata);
                password = password.substring(password.indexOf(":")+1);

            }
            else{password=vm.password;}
        
            /* Dummy authentication for testing, uses $timeout to simulate api call
             ----------------------------------------------*/
            $timeout(function () {
                var response;
                UserService.UserAuthentication(vm.userName,password)
                    .then(function (user) {
                        if(user.success===false){
                            response = { success: false, message: 'User Name or password is incorrect' };
                        }else{

                            if (user !== null ) {
                                $rootScope.user = user[0];
                            user[0].PASSWORD=password;
                            // UserDataService.setUserData(user);

                            if(!vm.remembeMe){SetCredentials(user,remembeMeValue);}
                                SetUserData(user[0]);
                            userData.username=user[0].USERNAME;
                            response = { success: true ,eula:user[0].EULA_ACCEPTED};
                        } else {
                            response = { success: false, message: 'User Name or password is incorrect' };
                        }}
                        callback(response);
                    });
            }, 1000);
         }
        function UpdateCredentials(user) {
          var tempUser=  $cookieStore.get('userData').currentUser;
              tempUser.AVATAR=user.AVATAR;

            $rootScope.userData = {
                currentUser: tempUser
            };

            $cookieStore.put('userData', $rootScope.userData);

        }
        function SetCredentials(user,remembeMeValue) {
            var username=user[0].USERNAME;
            var password=user[0].PASSWORD;
            var email=user[0].EMAIL;
            var authdata = Base64.encode(username + ':' + password);

            $rootScope.globals = {
                currentUser: {
                    username:username,
                    email:email,
                    remembeMe:remembeMeValue,
                    authdata: authdata
                }
            };

            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
        }
        function ChangeCredentials(email,password,remembeMeValue,user) {
            var username=user;
            var authdata = Base64.encode(username + ':' + password);

            $rootScope.globals = {
                currentUser: {
                    username:username,
                    email:email,
                    remembeMe:remembeMeValue,
                    authdata: authdata
                }
            };

            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
        }

        function SetUserData(data) {
            data.PASSWORD = Base64.encode(data.USERNAME + ':' + data.PASSWORD);
            $rootScope.userData = {
                currentUser: data
            };

            $http.defaults.headers.common['Authorization'] = 'Basic ' + data.PASSWORD; // jshint ignore:line
            $cookieStore.put('userData', $rootScope.userData);
        }
        function ClearCredentials() {
            $rootScope.globals = {};
            userData={};
            $cookieStore.remove('globals');
            $rootScope.userData = {};

            $cookieStore.remove('userData');
            
            $http.defaults.headers.common.Authorization = 'Basic';
        }
        function ClearUserData() {
          
            userData={};
          
            $rootScope.userData = {};

            $cookieStore.remove('userData');

            $http.defaults.headers.common.Authorization = 'Basic ';
        }
        function ChangeProductsSaveDraftData(product) {




            $rootScope.productSaveDraftData = {
                currentProduct: product
            };

            $cookieStore.put('productSaveDraftData', $rootScope.productSaveDraftData);
        }

        function SetProductSaveDraftData(data) {

            $rootScope.productSaveDraftData = {
                currentProduct: data.vm
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

    // Base64 encoding service used by AuthenticationService
    var Base64 = {

        keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                    this.keyStr.charAt(enc1) +
                    this.keyStr.charAt(enc2) +
                    this.keyStr.charAt(enc3) +
                    this.keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        },

        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do {
                enc1 = this.keyStr.indexOf(input.charAt(i++));
                enc2 = this.keyStr.indexOf(input.charAt(i++));
                enc3 = this.keyStr.indexOf(input.charAt(i++));
                enc4 = this.keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";

            } while (i < input.length);

            return output;
        }
    };

})();