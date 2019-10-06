(function () {

  angular.module('public').directive('dishValidation', function () {
    return{
      require: 'ngModel',
      link: function (scope,element,  attr, ctrl) {

        function shortNameValidation(value) {
          var short_name = scope.$ctrl.information.menu;
          var validate = false;
        
          for (var i = 0; i < short_name.length; i++) {
            if(short_name[i].toLowerCase() === ctrl.$viewValue) {
              validate = true;
              break;
            }
          }

          if(validate) {
            ctrl.$setValidity('dish', true);

          } else {
            ctrl.$setValidity('dish', false);

          }


          return value;
        };

        ctrl.$parsers.push(shortNameValidation);
      },



    }
  })
})();
