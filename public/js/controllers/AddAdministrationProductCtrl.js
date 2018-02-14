easyrateApp.controller('AddAdministrationProductCtrl', [
    '$scope', '$rootScope', '$cookieStore', '$http', '$location', 'AuthenticationService', 'FlashService', 'UserService', 'Upload', 'Notification',
    function ($scope, $rootScope, $cookieStore, $http, $location, AuthenticationService, FlashService, UserService, Upload, Notification) {
        var vm = this;


        $rootScope.userData = $cookieStore.get('userData') || {};
        if ($rootScope.userData.currentUser) {
            vm.userId = $rootScope.userData.currentUser.ID
        }


    }
]);
