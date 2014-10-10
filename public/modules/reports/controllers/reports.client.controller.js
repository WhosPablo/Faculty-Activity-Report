'use strict';

// Reports controller
var app = angular.module('reports');

app.controller('ReportsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Reports',
	function($scope, $stateParams, $location, Authentication, Reports ) {
		
		//custom tinymce textarea
		$scope.tinymceOptions = {
			    theme: 'modern',
			    plugins: [
			        'autoresize',
			        'advlist autolink lists charmap preview hr',
			        'searchreplace wordcount',
			        'insertdatetime save table contextmenu directionality',
			        'paste textcolor colorpicker textpattern',
			    ],
			    toolbar1: 'undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist',
		};

		$scope.authentication = Authentication;
		//variable for section 15 to initialize the table
		$scope.grants = 
         	[{
         		titleOfGrant:'Faculty Grants',
         		fundingAgency:'EOF',
         		PI:'Willy Nelson',
         		startEnd:'01/13/2014',
         		value:200	
         	}];
        $scope.addGrants = function(){
         		$scope.grants.push({titleOfGrant: $scope.grants.titleOfGrant , fundingAgency: $scope.grants.fundingAgency, PI: $scope.grants.PI, value:$scope.grants.value, startEnd: $scope.grants.startEnd});
         		$scope.grants.titleOfGrant = '';
         		$scope.grants.fundingAgency = '';
         		$scope.grants.PI = '';
         		$scope.grants.value= '';
         		$scope.grants.startEnd='';
         	};
		// Create new Report
		$scope.create = function() {
			// Create new Report object
			var report = new Reports ({
				name: this.name
			});

			// Redirect after save
			report.$save(function(response) {
				$location.path('reports/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Report
		$scope.remove = function( report ) {
			if ( report ) { report.$remove();

				for (var i in $scope.reports ) {
					if ($scope.reports [i] === report ) {
						$scope.reports.splice(i, 1);
					}
				}
			} else {
				$scope.report.$remove(function() {
					$location.path('reports');
				});
			}
		};

		// Update existing Report
		$scope.update = function() {
			var report = $scope.report ;

			report.$update(function() {
				$location.path('reports/' + report._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Reports
		$scope.find = function() {
			$scope.reports = Reports.query();
		};

		// Find existing Report
		$scope.findOne = function() {
			$scope.report = Reports.get({ 
				reportId: $stateParams.reportId
			});
		};
	}
]);

app.directive('profile', function(){
    return {
      restrict: 'E',
      templateUrl: 'modules/reports/views/profile.client.view.html'
    };
});

app.directive('assignedActivity', function(){
    return {
      restrict: 'E',
      templateUrl: 'modules/reports/views/assigned-activity.client.view.html'
    };
});

app.directive('section7', function(){
    return {
      restrict: 'E',
      templateUrl: 'modules/reports/views/section-7.client.view.html'
    };
});

app.directive('section10', function(){
    return {
      restrict: 'E',
      templateUrl: 'modules/reports/views/section-10.client.view.html'
    };
});

app.directive('section11', function(){
    return {
      restrict: 'E',
      templateUrl: 'modules/reports/views/section-11.client.view.html'
    };
});

app.directive('section12', function(){
    return {
      restrict: 'E',
      templateUrl: 'modules/reports/views/section-12.client.view.html'
    };
});

app.directive('section13', function(){
    return {
      restrict: 'E',
      templateUrl: 'modules/reports/views/section-13.client.view.html'
    };
});

app.directive('section14', function(){
    return {
      restrict: 'E',
      templateUrl: 'modules/reports/views/section-14.client.view.html'
    };
});

app.directive('section15', function(){
    return {
      restrict: 'E',
      templateUrl: 'modules/reports/views/section-15.client.view.html'
    };
});