var AppJAJS = angular.module("AppJAJS", ['ngMaterial', 'ngTable'])

//================================ Configurations

// Angular Material Theme
.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('docs-dark')
    .dark()
    .primaryPalette('light-green')
    .accentPalette('green');
});


//================================ Services and Controllers

// Angular Service for Jobs
AppJAJS.service('jobsService', function($http){
    this.initializeDatabase = function(){
        return $http.post('/api/JobCreation/initializeDatabase');
    }
    
    this.storeJob = function(thisJob){
        return $http.post('/api/JobCreation/storeJob', thisJob);
    }
    
    this.allJobs = function(){
        return $http.post('/api/JobSearch/allJobs');
    }
    
    this.selectedJobs = function(thisCandidate){
        return $http.post('/api/JobSearch/selectedJobs', thisCandidate);
    }
    
    this.searchExams = function(query){
        return $http.get('/api/exams/searchExams/' +  query)
    }
});


// Angular Controller for Body
AppJAJS.controller('bodyController', 
['jobsService', '$scope', '$filter', function (jobsService, $scope, $filter) {
//    jobsService.getAllExamsDetails().then(function(response){
//        $scope.allExams = response.data;
//        $scope.tableParams = new NgTableParams({}, {
//             dataset: $scope.allExams
//        });
//    });
//    
//    $scope.columnClass = function(key, value){
//        var thisClass = '';
//        if(!value){
//            console.log(key + " | " + value);
//            thisClass += "absentColor";
//            return thisClass;
//        }
//        return thisClass;
//    };
}]);

// Angular Controller for Posting Jobs
AppJAJS.controller('postJobController', 
['jobsService', '$scope', '$filter', function (jobsService, $scope, $filter) {
//    jobsService.getAllExamsDetails().then(function(response){
//        $scope.allExams = response.data;
//        $scope.tableParams = new NgTableParams({}, {
//             dataset: $scope.allExams
//        });
//    });
//    
//    $scope.columnClass = function(key, value){
//        var thisClass = '';
//        if(!value){
//            console.log(key + " | " + value);
//            thisClass += "absentColor";
//            return thisClass;
//        }
//        return thisClass;
//    };
}]);

// Angular Controller for Searching Jobs





