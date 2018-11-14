var express = require('express');
var app = express();
var router = express.Router();
var moment = require("moment");
var fs = require('fs');

var match_threshold = 50;       //50% Match is minimum

router.get('/allJobs', function(req, res) {
    console.log("\nRetrieving all Data");
    var jobsDatabase = req.app.get('jobsDatabase');
    res.json(jobsDatabase);
});

function compareEligibility(thisCandidate, thisJob){
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
    return match_score;
}

router.post('/eligibleJobs', function(req, res) {
    var thisCandidate = req.body;
    var jobsDatabase = req.app.get('jobsDatabase');
    
    var eligible_jobs = [];
    jobsDatabase.forEach(function(thisJob){
        var match_score = compareEligibility(thisCandidate, thisJob);
        if (match_score >= match_threshold) {
            thisJob.match_score = match_score;
            eligible_jobs.push(thisJob);
        } else {
            console.log("Not Compatible: ", thisJob);
        }
    });
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