(function() {
	'use strict';

	angular.module('LunchCheck', []).controller('LunchCheckController',
			LunchCheckController);

	LunchCheckController.$inject = [ '$scope' ];
	function LunchCheckController($scope) {

		$scope.items = "";

		$scope.statusMessage = "";
		$scope.messageColor = 'success';

		$scope.checkIfTooMuch = function() {

			$scope.messageColor = 'success';

			var count = 0;

			if ($scope.items === "") {
				$scope.statusMessage = 'Please enter data first';
				$scope.messageColor = 'error';
				return;
			}

			var itemsArray = $scope.items.split(',');

			for (var i = 0; i < itemsArray.length; i++) {

				if (itemsArray[i].trim() != "")
					count++;

			}

			if (count > 3)
				$scope.statusMessage = "Too much!";
			else if (count >= 1)
				$scope.statusMessage = "Enjoy!";
			else {
				$scope.statusMessage = 'Please enter data first';
				$scope.messageColor = 'error';
			}

			return;

		};
	}

})();