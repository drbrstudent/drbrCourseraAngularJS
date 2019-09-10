(function () {
  'use strict' //best practice, we are enable certain things just prevent us from
  // making mistakes
  // it is important to point out that after angulerJS version 1.3
  // global controller function declaration is disabled, in which case
  //we must initialize a variable e.g. app with the module
  var app = angular.module('ShoppingListCheckOff', []);

  //after the variable it is initialized with the module we proceed with the controller
  app.controller('ToBuyController', ToBuyController);
  app.controller('AlreadyBoughtController', AlreadyBoughtController);
  app.service('ShoppingListCheckOffService',ShoppingListCheckOffService);
  // This is placed to protect the code from minification
  ToBuyController.$inject = ['ShoppingListCheckOffService']; //Remenber here javascript prototype

  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;
    toBuy.buyList = [{name: "Cookies", quantity: "5"},
                   {name: "Chocolate Bars", quantity: "4"},
                   {name: "Coca-Cola", quantity: "3"},
                   {name: "Candy", quantity: "10"},
                   {name: "Bottle of Water", quantity: "8"}];

    toBuy.removeItems = function (index) {
      ShoppingListCheckOffService.addItems(toBuy.buyList[index]);
      ShoppingListCheckOffService.removeItems(toBuy.buyList, index);
    }

    toBuy.checkList = function () {
      console.log(toBuy.buyList.length)

      if (toBuy.buyList.length == 5) {
        toBuy.message = 'Ready to buy!';
      }
      else if(toBuy.buyList.length > 0) {
        toBuy.message = 'Number of items bought: '+ (5 - toBuy.buyList.length);
      }
      else {
        toBuy.message = 'Everything is bought!';
      }
    return true;
    }

  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

  function AlreadyBoughtController (ShoppingListCheckOffService) {
    var bought = this;
    bought.boughtList = [];
    bought.boughtList = ShoppingListCheckOffService.getItems();
    console.log(bought.boughtList);

    bought.checkList = function () {
      if(bought.boughtList == 0) {
        bought.message = 'Nothing bought yet!';
      }
      else {
        bought.message = '';
      }
      return true;
    }
  }

  function ShoppingListCheckOffService() {
    var service = this;
    var list = []

    service.addItems = function (item) {
      list.push(item);
    };

    service.removeItems = function (list, index) {
      list.splice(index,1);
    };

    service.getItems = function () {
      return list;
    }

  }



})();
