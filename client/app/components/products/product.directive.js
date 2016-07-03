(function() {
'use strict';

angular.module('product')
    .directive('product.directive', productDirective);

function productDirective() {
    return {
        restrict: 'A',
        templateUrl: 'product.tpl.html',
        controller: 'headerCtrl',
        link: (scope, elem, attrs, ctrl) => {

            scope.storeProduct = function () {
                let json = {
                    name: scope.name,
                    price: scope.price,
                    desc: scope.description,
                    category: scope.category
                };

                ctrl.storeProduct(json);
            };

            elem.find('.get').on('click', ctrl.getAllProducts());
        }
    }
}
}());




