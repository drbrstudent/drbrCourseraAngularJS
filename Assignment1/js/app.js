(function () {
  'use strict' //best practice, we are enable certain things just prevent us from
  // making mistakes
  // it is important to point out that after angulerJS version 1.3
  // global controller function declaration is disabled, in which case
  //we must initialize a variable e.g. app with the module
  var app = angular.module('LunchCheck', []);

  //after the variable it is initialized with the module we proceed with the controller
  app.controller('LunchCheckController', LunchCheckController);
  // This is placed to protect the code from minification
  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope) {
    $scope.dishes = '';
    $scope.result = '';

    $scope.listOfDishes = function (){
        if($scope.dishes == ""){
          $scope.result = 'Please enter data first!';
        }else if (countDishes($scope.dishes.split(',')) == 0) {
            $scope.result = 'Please enter data between the comas!';
        }else {
            var list = $scope.dishes.split(',')
            console.log(list)
            if(countDishes(list) <= 3){
              $scope.result = 'Enjoy it!';
            } else {
              $scope.result = 'To Much!';
            }
        }
      }
    var countDishes = function(list){
        var count = 0;
        for (var i = 0; i < list.length; i++) {

          if(list[i] != "" && list[i] != " "){
            count += 1;
          }
        }
        console.log(count)
        return count
      }

    $scope.eraseDishes = function() {
      if($scope.dishes === '') {
        $scope.result = '';
      }
    }

  } //here is where we difine the controller, we put the name and its functionality
    // so with the controller defined it is available  bounded with the view
    // Html and css
})();
