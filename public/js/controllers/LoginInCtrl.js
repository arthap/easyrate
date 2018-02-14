/* Sing in Controller */
easyrateApp.controller('LoginInCtrl', [
    '$scope', '$cookieStore', '$http', '$location', 'AuthenticationService', 'FlashService', 'UserDataService', '$remember',
    function ($scope, $cookieStore, $http, $location, AuthenticationService, FlashService, UserDataService, $remember) {
        var vm = this;
        vm.login = login;

        if ($cookieStore.get('globals') !== undefined) {
            vm.userdata = $cookieStore.get('globals').currentUser;
            vm.remembeMe = vm.userdata.remembeMe;
        } else {
            vm.remembeMe = false;
        }

       (function initController() {
            // reset login status
            if (!vm.remembeMe) {
                AuthenticationService.ClearCredentials();
            }
            UserDataService.ClearData();
            AuthenticationService.ClearUserData();
           // AuthenticationService.ClearCredentials();

        })();

        $scope.remembeMeModel = {
            value: false
        };
        $scope.checkRemembeMe = function () {
            if (!$scope.remembeMeModel.value) {
                AuthenticationService.ClearCredentials();
                vm.remembeMe = false;
            }
        }
        $scope.change = function () {
            vm.password = vm.password;
            vm.remembeMe = false;
        }
        if (vm.remembeMe) {
            vm.userName = vm.userdata.username;
            vm.password = vm.userdata.authdata;
            vm.email = vm.userdata.email;
            $scope.remembeMeModel.value = true;
        }
        $scope.logout = function () {
            window.location.reload();
        }

        function login() {
            if(vm.password === undefined || vm.userName === undefined){return null}
            vm.dataLoading = true;
            AuthenticationService.Login(vm, $scope.remembeMeModel.value, function (response) {
                if (response.success) {
                    // if(!vm.remembeMe){AuthenticationService.SetCredentials(vm.email,vm.password,$scope.remembeMeModel.value);}
                    // $remember('my_cookie_name', vm.email);
                    if (response.eula === "1") {
                        $location.path('/');
                        window.location.reload();
                    }
                    else {
                        $location.path('/eula')
                    }
                    $scope.singshow();
                } else {
                    $scope.notification = response.message;
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };
    }
]);
