(function () {
  'use strict'

  angular.module('public').component('myInfo',{
    templateUrl: 'src/public/my-info/my-infos.html',
    bindings: {
      data: '<'
    }
  });
})();
