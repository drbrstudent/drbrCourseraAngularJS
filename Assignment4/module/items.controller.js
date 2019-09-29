(function () {
  'use strict' 
  angular.module('MenuApp').controller('MenuItemsController', MenuItemsController);

  MenuItemsController.$inject = ['dishes'];
  function MenuItemsController(dishes) {
    var mainDishes = this;
    mainDishes.dishes = dishes;
  }

})();
