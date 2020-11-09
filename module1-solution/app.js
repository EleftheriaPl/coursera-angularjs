(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
    $scope.inputDishes = "";

    $scope.msg = "";

    $scope.countDishes = function () {
        var totalDishesValue = calculatDishesForString($scope.inputDishes);

        if (totalDishesValue === 0) {
            $scope.msg = "Please enter data first";
        }
        else if (totalDishesValue <= 3) {
            $scope.msg = "Enjoy";
        }
        else {
            $scope.msg = "Too much!";
        }
    };

    
    function calculatDishesForString(dishesStr) {
        var totalStringValue = 0;
        console.log(dishesStr);
        
        var keywordsArr = dishesStr.split( ',' );

        for (var i = 0; i < keywordsArr.length; i++) {
            var currentdish = keywordsArr[i].trim();

            if (currentdish && currentdish.length > 0) {
                totalStringValue++;
            }
        }

        return totalStringValue;
    }
}

})();
