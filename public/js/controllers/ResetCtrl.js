/* Reset Password Controller */
easyrateApp.controller('ResetCtrl', [
    '$scope', '$http', '$location', 'AuthenticationService', 'FlashService', 'UserService', '$routeParams',
    function ($scope, $http, $location, AuthenticationService, FlashService, UserService, $routeParams) {
        var vm = this;
        var tokenId = $routeParams.tokenId;
        $scope.inputType = 'password';
        $scope.hideShowPassword = function () {
            if ($scope.inputType == 'password')
                $scope.inputType = 'text';
            else
                $scope.inputType = 'password';
        };


        $scope.message = false;
        $scope.errorMsg = false;
        $scope.errorMsg = false;
        vm.reset = reset;

        function reset() {


            $scope.err = false;
            $scope.resp = false;

            vm.dataLoading = true;
            UserService.Reset(vm.password, vm.password_confirm, tokenId)
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
    }

]);
