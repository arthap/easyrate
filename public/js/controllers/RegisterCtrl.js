/* Registration Controller */
easyrateApp.controller('RegisterCtrl', [
    '$scope', '$http', '$location', 'AuthenticationService', 'FlashService', 'UserService',
    function ($scope, $http, $location, AuthenticationService, FlashService, UserService) {
        $scope.confirmePassError = false;
        var vm = this;

        vm.register = register;
        vm.cheakPassword=cheakPassword;

        function register() {
            vm.dataLoading = true;
            UserService.Create(vm.user)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Registration successful', true);
                        $location.path('/login');
                    } else {
                        $scope.errorMessage = response.message;
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }

      function  cheakPassword () {
            if (vm.user.CONFIRMEPASSWORD !== vm.user.PASSWORD) {
                $scope.confirmePassError = true;
            }
            else {
                $scope.confirmePassError = false;
            }
        }
    }

]);
