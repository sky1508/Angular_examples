myApp.factory('calcService', function(){
	return {
		add: function(firstNum, secondNum){
			 return result = parseInt(firstNum) + parseInt(secondNum);
		},
		
		subract: function(firstNum, secondNum){
			 return result = parseInt(firstNum) - parseInt(secondNum);
		},
		
		multiply: function(firstNum, secondNum){
			 return result = parseInt(firstNum) * parseInt(secondNum);
		},
		
		divide: function(firstNum, secondNum){
			 return result = parseInt(firstNum) / parseInt(secondNum);
		}
	};
});