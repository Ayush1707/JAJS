var AppJAJS = angular.module("AppJAJS", ['ngMaterial']) //'ngRoute', 'ngAnimate'

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
    this.storeJob = function(thisJob){
        return $http.post('/api/JobCreation/storeJob', thisJob);
    }
    
    this.deleteJob = function(thisJob){
        return $http.post('/api/JobCreation/deleteJob', thisJob);
    }
    
    this.allJobs = function(){
        return $http.get('/api/JobSearch/allJobs');
    }
    
    this.eligibleJobs = function(thisCandidate){
        return $http.post('/api/JobSearch/eligibleJobs', thisCandidate);
    }
    
    this.getJobsByCompany = function(query){
        return $http.get('/api/JobSearch/getJobsByCompany/' +  query)
    }
});


// Angular Controller for Body
AppJAJS.controller('bodyController', 
['jobsService', '$scope', '$filter', function (jobsService, $scope, $filter) {
    var self = this;
    function loadAll() {
        var allSkills = ["ActionScript","Ada","Agilent VEE","Algol","Alice","Angelscript","AppleScript","ASP","AspectJ","Assembly","ATLAS","Augeas","AutoHotkey","Avenue","Bash","(Visual) Basic","BCPL","BETA","BlitzMax","Boo","Bourne Shell","C","C Shell","C#","C++","C++/CLI","C-Omega","Caml","Ceylon","CFML","CHILL","CL (OS/400)","Clarion","Clean","Clipper","Clojure","CLU","COBOL","Cobra","CoffeeScript","ColdFusion","COMAL","Common Lisp","DCL","DCPU-16 ASM","Delphi/Object Pascal","DiBOL","Dylan","Ecl","ECMAScript","EGL","Eiffel","Elixir","Emacs Lisp","Erlang","Etoys","Euphoria","EXEC","F#","Factor","Falcon","Fancy","Fantom","Felix","Forth","Fortran","Fortress","(Visual) FoxPro","Gambas","GNU Octave","Go","Google AppsScript","Gosu","Groovy","Haskell","haXe","Heron","HPL","HyperTalk","Icon","Inform","Informix-4GL","INTERCAL","Ioke","J#","JADE","Java","Java FX Script","JavaScript","JScript","JScript.NET","Julia","Korn Shell","Kotlin","LabVIEW","Ladder Logic","Lasso","Limbo","Lingo","Lisp","Logo","Logtalk","LotusScript","LPC","Lua","Lustre","MAD","Magic","Magik","Malbolge","MANTIS","Maple","Mathematica","MATLAB","Max/MSP","MAXScript","Mercury","Mirah","Miva","Monkey","Modula-2","Modula-3","Moto","MS-DOS Batch","MUMPS","NATURAL","Nemerle","Nimrod","NQC","NSIS","NXT-G","Oberon","Object Rexx","Objective-C","Objective-J","OCaml","Occam","ooc","Opa","OpenCL","OpenEdge ABL","OPL","Paradox","Parrot","Pascal","Perl","PHP","Pike","PILOT","PL/I","PL/SQL","Pliant","PostScript","POV-Ray","PowerBasic","PowerScript","PowerShell","Processing","Prolog","Puppet","Pure Data","Python","Racket","REALBasic","REBOL","Revolution","REXX","RPG (OS/400)","Ruby","Rust","S-PLUS","SAS","Sather","Scala","Scheme","Scilab","Scratch","sed","Seed7","Self","Shell","SIGNAL","Simula","Simulink","Slate","Smalltalk","Smarty","SPARK","SPSS","SQR","Squeak","Squirrel","Standard ML","Suneido","SuperCollider","thinBasic","Transact-SQL","Turing","TypeScript","Vala","Genie","VBScript","Verilog","VHDL","VimL","Visual Basic .NET","WebDNA","Whitespace","xBase","XBase++","Xen","XPL","XSLT","XQuery","yacc","Yorick","Z shell"];

        return allSkills;
    };
    self.simulateQuery = false;
    self.isDisabled    = false;
    self.skills = loadAll();
    self.querySearch = querySearch;
    
    function createFilterFor(query) {
        return function filterFn(skill) {
            return (skill.indexOf(query) === 0);
        };
    }
    
    function querySearch (query) {
        var results = query ? self.skills.filter( createFilterFor(query) ) : self.skills,
        deferred;
        if (self.simulateQuery) {
            deferred = $q.defer();
            $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
            return deferred.promise;
        } else {
            return results;
        }
    }
}]);


// Angular Controller for Posting Jobs
AppJAJS.controller('postJobController', 
['jobsService', '$scope', '$controller', function (jobsService, $scope, $controller) {
    $controller('bodyController', {$scope: $scope});
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;
    $scope.required_skills = [];
    console.log("Post Job", self.skills);
    
    function searchTextChange(text) {
        console.log('Text changed to ' + text);
    }

    function selectedItemChange(item) {
        console.log('Item changed to ' + item);
        if (item){
            $scope.required_skills.push(item);
        }
        console.log($scope.required_skills);
    }
    
    $scope.postJob = function(job){
        console.log(job); 
        if (job.title && 
            job.application_url && job.required_skills && 
            job.title!="" && 
            job.application_url != "" && job.required_skills != ""){
            jobsService.storeJob(job).finally(function(response){
                console.log("Posted Job Successfully!", response);
            });
        } else {
            console.log("Invalid Form: Empty Conditional Fields")
        }
    }
    
    $scope.job = {
        title: "Angular Developer",
        company: "Google",
        location: "Banglore",
        job_description: "Developing and improving Angular 1 Features and flow cycle.",
        required_skills: {
            'Javascript': 10,
            'C++': 5
        },
        application_url: "google.com/jobs"
    }
}]);


// Angular Controller for Searching Jobs
AppJAJS.controller('searchJobsController', 
['jobsService', '$scope', '$controller', function (jobsService, $scope, $controller) {
    $controller('bodyController', {$scope: $scope});
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;
    $scope.user_skills = [];
    console.log("Search", self.skills);
    
    function searchTextChange(text) {
        console.log('Text changed to ' + text);
    }
    
    function selectedItemChange(item) {
        console.log('Item changed to ' + item);
        if (item){
            $scope.user_skills.push(item);
        }
        console.log($scope.user_skills);
    }

    $scope.getAllJobs = function(){
        jobsService.allJobs().finally(function(response){
            console.log(response);
        });
    }
    
    $scope.getEligibleJobs = function(thisUser){
        jobsService.eligibleJobs(thisUser).finally(function(response){
            console.log(response);
        });
    }
    
    $scope.user = {
        'name': "Yash Nag",
        'location': "Jaipur",
        'contactnumber': 9166005005,
        'skills': {
        },
        'emailid': "realyashnag@gmail.com"
    }
}]);




