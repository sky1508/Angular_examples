var myApp = angular.module("myApp", []);

myApp.controller("myController", function($scope){
	console.log("In myController..");

	$scope.newNote = {};
	$scope.clickedNote = {};
	$scope.message = "";
	$scope.lastUpdate = {};
	$scope.orderByField = 'title';
	$scope.reverseSort = false;
	$scope.clickedNote.editable = { 
           checked: true
       };

	$scope.notes = [
		{title: "A note to remember", timeCreated: "10/19/14 5:32", textArea: "ABC"},
		{title: "A new note", timeCreated: "11/18/14 8:19", textArea: "BBC"},
		{title: "An old note", timeCreated: "11/18/14 10:19", textArea: "DBC"}
	];

	$scope.saveNote = function(){
		//var today  = new Date();
		//$scope.clickedNote.timeCreated = today.toLocaleString();
		$scope.clickedNote.timeCreated = new Date();
		if (!$scope.clickedNote) {return;}
		if ($scope.notes.indexOf($scope.clickedNote) == -1) {
            $scope.notes.push($scope.clickedNote);
        } else {           
        }
		
		//Summary Data
		$scope.lastUpdate.totalNotes = $scope.notes.length;
		$scope.lastUpdate.lastUpdatedTime = $scope.clickedNote.timeCreated;
		var newTitle = $scope.notes.indexOf($scope.clickedNote);
		newTitle = "#"+(newTitle+1)+" - '"+$scope.clickedNote.title+"'";
		$scope.lastUpdate.lastNote = newTitle;
		
		//Emptying current note data
		$scope.clickedNote = {};
		
	};
	
	//To Set the current note
	$scope.selectNote = function(note){
		//console.log(note);
		$scope.clickedNote = note;
	};

	/*
	$scope.deleteNote = function(){
		$scope.notes.splice($scope.notes.indexOf($scope.clickedNote), 1);
	};*/

	//Changing + sign to - and vice verca
	$scope.changeText = function(){
		var b1 = document.getElementById("addNewSpan");
		
		if(b1.className === "glyphicon glyphicon-plus pull-right" || b1.className === "glyphicon glyphicon-plus pull-right collapsed") {
			b1.className = "glyphicon glyphicon-minus pull-right";
		}
		else if(b1.className === "glyphicon glyphicon-minus pull-right" || b1.className === "glyphicon glyphicon-minus pull-right collapsed"){
			b1.className = "glyphicon glyphicon-plus pull-right";
		}
	};
	
	$scope.displaySummary  = function(){
		var b1 = document.getElementById("summary");
		
		if(b1.className === "summaryClass1") {
			b1.className = "summaryClass2";
		}
		else if(b1.className === "summaryClass2"){
			b1.className = "summaryClass1";
		}
		
		var t1 = document.getElementById("tab1");
		
		if(t1.className === "table table-hover") {
			t1.className = "table table-hover tableClass";
		}
		else if(t1.className === "table table-hover tableClass"){
			t1.className = "table table-hover";
		}
	};
	
	$scope.enableSaveBtn = function() {
		var b1 = document.getElementById("saveBtn");
		b1.disabled = false;
	}

});