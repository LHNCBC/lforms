'use strict';

angular.module('lformsWidget', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    "mgcrea.ngStrap",
    'ui.select2'
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
      //$templateCache.put('first.html', 'First template');
      $http.get('views/main.html', {cache:$templateCache});
      $http.get('views/partials/panel-table-v.html', {cache:$templateCache});
      $http.get('views/partials/panel-table-h.html', {cache:$templateCache});
      $http.get('views/partials/horizontal-table.html', {cache:$templateCache});
      $http.get('views/partials/tree.html', {cache:$templateCache});
      $http.get('views/partials/tree-extra.html', {cache:$templateCache});
      $http.get('views/partials/validation.html', {cache:$templateCache});
      $http.get('views/partials/loading.html', {cache:$templateCache});
      $http.get('views/partials/initial.html', {cache:$templateCache});

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
