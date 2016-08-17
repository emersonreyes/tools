const meetUp = angular.module("meetUp", ["ngRoute", "ngAnimate"]);

meetUp.config(function($routeProvider) {
	$routeProvider
	.when("/", {
		templateUrl: "pages/welcome.html",
		controller: "mainCtrl"
	})
	.when("/createaccount", {
		templateUrl: "pages/createaccount.html",
		controller: "mainCtrl"
	})
	.when("/createevent", {
		templateUrl: "pages/createevent.html",
		controller: "mainCtrl"
	})
	.when("/datetime", {
		templateUrl: "pages/datetime.html",
		controller: "mainCtrl"
	})
	.when("/guestlist", {
		templateUrl: "pages/guestlist.html",
		controller: "mainCtrl"
	})
});

// services
meetUp.service("getEventInfo", function() {
	this.eventInfo = {
		eventName: "",
		eventHost: "",
		eventLocation: "",
		startDateTime: "",
		endDateTime: "",
		eventType: ""	
	};
});

// directive for autofocus, focus="true" in html
meetUp.directive('focus', function($timeout) {
	return {
		scope: {
			trigger: '@focus'
		},
		link: function(scope, element) {
			scope.$watch('trigger', function(value) {
				if (value === "true") {
					$timeout(function() {
						element[0].focus();
					});
				}
			});
		}
	};
}); 

// controller
meetUp.controller("mainCtrl", ["$scope", "getEventInfo", function($scope, getEventInfo) {
	$scope.eventInfo = getEventInfo.eventInfo;

	$scope.$watch("eventInfo", function() {
		getEventInfo.eventInfo.eventName = $scope.eventInfo.eventName;
		getEventInfo.eventInfo.eventHost = $scope.eventInfo.eventHost;
		getEventInfo.eventInfo.eventLocation = $scope.eventInfo.eventLocation;
		getEventInfo.eventInfo.startDateTime = $scope.eventInfo.eventStartDate;
		getEventInfo.eventInfo.endDateTime = $scope.eventInfo.eventEndDate;
		getEventInfo.eventInfo.eventType = $scope.eventInfo.eventType;
	});


	$scope.checkPass = function() {
		// an array of object w/ error messages
		$scope.errorTypes = [];

		// regex, uppercase letters
		$scope.upperRegEx = /[A-Z]/g;

		// password need a capital letter
		if (!$scope.password.match($scope.upperRegEx)) {
			$scope.errorTypes.push({ type: " Need a capital letter." });
		}
		// password needs 6 characters or more
		if ($scope.password.length < 6) {
			$scope.errorTypes.push({ type: " Needs a minimum of 6 characters." });	
		}
		// if the array is not empty
		// for the validation message, I didn't use "setCustomValidity" bec. it only
		// works when you double click not single click.
		if ($scope.errorTypes.length > 0) {
			$scope.validationMessage = "Please correct the following error/s. ";
		}
		else {
			$scope.validationMessage = "success!";	
		}  
	};
}]);







	






