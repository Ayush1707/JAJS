# JAJS: Just Another Job Site

## Features: 
  * Post your offered job and get applicants, experienced with the Technologies you want.
  * Get the most ideal job for your skillset and experience.
    
## How To Install:
  * Download and Install [NPM](https://www.npmjs.com/) and [NodeJs] (https://nodejs.org/en/).
  * Clone this repository.
  * Run on the root folder:
```
    npm install
```
  * Copy [moment.js](https://momentjs.com/downloads/moment.js) File to the '/node_modules' folder.
    
## How to Run:
  * To start the server, run on the root folder:
``` 
    npm start
```
  * Open [this](http://localhost:8000) URL on your browser. If that doesn't work, try [this](http://localhost:9000).

## Salient Points:
  * Libraries Used: **NodeJS**, **ExpressJS** and **AngularJS**.
  * **Jobs Postings** can be done from the UI Directly. As mock data, 4 Job Postings are already added by the server.
  * All Job Postings are stored in an **array on the server**.
  * Any Candidate or **User** can open the URL and enter their credentials, along with their skills and experiences, to get the most relevant job offerings using **Match Score**.
>
>                Technologies Matched with User (with User Experience >= Experience Required)
> Match Score = _____________________________________________________________________________ x 100
>                         Total Number of Technologies Required for the Job
>
  * Per Candidate, Jobs are sorted by first, by the Match Score, followed by **Technologies Occurrences** in the Job's Description.
    
    
