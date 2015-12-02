'use strict';

angular.module('lformsWidget', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngAnimate',
    'smoothScroll',
    'mgcrea.ngStrap',
    'ui.select2',
    'autocompleteLhcMod',
    'lfConstants'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  })
  .config(function ($animateProvider) {
    $animateProvider.classNameFilter(/has-ng-animate/);
  })
  // pre-load all the templates
  .run(function($templateCache,$http){
      // the template names are used in the app, not the actually file path
      $templateCache.put('main.html', $http.get('views/main.html'));
      $templateCache.put('validation.html', $http.get('views/partials/validation.html'));
      $templateCache.put('form-header.html', $http.get('views/partials/form-header.html'));
      $templateCache.put('form-view.html', $http.get('views/partials/form-view.html'));
      $templateCache.put('form-view-a.html', $http.get('views/partials/form-view-a.html'));
      $templateCache.put('form-view-b.html', $http.get('views/partials/form-view-b.html'));
      $templateCache.put('h-table.html', $http.get('views/partials/h-table.html'));

    });
