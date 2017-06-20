/// <reference path="angular-route.js" />
/// <reference path="angular.min.js" />

var app = angular.module("Demo", ["ngRoute"])

            .config(function ($routeProvider, $locationProvider) {
                $routeProvider
                .when("/home", {
                    templateUrl: "Templates/home.html",
                    controller: "homeController as homeCtrl"
                })

            .when("/courses", {
                templateUrl: "Templates/courses.html",
                controller: "coursesController",
                controllerAs: "coursesCtrl"
            })

            .when("/employee", {
                templateUrl: "Templates/employee.html",
                controller: "employeeController",
                controllerAs: "employeeCtrl"
            })

            .when("/employees/:id", {
                templateUrl: "Templates/employeeDetails.html",
                controller: "employeeDetailsController as employeeDetailsCtrl"
            })

            .otherwise({
                redirectTo: "/home"
            })
                //$locationProvider.html5Mode(true);
            })



        .controller("homeController", function () {
            this.message = "Home Page";
        })

        .controller("coursesController", function () {
            this.courses = ["C#", "CPP", "Java", "MySQL", "HTML", "Angular"];
        })

        .controller("employeeController", function ($http, $route) {
            var that = this;

            that.reloadData = function () {
                $route.reload();
            }
            $http.get('EmployeeService.asmx/GetAllEmployees')
                    .then(function (response) {
                        that.employees = response.data;
                    });
        })

        .controller("employeeDetailsController", function ($http, $routeParams) {
            var that = this;
            $http({
                url: "EmployeeService.asmx/GetEmployee",
                params: { id: $routeParams.id },
                method: "get"
            })
            .then(function (response) {
                that.employee = response.data;
            });
        });