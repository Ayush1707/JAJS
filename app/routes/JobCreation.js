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
    var valid = checkForValidity(new_job);           //Add Validity of New Job
    if (valid) {
        fs.exists('../../jobsDatabase.json', function(exists){
            if(exists){
                console.log("\nFile exists: Updating");
                
                fs.readFile('../../jobsDatabase.json', function readFileCallback(err, data) {
                    if (err){
                        console.log(err);
                    } else {
                        var db = JSON.parse(data).jobs;
                        db.push(new_job);
                        
                        var obj = {
                            'jobs': db 
                        }
                        fs.writeFile('../../jobsDatabase.json', JSON.stringify(obj)); 
                        res.json(obj);
                    }
                });
            } else {
                console.log("\nFile doesn't exist: Creating & Updating");
                var obj = {
                    "jobs": [new_job]
                }
                fs.writeFile('../../jobsDatabase.json', JSON.stringify(obj));
                res.json(obj);
            }
        });
    } else {
        console.log('\nError: New Job Invalid!');
    }
});

router.post('/clearDatabase', function(req, res) {
    console.log("\nCreating Empty Database");
    var obj = {
        "jobs": []
    }
    fs.writeFile('../../jobsDatabase.json', JSON.stringify(obj));
    res.json(obj);
});


module.exports = router;