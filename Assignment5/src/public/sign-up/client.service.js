

(function () {


  'use strict'

  angular.module('public').service('ClientService', ClientService);



  function ClientService() {

    var service = this;
    service.client = {};
    service.result = [];
    service.favoriteDish = [];
    service.validate = false;

    service.clientNewsletter = function (params) {

      service.client = {name: params.firstname.$viewValue,
                    lastName: params.lastname.$viewValue,
                    email: params.email.$viewValue,
                    phone: params.phone.$viewValue,
                    short_name: params.menu.$viewValue};
      service.result.push(service.client);
      return service.client;
    }

    service.getClientInfo = function () {
      return service.result;
    }

  };

})();
