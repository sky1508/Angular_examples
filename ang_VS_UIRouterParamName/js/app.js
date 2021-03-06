﻿/// <reference path="angular-route.js" />
/// <reference path="angular.min.js" />

var app = angular.module("Demo", ["ui.router"])

            .config(function ($stateProvider, $locationProvider, $urlMatcherFactoryProvider, $urlRouterProvider) {

                $urlRouterProvider.otherwise("/home");
                $urlMatcherFactoryProvider.caseInsensitive(true);
                $stateProvider
                .state("home", {
                    url: "/home",
                    templateUrl: "Templates/home.html",
                    controller: "homeController",
                    controllerAs: "homeCtrl"
                })

            .state("courses", {
                url: "/courses",
                templateUrl: "Templates/courses.html",
                controller: "coursesController",
                controllerAs: "coursesCtrl"
            })

            .state("employee", {
                url: "/employee",
                templateUrl: "Templates/employee.html",
                controller: "employeeController",
                controllerAs: "employeeCtrl"
            })

            .state("employeeDetails", {
                url: "/employees/:id",
                templateUrl: "Templates/employeeDetails.html",
                controller: "employeeDetailsController",
                controllerAs: "employeeDetailsCtrl"
            })

             .state("employeesSearch", {
                 url: "/employeesSearch/:name",
                 templateUrl: "Templates/employeeSearch.html",
                 controller: "employeeSearchController",
                 controllerAs: "employeeSearchCtrl"
             })

                //            .otherwise({
                //                redirectTo: "/home"
                //            })
                //$locationProvider.html5Mode(true);
            })



        .controller("homeController", function () {
            this.message = "Home Page";
        })

        .controller("coursesController", function () {
            this.courses = ["C#", "CPP", "Java", "MySQL", "HTML", "Angular"];
        })

        .controller("employeeController", function ($http, $state) {
            var that = this;

            that.searchEmployee = function () {
                $state.go("employeesSearch", { name: that.name });
            }

            that.reloadData = function () {
                $state.reload();
            }
            $http.get('EmployeeService.asmx/GetAllEmployees')
                    .then(function (response) {
                        that.employees = response.data;
                    });
        })

        .controller("employeeDetailsController", function ($http, $stateParams) {
            var that = this;
            $http({
                url: "EmployeeService.asmx/GetEmployee",
                params: { id: $stateParams.id },
                method: "get"
            })
            .then(function (response) {
                that.employee = response.data;
            });
        })

         .controller("employeeSearchController", function ($http, $stateParams) {
             var that = this;

             if ($stateParams.name) {
                 $http({
                     url: "EmployeeService.asmx/GetEmployeeByName",
                     params: { name: $stateParams.name },
                     method: "get"
                 })
                .then(function (response) {
                    that.employees = response.data;
                })
             }
             else {
                 $http.get('EmployeeService.asmx/GetAllEmployees')
                    .then(function (response) {
                        that.employees = response.data;
                    })
             }



         });