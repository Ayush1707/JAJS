var express = require('express');
var app = express();
var router = express.Router();
var moment = require("moment");
var fs = require('fs');

var match_threshold = 50;       //50% Match is minimum

router.get('/allJobs', function(req, res) {
    //console.log("\nRetrieving all Data");
    var jobsDatabase = req.app.get('jobsDatabase');
    res.json(jobsDatabase);
});

function compareEligibility(thisCandidate, thisJob){
    var occurrences = 0;
    for (var thisSkill in thisJob.skills_required){
        thisSkill = thisSkill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        var occFound = thisJob.job_description.match(
            new RegExp(thisSkill, 'g') || []);
        if (occFound){
            occurrences += occFound.length;
        }
        /* Error: Counting C++ as a C's occurrence. */
    }
    
    thisCandidate = thisCandidate.skills;
    thisJob = thisJob.skills_required;

    var match_score = 0;
    for (var thisSkill in thisJob){
        for (var thisCandidateSkill in thisCandidate){
            if (thisJob[thisSkill] && thisCandidate[thisCandidateSkill] && thisSkill == thisCandidateSkill) {
                if (thisJob[thisSkill] <= thisCandidate[thisCandidateSkill]) {
                    match_score += 1;
                }
            }
        }
    }
    match_score = (match_score/Object.keys(thisJob).length) * 100;
    
    var obj = {match_score: match_score, occurrences: occurrences};
    return obj;
}

router.post('/eligibleJobs', function(req, res) {
    var thisCandidate = req.body;
    var jobsDatabase = req.app.get('jobsDatabase');

    var eligible_jobs = [];
    jobsDatabase.forEach(function(thisJob){
        var temp = compareEligibility(thisCandidate, thisJob);
        thisJob.match_score = temp.match_score;
        thisJob.occurrences = temp.occurrences;
        
        if (thisJob.match_score >= match_threshold) {
            eligible_jobs.push(thisJob);
        } else {
            console.log("Not Compatible: ", thisJob);
        }
    });
    
    // Sort Using Multiple Properties
    var sort_by;
    (function() {
        // utility functions
        var default_cmp = function(a, b) {
                if (a == b) return 0;
                return a < b ? -1 : 1;
            },
            getCmpFunc = function(primer, reverse) {
                var dfc = default_cmp, // closer in scope
                    cmp = default_cmp;
                if (primer) {
                    cmp = function(a, b) {
                        return dfc(primer(a), primer(b));
                    };
                }
                if (reverse) {
                    return function(a, b) {
                        return -1 * cmp(a, b);
                    };
                }
                return cmp;
            };

        // actual implementation
        sort_by = function() {
            var fields = [],
                n_fields = arguments.length,
                field, name, reverse, cmp;

            // preprocess sorting options
            for (var i = 0; i < n_fields; i++) {
                field = arguments[i];
                if (typeof field === 'string') {
                    name = field;
                    cmp = default_cmp;
                }
                else {
                    name = field.name;
                    cmp = getCmpFunc(field.primer, field.reverse);
                }
                fields.push({
                    name: name,
                    cmp: cmp
                });
            }

            // final comparison function
            return function(A, B) {
                var a, b, name, result;
                for (var i = 0; i < n_fields; i++) {
                    result = 0;
                    field = fields[i];
                    name = field.name;

                    result = field.cmp(A[name], B[name]);
                    if (result !== 0) break;
                }
                return result;
            }
        }
    }());
    eligible_jobs.sort(sort_by('match_score', {name:'occurrences', primer: parseInt, reverse: true}));
    
    console.log(eligible_jobs);
    res.json(eligible_jobs);
});


router.get('/getJobsByCompany/:query', function(req, res) {
    var thisCompany = req.params.query;
    var jobsDatabase = req.app.get('jobsDatabase');
    
    var company_jobs = [];
    jobsDatabase.forEach(function(thisJob){
        if (thisJob.company == thisCompany){
            company_jobs.push(thisJob);
        }
    });
    res.json(jobsDatabase);
});

module.exports = router;