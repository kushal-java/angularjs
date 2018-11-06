(function() {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
  .directive('foundItems', FoundItems);

  function FoundItems() {
    var ddo = {
      restrict: 'E',
      templateUrl: 'items.html',
      scope: {
        items: '<',
        onRemove: '&'
      }
    };

    return ddo;
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var narrowDownController = this;
    narrowDownController.found = [];

    narrowDownController.getMatchedMenuItems = function () {
    	narrowDownController.found = []
      if (narrowDownController.searchTerm) {
        var promise = MenuSearchService.getMatchedMenuItems(narrowDownController.searchTerm);
        promise.then(function (response) {
        	narrowDownController.found = response;
        })
        .catch(function (error) {
          console.log("Error occured!!");
        });
      }
    };

    narrowDownController.removeItem = function (index) {
    	narrowDownController.found.splice(index, 1);
      if (narrowDownController.found.length === 0) {
    	  narrowDownController.error = "Nothing found";
      }
    }
  };


  MenuSearchService.$inject = ['$http', 'ApiBasePath']
  function MenuSearchService($http, ApiBasePath) {
    var menuService = this;

    menuService.getMatchedMenuItems = function (searchTerm) {
      return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json"),
      }).then(function (result) {

        var items = result.data.menu_items;
        var foundItems = []
        for (var index = 0; index < items.length; index++) {
          if (items[index].description.indexOf(searchTerm) !== -1) {
            foundItems.push(items[index]);
          }
        }

        return foundItems;
      });
    };

  };

})();
