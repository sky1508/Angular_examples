var myApp = angular.module("myApp", []);

myApp.controller("myController", function($scope){
	console.log("In myController..");

	$scope.newUser = {};
	$scope.clickedUser = {};
	$scope.message = "";

	$scope.users = [
		{username: "sky", fullName: "Sushil kumar", email: "sky@gmail.com"},
		{username: "vky", fullName: "Vikas kumar", email: "vky@gmail.com"},
		{username: "aky", fullName: "Ajay kumar", email: "aky@gmail.com"}
	];

	$scope.saveUser = function(){
		$scope.users.push($scope.newUser);
		$scope.newUser = {};
		$scope.message = "New User Added Successfully!";
	};

	$scope.selectUser = function(user){
		console.log(user);
		$scope.clickedUser = user;
	};

	$scope.updateUser = function(){
		$scope.message = "User Updated Successfully!";
	};

	$scope.deleteUser = function(){
		$scope.users.splice($scope.users.indexOf($scope.clickedUser), 1);
		$scope.message = "User Deleted Successfully!";
	};

	$scope.clearMessage = function(){
		$scope.message = "";
	};

});