'use strict';

(function () {
    'use strict';

    angular.module('app', ['templates', 'homepage', 'registration', 'product', 'app.router']).config(config);

    config.$inject = ['$locationProvider'];

    function config($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $locationProvider.hashPrefix('!');
    }
})();
'use strict';

(function () {
    'use strict';

    angular.module('app.router', ['ui.router']);
})();
'use strict';

(function () {
  'use strict';

  angular.module('product', []);
})();
'use strict';

(function () {
    angular.module('homepage', []);
})();
'use strict';

(function () {

  angular.module('registration', []);
})();
'use strict';

(function () {
    'use strict';

    angular.module('app.router').config(routerConfig);

    routerConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

    function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {

        // IE fix
        $urlRouterProvider.when('', '/');

        $urlRouterProvider.otherwise('/404');

        $stateProvider.state('default', {
            url: '/',
            abstract: true,
            templateProvider: ["$templateCache", function templateProvider($templateCache) {
                return $templateCache.get('layout.html');
            }]
        }).state('default.homepage', {
            url: '?q',
            controller: 'homepage.controller',
            controllerAs: 'vm',
            templateProvider: ["$templateCache", function templateProvider($templateCache) {
                return $templateCache.get('homepage.html');
            }]
        }).state('default.registration', {
            url: 'registration',
            controller: 'registration.controller',
            controllerAs: 'vm',
            templateProvider: ["$templateCache", function templateProvider($templateCache) {
                return $templateCache.get('registration.html');
            }]
        }).state('default.404', {
            url: '404',
            templateProvider: ["$templateCache", function templateProvider($templateCache) {
                return $templateCache.get('404.html');
            }]
        });

        //.state('default', {
        //    //abstract: true,
        //    url: '/',
        //    templateProvider: function($templateCache) {
        //        return $templateCache.get('layout.template.html');
        //    }
        //})
        //.state('default.product', {
        //    controller: 'product.controller',
        //    controllerAs: 'vm',
        //    templateProvider: function($templateCache) {
        //        return $templateCache.get('product.tpl.html');
        //    }
        //})
        //.state('default.header', {
        //    //url: 'header',
        //    data: {
        //        id: "0637226478",
        //        cerrier: 'lifecell'
        //    },
        //    resolve: {
        //        inject: function() {
        //            return window.location.origin;
        //        }
        //    },
        //    controller: 'header.controller',
        //    controllerAs: 'vm',
        //    templateProvider: function($templateCache) {
        //        return $templateCache.get('header.template.html');
        //    }
        //})
    }
})();
'use strict';

(function () {
    'use strict';

    angular.module('product').controller('product.controller', ProductsCtrl);

    function ProductsCtrl($http) {
        //constructor ($http) {
        var vm = this;

        vm.storeProduct = function (data) {
            $http.post('api/products', data).then(function (data) {
                console.log('Post result: ', data);
            }).catch(function (e) {
                console.log(e);
            });
        };

        vm.getAllProducts = function () {
            $http.get('api/products').then(function (data) {
                console.log('Store collection: ', data);
            }).catch(function (e) {
                console.log(e);
            });
        };
        //}
    }

    ProductsCtrl.$inject = ['$http'];
})();
'use strict';

(function () {
    'use strict';

    angular.module('product').directive('product.directive', productDirective);

    function productDirective() {
        return {
            restrict: 'A',
            templateUrl: 'product.tpl.html',
            controller: 'headerCtrl',
            link: function link(scope, elem, attrs, ctrl) {

                scope.storeProduct = function () {
                    var json = {
                        name: scope.name,
                        price: scope.price,
                        desc: scope.description,
                        category: scope.category
                    };

                    ctrl.storeProduct(json);
                };

                elem.find('.get').on('click', ctrl.getAllProducts());
            }
        };
    }
})();
'use strict';

(function () {
    'use strict';

    angular.module('homepage').controller('homepage.controller', homepageController);

    homepageController.$inject = ['$scope', '$state'];

    function homepageController($scope, $state) {
        var vm = this;
        console.log('homepageController', $scope);
        //vm.user = user;
    }
})();
'use strict';

(function () {

    angular.module('registration').controller('registration.controller', registrationController);

    registrationController.$inject = ['$scope'];

    function registrationController($scope) {
        console.log($scope);
    }
})();