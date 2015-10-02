(function() {

    'use strict';

    var app = angular.module('deviceApp', [

        'ui.router',
        'ngMaterial',
        'MainCtrl',
        'device-service'

    ]);

    app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'views/home-view.html',
            })
            .state('settings', {
                url: '/settings',
                templateUrl: 'views/settings-view.html',

            })
            .state('about', {
                url: '/about',
                templateUrl: 'views/about-view.html',

            });



    }]);
})();