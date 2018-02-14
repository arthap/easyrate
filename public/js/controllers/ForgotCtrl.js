/* Forgot Password Controller */
easyrateApp.controller('ForgotCtrl', [
    '$scope', '$http', '$location', 'AuthenticationService', 'FlashService', 'UserService',
    function ($scope, $http, $location, AuthenticationService, FlashService, UserService) {
        var vm = this;
        $scope.message = false;
        $scope.errorMsg = false;
        vm.forgot = forgot;

        function forgot() {
            $scope.message = false;
            $scope.errorMsg = false;
            vm.dataLoading = true;
            UserService.Forgot(vm.email)
                .then(function (response) {
                    if (response.success) {
                        // FlashService.Success('Forgot successful', true);
                        // $location.path('/login');
                        $scope.message = true;
                        $scope.notification = response.message;
                        vm.dataLoading = false;
                    } else {
                        FlashService.Error(response.message);

                        $scope.errorMsg = true;
                        $scope.notification = response.message;
                        vm.dataLoading = false;
                    }
                });
        }
    }

]);
