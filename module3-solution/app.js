(function () {

'use strict';
        
angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {

    var narrowIt = this;
    narrowIt.found = [];
    narrowIt.searchTerm = "";
    narrowIt.noResultsMsg = "";

    narrowIt.searchMenu = function () {
        var promise = MenuSearchService.getMatchedMenuItems(narrowIt.searchTerm);
    
        promise.then(function (response) {
            narrowIt.found = response;
            if(narrowIt.found.length === 0) {
                narrowIt.noResultsMsg = "Nothing found";
            }
            else {
                narrowIt.noResultsMsg = "";
            }
        })
        .catch(function (error) {
        console.log("Controller: Something went terribly wrong.");
        });
    };


    narrowIt.removeFound = function (itemIndex) {
        narrowIt.found.splice(itemIndex, 1);
    };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (shortName) {
    var foundItems = [];
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (result) {
        if(!shortName || shortName.length === 0) {
            foundItems = [];
        }
        else {
            foundItems = result.data.menu_items.filter(mi => mi.name.toLowerCase().includes(shortName.toLowerCase()));   
        }    

        return foundItems;
    })
    .catch(function (error) {
        console.log("Service: Something went terribly wrong.");
    });
  };
}

function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        found: '<',
        onRemove: '&'
      },
      controller: NarrowItDownController,
      controllerAs: 'narrowIt',
      bindToController: true
    };
  
    return ddo;
} 

})();