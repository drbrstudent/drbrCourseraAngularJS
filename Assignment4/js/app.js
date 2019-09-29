(function () {
  'use strict' //best practice, we are enable certain things just prevent us from
  // making mistakes
  // it is important to point out that after angulerJS version 1.3
  // global controller function declaration is disabled, in which case
  //we must initialize a variable e.g. app with the module
  var app = angular.module('NarrowItDownApp', []);

  //after the variable it is initialized with the module we proceed with the controller
  app.controller('NarrowItDownController', NarrowItDownController );
  app.service('MenuSearchService', MenuSearchService);
  app.directive('foundItems', FoundItems);
  // This is placed to protect the code from minification

  //Since the version of angularJS 1.4 and so on, the property bindToController
  //define all the parameter
  function FoundItems() {

    var ddo = {
      templateUrl: 'NarrowItList.html',
      scope: true,
      bindToController: {
        items: '<',
        onRemove: '&'
      },
      controller: NarrowItDownDirectiveController,
      controllerAs: 'narrowIt',
    };

  return ddo;
}


  function NarrowItDownDirectiveController() {
    var narrowIt = this;

    narrowIt.itemsInList = function () {
  
      if(narrowIt.items.length === 0) {
        return true;
      }


     return false;
    };


  }

  NarrowItDownController.$inject = ['MenuSearchService']; //Remenber here javascript prototype

  function NarrowItDownController (MenuSearchService) {
    var narrowIt = this;

    narrowIt.itemSearch = "";
    narrowIt.found = [];
    narrowIt.getMatchedMenuItems = function () {

    var promise = MenuSearchService.getMatchedMenuItems(); //Here is the promise

    promise.then(function (response) {
        narrowIt.found = [];
        var items = response.data.menu_items;


        for (var i = 0; i < items.length; i++) {

          if(narrowIt.itemSearch !== "" &&
          items[i].description.toLowerCase().indexOf(narrowIt.itemSearch) !== -1) {

            narrowIt.found.push({name: items[i].name,
                             short_name: items[i].short_name,
                             description: items[i].description});
            }

        }


      }).catch(function (error) {
        console.log("Something went wrong.");
      });


    }

    narrowIt.removeItem = function (index) {
      console.log("here at remove");
      MenuSearchService.removeItem(narrowIt.found, index);
    }



  }

  MenuSearchService.$inject = ['$http'];

  function MenuSearchService($http) {
    var service = this;
    var items = [];
    service.getMatchedMenuItems = function () {

      var response = $http({
        method: 'GET',
        url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
      })
      return response;
    };

    service.removeItem = function (items, itemIndex) {
     items.splice(itemIndex, 1);
    };


  }



})();
