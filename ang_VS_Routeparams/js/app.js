/// <reference path="angular-route.js" />
/// <reference path="angular.min.js" />

var app = angular.module("Demo", ["ngRoute"])

            .config(function ($routeProvider, $locationProvider) {
                $routeProvider
                .when("/home", {
                    templateUrl: "Templates/home.html",
                    controller: "homeController"
                })

            .when("/courses", {
                templateUrl: "Templates/courses.html",
                controller: "coursesController"
            })

            .when("/employee", {
                templateUrl: "Templates/employee.html",
                controller: "employeeController"
            })

            .when("/employees/:id", {
                templateUrl: "Templates/employeeDetails.html",
                controller: "employeeDetailsController"
            })

            .otherwise({
                redirectTo: "/home"
            })
                //$locationProvider.html5Mode(true);
            })



        .controller("homeController", function ($scope) {
            $scope.message = "Home Page";
        })

        .controller("coursesController", function ($scope) {
            $scope.courses = ["C#", "CPP", "Java", "MySQL", "HTML", "Angular"];
        })

        .controller("employeeController", function ($scope, $http) {
            $http.get('EmployeeService.asmx/GetAllEmployees')
                    .then(function (response) {
                        $scope.employees = response.data;
                    });
        })

        .controller("employeeDetailsController", function ($scope, $http, $routeParams) {
            $http({
                url: "EmployeeService.asmx/GetEmployee",
                params: {id:$routeParams.id},
                method: "get"
            })
            .then(function (response) {
                $scope.employee = response.data;
             });
        });