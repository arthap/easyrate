/* EULA Controller */
easyrateApp.controller('EULACtrl', [
    '$scope', '$http', '$location', '$rootScope', '$cookieStore', 'UserService', 'UserDataService',
    function ($scope, $http, $location, $rootScope, $cookieStore, UserService, UserDataService) {
        $scope.checkboxModel = {
            value1: false

        };
        $scope.userData = $rootScope.userData;
        var profileUserId;
        if ($scope.userData !== undefined) {

            profileUserId = $scope.userData.currentUser[0].ID;
        }

        $scope.reject = function () {
            $location.path('/');
        }
        $scope.agree = function () {
            UserService.AddEULA(profileUserId)
                .then(function (reg) {

                    if (reg) {
                        $location.path('/');
                        // $scope.mainReviewImageUrl =  $scope.getProductDetaiReviewList[0].RESOURCE;
                    } else {
                    }

                })
        }
    }
]);