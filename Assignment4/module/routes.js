(function () {

'use strict';

angular.module('MenuApp').config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider','$urlRouterProvider'];

function RoutesConfig($stateProvider, $urlRouterProvider) {
  console.log('Here at route');
  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'view/home.template.html'
  })

  // List of menu categories
  .state('mainItems', {
    url: '/menu',
    templateUrl: 'view/main-categories.template.html',
    controller: 'MenuCategoriesController as mainItems',
    resolve: {
      items: ['MenuDataService', function (MenuDataService) {

        return MenuDataService.getAllCategories();
      }]
    }
  })

  .state('menuDetail', {
    url: '/menu-detail/{shortName}',
    templateUrl: 'view/main-items.template.html',
    controller: 'MenuItemsController as menuDetail',
    resolve: {
      dishes: ['$stateParams', 'MenuDataService',
            function ($stateParams, MenuDataService) {
              return MenuDataService.getItemsForCategory($stateParams.shortName);
            }]
    }
  });
}

})();
