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

var jobsDatabase = [];        // Jobs Database

// ======================== ROUTES
var jobcreation = require('./app/routes/JobCreation.js', jobcreation);
var jobsearch = require('./app/routes/JobSearch.js', jobsearch);

app.set('jobsDatabase', jobsDatabase);

app.use('/api/JobCreation', jobcreation);
app.use('/api/JobSearch', jobsearch);
var server = app.listen(port);