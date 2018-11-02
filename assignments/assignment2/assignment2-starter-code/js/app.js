(function() {
	'use strict';

	angular.module('ShoppingListCheckOff', []).controller('ToBuyController',
			ToBuyController).controller('AlreadyBoughtController', AlreadyBoughtController).service('ShoppingListCheckOffService', ShoppingListCheckOffService);

			ToBuyController.$inject = ['ShoppingListCheckOffService'];
			function ToBuyController(ShoppingListCheckOffService) {
			  var cart = this;

			  cart.buyItem = function (itemName, itemQuantity, index) {
			    ShoppingListCheckOffService.buyItem(itemName, itemQuantity, index);
			  }

				cart.items = ShoppingListCheckOffService.getItems();
			}

			AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
			function AlreadyBoughtController(ShoppingListCheckOffService) {
			  var boughtList = this;

				boughtList.items = ShoppingListCheckOffService.getBoughtItems();
			}


			function ShoppingListCheckOffService() {
			  var service = this;

				var items = [
				  {
				    name: "Milk",
				    quantity: "2"
				  },
				  {
				    name: "Donuts",
				    quantity: "200"
				  },
				  {
				    name: "Cookies",
				    quantity: "300"
				  },
				  {
				    name: "Chocolate",
				    quantity: "5"
				  },
					{
						name : "Chips",
						quantity : "200"
					}
				];

				var boughtItems = [];

			  service.buyItem = function (itemName, quantity, index) {

					console.log(itemName);
			    var item = {
			      name: itemName,
			      quantity: quantity
			    };
			    boughtItems.push(item);

					items.splice(index, 1);
			  };

			  service.getItems = function () {
			    return items;
			  };

				service.getBoughtItems = function () {
			    return boughtItems;
			  };
			}

})();
