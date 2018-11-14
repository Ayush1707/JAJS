var express = require('express');
var fs = require('fs');
var moment = require("moment");
var app = express();
var router = express.Router();

function checkForValidity(job){
    return true;
}

router.post('/storeJob', function(req, res) {
    var new_job = req.body;
    var jobsDatabase = req.app.get('jobsDatabase');
    var valid = checkForValidity(new_job);           //Add Validity of New Job
    if (valid) {
        console.log('\nSuccessful: Added new Job to the Database');
        jobsDatabase.push(new_job);
        req.app.set('jobsDatabase', jobsDatabase);
        res.json(new_job);
    } else {
        console.log('\nError: New Job Invalid!');
    }
});

router.post('/deleteJob', function(req, res) {
    var delete_job = req.body;
    var jobsDatabase = req.app.get('jobsDatabase');
    var found = false;
    jobsDatabase.forEach(function(thisJob, i){
       if (JSON.stringify(thisJob) === JSON.stringify(delete_job)){
           found = true;
           jobsDatabase.splice(i, 1);
       }
    });
    if (found) {
        console.log("\nSuccessful: Job Found and Deleted!");
    } else {
        console.log('\nError: Job Not Found!');
    }
});

module.exports = router;