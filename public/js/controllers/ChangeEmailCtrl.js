/* Change Email Controller */
easyrateApp.controller('changeEmailCtrl', [
    '$scope', '$http', '$location', 'AuthenticationService', 'FlashService', 'UserService', '$routeParams', '$cookieStore',
    function ($scope, $http, $location, AuthenticationService, FlashService, UserService, $routeParams, $cookieStore) {
        var vm = this;

        vm.userdata = $cookieStore.get('globals').currentUser;
        vm.user = vm.userdata.username;
        vm.emailParam = vm.userdata.email;


        $scope.message = false;
        $scope.errorMsg = false;
        vm.change = change;

        function change() {


            $scope.err = false;
            $scope.resp = false;

            vm.dataLoading = true;

            UserService.ChangeEmail(vm.email, vm.emailParam)
                .then(function (response) {
                    if (response.success) {
                        // FlashService.Success('Forgot successful', true);
                        // $location.path('/login');

                        $scope.resp = true;
                        $scope.message = response.message;
                        AuthenticationService.ChangeCredentials(vm.email, vm.userdata.authdata, vm.userdata.remembeMe, vm.userdata.username);
                        vm.userdata = $cookieStore.get('globals').currentUser;
                        vm.user = vm.userdata.username;
                        vm.emailParam = vm.userdata.email;
                        vm.dataLoading = false;
                    } else {
                        // FlashService.Error(response.message);
                        $scope.err = true;
                        $scope.message = response.message;
                        vm.dataLoading = false;
                    }
                });
        }
    }

]);

