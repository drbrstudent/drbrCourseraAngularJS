(function () {
  'use strict' 
  angular.module('MenuApp').component('categories', {
  templateUrl: 'view/categories.template.html',
  bindings: {
    items: '<'
  }
});
})();
