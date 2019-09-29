(function () {
    'use strict' 
    angular.module('MenuApp').component('items', {
    templateUrl: 'view/items.template.html',
    bindings: {
      dishes: '<'
    }
  });
})();
