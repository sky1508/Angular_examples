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

            .when("/employeesSearch/:name?", {
                templateUrl: "Templates/employeeSearch.html",
                controller: "employeeSearchController as employeeSearchCtrl"
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

        .controller("employeeController", function ($http, $route, $rootScope, $log, $scope, $location) {
            var that = this;

            that.searchEmployee = function () {
                if (that.name) {
                    $location.url("/employeesSearch/" + that.name);
                }
                else {
                    $location.url("/employeesSearch");
                }
            }



            //various events fired on route change. See the console in verbose mode in browser to observe changes
            $rootScope.$on("$locationChangeStart", function (event, next, current) {
                $log.debug("$locationChangeStart fired");
                $log.debug(event);
                $log.debug(next);
                $log.debug(current);
            });

            $rootScope.$on("$routeChangeStart", function (event, next, current) {
                $log.debug("$routeChangeStart fired");
                $log.debug(event);
                $log.debug(next);
                $log.debug(current);
            });

            /*$rootScope.$on("$locationChangeSuccess", function () {
            $log.debug("$locationChangeSuccess fired");
            });

            $rootScope.$on("$locationChangeSuccess", function () {
            $log.debug("$locationChangeSuccess fired");
            });*/
            /*$scope.$on("$routeChangeStart", function (event, next, current) {
            if (!confirm("Are you sure you want to navigate away from this page to " + next.$$route.originalPath)) {
            event.preventDefault();
            }
            })*/

            $scope.$on("$locationChangeStart", function (event, next, current) {
                if (!confirm("Are you sure you want to navigate away from this page to " + next)) {
                    event.preventDefault();
                }
            })


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
        })

        .controller("employeeSearchController", function ($http, $routeParams) {
            var that = this;

            if ($routeParams.name) {
                $http({
                    url: "EmployeeService.asmx/GetEmployeeByName",
                    params: { name: $routeParams.name },
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