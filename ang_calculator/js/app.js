var myApp = angular.module("myApp", []);

myApp.controller("myController", function($scope){
	console.log("In myController..");

	$scope.result = "";	
	$scope.message = "";

	$scope.add = function(){
		if(isNaN(parseInt($scope.firstNum))===true|| isNaN(parseInt($scope.secondNum))===true){
			$scope.message="Only Numbers are accepted";
		}else{
			$scope.result = parseInt($scope.firstNum) + parseInt($scope.secondNum);
		}
	};

	$scope.subract = function(){
		if(isNaN(parseInt($scope.firstNum))===true|| isNaN(parseInt($scope.secondNum))===true){
			$scope.message="Only Numbers are accepted";
		}else{
			$scope.result = parseInt($scope.firstNum) - parseInt($scope.secondNum);
		}
	};

	$scope.multiply = function(){
		if(isNaN(parseInt($scope.firstNum))===true|| isNaN(parseInt($scope.secondNum))===true){
			$scope.message="Only Numbers are accepted";
		}else{
			$scope.result = parseInt($scope.firstNum) * parseInt($scope.secondNum);
		}
	};
	
	$scope.divide = function(){
		if(isNaN(parseInt($scope.firstNum))===true|| isNaN(parseInt($scope.secondNum))===true){
			$scope.message="Only Numbers are accepted";
		}else{
			if(parseInt($scope.secondNum)===0)
			{
				$scope.message="Error Divide By Zero!!!"
			}
			else
			{
				$scope.result = parseInt($scope.firstNum) / parseInt($scope.secondNum);
			}
		}
		
		
	};
	
	$scope.clear = function(){
		$scope.firstNum = "";
		$scope.SecondNum = "";
	};

	$scope.clearMessage = function(){
		$scope.message = "";
	};
});