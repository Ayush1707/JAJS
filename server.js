var url = require('url');
var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var morgan  = require('morgan');
var request = require('request');
var sys = require('sys');
var fs = require('fs');
var sm = require('sitemap')
var http = require('http');
var port = 8000 || 9000;
var app = express();
var moment = require('./node_modules/moment.js', moment);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static(__dirname + '/views'));
app.use(express.static('public'));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

var jobsDatabase = [];          // Job Database

// ======================== ROUTES
var jobcreation = require('./app/routes/JobCreation.js', jobcreation);
var jobsearch = require('./app/routes/JobSearch.js', jobsearch);

app.set('jobsDatabase', jobsDatabase);

app.use('/api/JobCreation', jobcreation);
app.use('/api/JobSearch', jobsearch);
var server = app.listen(port);


// Testing Script
var job1 = {
    'title': "Software Engineer",
    'company': "EdgeNetworks",
    'location': "Banglore",
    'job_description': "As a Software Engineer, you're responsible to building new functionalities as well as maintaining and updating the existing ones. You'll need good command over technologies like C++, Python and JavaScript.",
    'skills_required': {
        'JavaScript': 2,
        'Python': 3,
        'C++': 1
    },
    'application_url': "https://edgenetworks.in/"
}

var job2 = {
    'title': "Software Engineer",
    'company': "Google",
    'location': "Banglore",
    'job_description': "As a Software Engineer, you're responsible to building new functionalities on the server side. You'll need good command over technologies like JavaScript. Google command over Javascript is key to you selection, along with Google AppsScript and Python.",
    'skills_required': {
        'JavaScript': 2,
        'Google AppsScript': 1,
        'Python': 2
    },
    'application_url': "http://google.com/"
}

var job3 = {
    'title': "Dev/Ops Developer",
    'company': "Amazon",
    'location': "Chennai",
    'job_description': "As a Dev/Ops Engineer, you'll dwell into the systems and handle internal system as a junior system administrator. Good knowledge about Programming Languages like C, C++ and Python are preferred.",
    'skills_required': {
        'C': 2,
        'C Shell': 1,
        'C++': 1
    },
    'application_url': "https://www.amazon.in/"
}

var job4 = {
    'title': "Machine Learning Engineer",
    'company': "Episource",
    'location': "Mumbai",
    'job_description': "As a Machine Learning Engineer, you're expected to have a good knowledge about C, along with MATLAB or Python and it's libraries for Data Analytics, Visualization and Machine Learning like PyTorch, TensorFlow, Pandas and Numpy.",
    'skills_required': {
        'Python': 5,
        'C': 2,
        'MATLAB': 3,
        'Random': 3
    },
    'application_url': "https://www.episource.com/"
}

jobsDatabase.push(job1, job2, job3, job4);