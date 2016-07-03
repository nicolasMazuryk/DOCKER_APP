(function() {
'use strict';

angular.module('homepage')
    .controller('homepage.controller', homepageController);

    homepageController.$inject = ['$scope', '$state'];

    function homepageController($scope, $state) {
        var vm = this;
        console.log('homepageController', $scope);
        //vm.user = user;
    }
}());