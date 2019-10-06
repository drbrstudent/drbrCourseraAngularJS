( function () {
  'use strict'
  angular.module('public').controller('SignUpController', SignUpController);

  //SignUpController.$inject = ['signup']
  SignUpController.$inject = ['ClientService','MenuService'];
  function SignUpController(ClientService, MenuService) {
    var $ctrl = this;
    $ctrl.client = ClientService.getClientInfo();
    $ctrl.menu = [];
    // $ctrl.validate = false;
  //  $ctrl.MenuService = MenuService;
    var promise =  MenuService.getMenuItemShortName();

    // console.log($ctrl.short_name.$$state);
    promise.then(function (response) {
      var items = response.data.menu_items;

      for (var i = 0; i < items.length; i++) {
        $ctrl.menu.push(items[i].short_name);
      }
    });

    $ctrl.clientFavoriteDish = function () {

      var promise = MenuService.getMenuItemShortName($ctrl.getClientInfo()[0].short_name)

      promise.then(function (response) {
        var items = response.data.menu_items;

        for (var i = 0; i < items.length; i++) {
          if(items[i].short_name.toLowerCase() === $ctrl.getClientInfo()[0].short_name) {
              ClientService.favoriteDish.push(items[i]);
              break;
          }
        }
      }).then(function () {
        ClientService.validate = true;
      });


    }


    $ctrl.clientNewsletter = function (params) {
      $ctrl.client = ClientService.clientNewsletter(params);
      $ctrl.clientFavoriteDish();
    }

    $ctrl.getClientInfo = function () {
      return ClientService.getClientInfo();
    }

    $ctrl.getDishInfo = function () {
      return ClientService.favoriteDish[0];
    }

    $ctrl.getValidate = function () {
      return ClientService.validate;
    }

    $ctrl.submit = function () {

      if (ClientService.getClientInfo().length === 0) {
          ClientService.validate = false;
      }

      return ClientService.validate;
    };

  }
}
)();
