/* Change Password Controller */
easyrateApp.controller('changePasswordCtrl', [
    '$scope', '$http', '$location', 'AuthenticationService', 'FlashService', 'UserService', '$routeParams', '$cookieStore',
    function ($scope, $http, $location, AuthenticationService, FlashService, UserService, $routeParams, $cookieStore) {
        var vm = this;
        // var tokenId = $routeParams.tokenId;
        $scope.inputType = 'password';
        $scope.hideShowPassword = function () {
            if ($scope.inputType == 'password')
                $scope.inputType = 'text';
            else
                $scope.inputType = 'password';
        };
        vm.userdata = $cookieStore.get('globals').currentUser;
        vm.user = vm.userdata.username;
        vm.email = vm.userdata.email;


        $scope.message = false;
        $scope.errorMsg = false;
        vm.change = change;

        function change() {


            $scope.err = false;
            $scope.resp = false;

            vm.dataLoading = true;
            if (vm.password === vm.confirmePassword) {
                UserService.ChangePassword(vm.password, vm.confirmePassword, vm.email)
                    .then(function (response) {
                        if (response.success) {
                            // FlashService.Success('Forgot successful', true);
                            // $location.path('/login');

                            $scope.resp = true;
                            $scope.message = response.message;

                            vm.dataLoading = false;
                        } else {
                            // FlashService.Error(response.message);
                            $scope.err = true;

                            $scope.message = response.message;
                            vm.dataLoading = false;
                        }
                    });
            }
            else {
                $scope.err = true;
                vm.dataLoading = false;
                $scope.message = "Password and Confirm Password do not match!";
            }
        }
    }

]);
