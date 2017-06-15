/// <reference path="angular-route.js" />
/// <reference path="angular.min.js" />

var app = angular
            .module("myApp", [])
            .controller("myController", function ($scope, $http) {
                $http.get('EmployeeService.asmx/GetAllEmployees')
                    .then(function (response){
                        $scope.employees = response.data;
                    });
            });

            