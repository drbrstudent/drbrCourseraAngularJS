(function () {
  'use strict'
  angular.module('data').service('MenuDataService', MenuDataService);

  MenuDataService.$inject = ['$http'];

  function MenuDataService($http) {
    var menuData = this;
    var menuItems = [];

    menuData.getAllCategories = function () {

      menuItems = [];
      return $http({
               method: "GET",
               url: ("https://davids-restaurant.herokuapp.com/categories.json")

           }).then(function(response) {

               var item = response.data;
               return item;

           }).catch(function (error) {
             console.log("Something went wrong.");
           });

    }

    menuData.getItemsForCategory = function (categoryShortName) {

        var dishesItems = [];

        return $http({
                 method: "GET",
                 url: ("https://davids-restaurant.herokuapp.com/menu_items.json?category="+categoryShortName)

             }).then(function(response) {

                 var item = response.data;
                 return item.menu_items;

             }).catch(function (error) {
               console.log("Something went wrong.");
             });


    }
  }

})();
