var express = require('express');
var app = express();
var router = express.Router();
var moment = require("moment");
var fs = require('fs');

var match_threshold = 50;       //50% Match is minimum

router.get('/allJobs', function(req, res) {
    fs.exists('../../jobsDatabase.json', function(exists){
        if(exists){
            console.log("\nFile exists: Retrieving Data");
            fs.readFile('../../jobsDatabase.json', function readFileCallback(err, data) {
                if (err){
                    console.log(err);
                } else {
                    var db = JSON.parse(data);
                    res.json(db);
                }
            });
        } else {
            console.log("\nFile doesn't exist: Aborting");
            res.json(null);
        }
    });
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

router.post('/selectedJobs', function(req, res) {
    var thisCandidate = req.body;
    fs.exists('../../jobsDatabase.json', function(exists){
        if(exists){
            console.log("\nFile exists: Retrieving Data");
            fs.readFile('../../jobsDatabase.json', function readFileCallback(err, data) {
                if (err){
                    console.log(err);
                } else {
                    var db = JSON.parse(data).jobs;
                    var eligible_jobs = [];
                    db.forEach(function(thisJob){
                        var match_score = compareEligibility(thisCandidate, thisJob);
                        if (match_score >= match_threshold) {
                            thisJob.match_score = match_score;
                            eligible_jobs.push(thisJob);
                        }
                    });
                    res.json(eligible_jobs);
                }
            });
        } else {
            console.log("\nFile doesn't exist: Aborting");
            res.json(null);
        }
    });
});

module.exports = router;