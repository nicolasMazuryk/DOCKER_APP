(function() {
'use strict';

angular.module('product')
    .controller('product.controller', ProductsCtrl);

    function ProductsCtrl($http) {
        //constructor ($http) {
            const vm = this;

            vm.storeProduct = (data) => {
                $http.post('api/products', data).then(function(data) {
                    console.log('Post result: ', data);
                }).catch(function(e) {
                    console.log(e);
                });
            };

            vm.getAllProducts = function() {
                $http.get('api/products').then(function(data) {
                    console.log('Store collection: ', data);
                }).catch(function(e) {
                    console.log(e);
                })
            };
        //}
    }

    ProductsCtrl.$inject = ['$http'];
}());




