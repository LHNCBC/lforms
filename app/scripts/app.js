'use strict';

angular.module('lformsWidget', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    "mgcrea.ngStrap",
    'ui.select2',
    'autocompPhr'
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
  // pre-load all the templates
  .run(function($templateCache,$http){
      // the template names are used in the app, not the actually file path
      $templateCache.put('main.html', $http.get('views/main.html'));
      $templateCache.put('panel-table-v.html', $http.get('views/partials/panel-table-v.html'));
      $templateCache.put('panel-table-h.html', $http.get('views/partials/panel-table-h.html'));
      $templateCache.put('horizontal-table.html', $http.get('views/partials/horizontal-table.html'));
      $templateCache.put('validation.html', $http.get('views/partials/validation.html'));
      $templateCache.put('loading.html', $http.get('views/partials/loading.html'));
      $templateCache.put('initial.html', $http.get('views/partials/initial.html'));

    });


// Overrides the default autocomplete filter function to search only from the beginning of each word
jQuery.extend( jQuery.ui.autocomplete, {
  filter: function(array, term) {
    var matcher = new RegExp("\\b" + jQuery.ui.autocomplete.escapeRegex(term), "i");
    return jQuery.grep( array, function(value) {
      return matcher.test( value.label || value.value || value );
    });
  }
});
