/// <reference path="angular-route.js" />
/// <reference path="angular.min.js" />

var app = angular.module("Demo", ["ui.router"])

            .config(function ($stateProvider, $locationProvider, $urlMatcherFactoryProvider, $urlRouterProvider) {
                $locationProvider.html5Mode(true);
                $urlRouterProvider.otherwise("/home");
                $urlMatcherFactoryProvider.caseInsensitive(true);
                $stateProvider
                .state("home", {
                    url: "/home",
                    templateUrl: "Templates/home.html",
                    controller: "homeController",
                    controllerAs: "homeCtrl",
                    data: {
                        customData1: "Home State Custom Data 1",
                        customData2: "Home State Custom Data 2"
                    }
                })

            .state("courses", {
                url: "/courses",
                templateUrl: "Templates/courses.html",
                controller: "coursesController",
                controllerAs: "coursesCtrl",
                data: {
                    customData1: "Courses State Custom Data 1",
                    customData2: "Courses State Custom Data 2"
                }
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

            })



        .controller("homeController", function ($state) {
            this.message = "Home Page";
            this.homeCustomData1 = $state.current.data.customData1;
            this.homeCustomData2 = $state.current.data.customData2;

            this.coursesCustomData1 = $state.get("courses").data.customData1;
            this.coursesCustomData2 = $state.get("courses").data.customData2;
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