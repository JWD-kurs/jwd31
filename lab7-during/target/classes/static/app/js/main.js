var wafepaApp = angular.module("wafepaApp", ['ngRoute']);

wafepaApp.controller("homeCtrl", function($scope){
	
	$scope.message = "Hello JWD 31";
	
});

wafepaApp.controller("activitiesCtrl", function($scope, $http, $location){
	
	var baseUrl = "/api/activities";
	
	$scope.activities = [];
	
	var getActivities = function(){
		
		var promise = $http.get(baseUrl);
		promise.then(
			function success(res){
				$scope.activities = res.data;
			},
			function error(res){
				alert("Couldn't get activities");
			}
		);
		
		//console.log("Poruka");
	}
	
	getActivities();
	
	$scope.goToEdit = function(id){
		$location.path("/activities/edit/" + id);
	}
	
	$scope.goToAdd = function(){
		$location.path("/activities/add");
	}
});



wafepaApp.controller("editActivityCtrl", function($scope, $routeParams, $http, $location){
	
	var url = "/api/activities/" + $routeParams.aid;
	
	$scope.activity = {};
	$scope.activity.name = "";
	
	var getActivity = function(){
		$http.get(url).then(
			function success(res){
				$scope.activity = res.data;
			},
			function error(){
				alert("Couldn't get activity.");
			}
		);
	}
	
	getActivity();
	
	$scope.doEdit = function(){
		$http.put(url, $scope.activity).then(
			function success(){
				$location.path("/activities");
			},
			function error(){
				alert("Something went wrong.");
			}
		);
	}
});


wafepaApp.controller("addActivityCtrl", function($scope, $http, $location){
	
	var url = "/api/activities";
	
	$scope.activity = {};
	$scope.activity.name = "";
	
	$scope.doAdd = function(){
		$http.post(url, $scope.activity).then(
			function uspeh(){
				$location.path("/activities");
			},
			function neuspeh(){
				alert("Pisi na srpskom.");
			}
		);
	}
	
	
});


wafepaApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl : '/app/html/home.html',
			controller: 'homeCtrl'
		})
		.when('/activities', {
			templateUrl : '/app/html/activities.html'
		})
		.when('/activities/add', {
			templateUrl : '/app/html/add-activity.html'
		})
		.when('/activities/edit/:aid', {
			templateUrl : '/app/html/edit-activity.html'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);