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
	
	$scope.doDelete = function(id){
		var promise = $http.delete(baseUrl + "/" + id);
		promise.then(
			function success(){
				getActivities();
			},
			function error(){
				alert("Couldn't delete activity.");
			}
		);
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


wafepaApp.controller("recordsCtrl", function($scope, $http){
	
	var recordsUrl = "/api/records";
	var activitiesUrl = "/api/activities";
	var usersUrl = "/api/users";
	
	
	$scope.record = {};
	$scope.record.time = "";
	$scope.record.duration = "";
	$scope.record.intensity = "";
	$scope.record.userId = "";
	$scope.record.activityId = "";
	
	
	$scope.records = [];
	
	var getRecords = function(){
		$http.get(recordsUrl).then(
			function success(res){
				$scope.records = res.data;
			},
			function error(){
				alert("Something went wrong!");
			}
		);
	}
	
	getRecords();
	
	
	$scope.activities = [];	
	var getActivities = function(){
		$http.get(activitiesUrl).then(
			function success(res){
				$scope.activities = res.data;
			},
			function error(){
				alert("Couldn't fetch activities");
			}
		);
	}
	
	getActivities();
	
	
	$scope.users = [];
	var getUsers = function(){
		$http.get(usersUrl).then(
			function success(res){
				$scope.users = res.data;
			},
			function error(){
				alert("Couldn't fetch users.");
			}
		);
	}
	
	getUsers();
	
	$scope.doAdd = function(){
		var prom = $http.post(recordsUrl, $scope.record);
		prom.then(
			function success(){
				getRecords();
			},
			function error(){
				alert("Couldn't post record.");
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
		.when('/records', {
			templateUrl : '/app/html/records.html'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);