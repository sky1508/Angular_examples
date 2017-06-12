/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
angular.module('todomvc')
	.controller('TodoCtrl', function TodoCtrl($scope, $routeParams, $filter, store) {
		'use strict';

		var todos = $scope.todos = store.todos;

		$scope.newTodo = '';
		$scope.editedTodo = null;

		//called when active/all/completed is pressed to count & sort the data
		$scope.$watch('todos', function () {
			$scope.remainingCount = $filter('filter')(todos, { completed: false }).length;
			$scope.completedCount = todos.length - $scope.remainingCount;
			$scope.allChecked = !$scope.remainingCount;
		}, true);

		//Called after above code to adjust filters clicked by user
		// Monitor the current route for changes and adjust the filter accordingly.
		$scope.$on('$routeChangeSuccess', function () {
			var status = $scope.status = $routeParams.status || '';
			$scope.statusFilter = (status === 'active') ?
				{ completed: false } : (status === 'completed') ?
				{ completed: true } : {};
		});

		
		//Called when a new task is entered and enter is pressed
		$scope.addTodo = function () {
			var newTodo = {
				title: $scope.newTodo.trim(),
				completed: false
			};

			if (!newTodo.title) {
				return;
			}

			$scope.saving = true;
			store.insert(newTodo)
				.then(function success() {
					$scope.newTodo = '';
				})
				.finally(function () {
					$scope.saving = false;
				});
		};

		
		//Called when you click on any task for editing, creates a copy & lets you edit
		$scope.editTodo = function (todo) {
			$scope.editedTodo = todo;
			// Clone the original todo to restore it on demand.
			$scope.originalTodo = angular.extend({}, todo);
		};

		//Called after editing has been done and enter is pressed, 
		//checks the event type as submit or blur if submit then next function is called else no action
		$scope.saveEdits = function (todo, event) {
			// Blur events are automatically triggered after the form submit event.
			// This does some unfortunate logic handling to prevent saving twice.
			if (event === 'blur' && $scope.saveEvent === 'submit') {
				$scope.saveEvent = null;
				return;
			}

			
			//Called after an task is edited & event type is submit
			$scope.saveEvent = event;

			//Called after Reverted method to set reverted property to null
			if ($scope.reverted) {
				// Todo edits were reverted-- don't save.
				$scope.reverted = null;
				return;
			}

			todo.title = todo.title.trim();

			//Checking whether the edited task is same as original task or not, 
			//if same then editedTodois set to null and function returns to blur & submit line
			if (todo.title === $scope.originalTodo.title) {
				$scope.editedTodo = null;
				return;
			}

			store[todo.title ? 'put' : 'delete'](todo)
				.then(function success() {}, function error() {
					todo.title = $scope.originalTodo.title;
				})
				.finally(function () {
					$scope.editedTodo = null;
				});
		};

		//Called when an task is edited but not saved and esc is pressed to revert the edits
		$scope.revertEdits = function (todo) {
			todos[todos.indexOf(todo)] = $scope.originalTodo;
			$scope.editedTodo = null;
			$scope.originalTodo = null;
			$scope.reverted = true;
		};

		//Called when a task is deleted
		$scope.removeTodo = function (todo) {
			store.delete(todo);
		};

		//Called when active/completed switching is done to save the list
		$scope.saveTodo = function (todo) {
			store.put(todo);
		};

		//Called when a task is marked as completed or unmarked after marking
		$scope.toggleCompleted = function (todo, completed) {
			if (angular.isDefined(completed)) {
				todo.completed = completed;
			}
			store.put(todo, todos.indexOf(todo))
				.then(function success() {}, function error() {
					todo.completed = !todo.completed;
				});
		};

		//Called when Clear completed option is clicked to removed completed tasks
		$scope.clearCompletedTodos = function () {
			store.clearCompleted();
		};

		//Called when mark all task as completed is pressed
		$scope.markAll = function (completed) {
			todos.forEach(function (todo) {
				if (todo.completed !== completed) {
					$scope.toggleCompleted(todo, completed);
				}
			});
		};
	});
