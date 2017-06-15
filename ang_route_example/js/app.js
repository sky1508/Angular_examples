var app = angular.module("Demo", ["ngRoute"])
            .config(function ($routeProvider) {
                $routeProvider
                .when("/home", {
                    templateUrl: "Templates/home.html",
                    controller: "homeController"
                })

            .when("/courses", {
                templateUrl: "Templates/courses.html",
                controller: "coursesController"
            })

            .when("/students", {
                templateUrl: "Templates/student.html",
                controller: "studentController"
            })
			
			.otherwise({
                redirectTo: "/home" 
            })
            })

        .controller("homeController", function ($scope) {
            $scope.message = "Home Page";
        })

        .controller("coursesController", function ($scope) {
            $scope.courses = ["C#", "CPP", "Java", "MySQL", "HTML", "Angular"];
        })

        .controller("studentController", function ($scope) {
            $scope.students = ["AKK", "VVV", "BBB", "NNQL", "GFF", "EER"];
        });