(function () {
'use strict';
    
angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;
  toBuy.allBought = false;

  toBuy.toBuyItems = ShoppingListCheckOffService.getToBuyItems();

  toBuy.addtoBought = function (itemName, quantity, index) {
    ShoppingListCheckOffService.addtoBought(itemName, quantity, index);
  }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var alreadyBought = this;

  alreadyBought.boughtItems = ShoppingListCheckOffService.getBoughtItems();
}


function ShoppingListCheckOffService() {
    var slistservice = this;
  
    // Lists of shopping items
    var toBuyItems = [
        {
            name: "cookies",
            quantity: 10
        },
        {
            name: "eggs",
            quantity: 20
        },
        {
            name: "apples",
            quantity: 8
        },{
            name: "oranges",
            quantity: 15
        },
        {
            name: "chocolates",
            quantity: 5
        }
    ];
  
    var boughtItems = [];

    slistservice.getToBuyItems = function () {
        return toBuyItems;
    };

    slistservice.getBoughtItems = function () {
        return boughtItems;
    };

    slistservice.addtoBought = function (itemName, quantity, index) {
        var item = {
          name: itemName,
          quantity: quantity
        };
        boughtItems.push(item);

        toBuyItems.splice(index, 1);
    };
  }
  

})();