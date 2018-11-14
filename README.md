# JAJS: Just Another Job Site

## Features: 
    * Post your offered job and get applicants, experienced with the Technologies you want.
    * Get the most ideal job for your skillset and experience.
    
## How To Install:
    * Download and Install [NPM](https://www.npmjs.com/) and [NodeJs] (https://nodejs.org/en/).
    * Clone this repository.
    * Run ```npm install``` in the root folder.
    * Copy [this](https://gist.github.com/realyashnag/12221c7db739ac22c31e02b7a689e61e) File to the '/node_modules' folder.
    
## How to Run:
    * Go to the root folder, run:
    ``` npm start```
    * Open [this](http://localhost:8000) URL on your browser. If that doesn't work, try [this](http://localhost:9000).

## Salient Points:
    * Libraries Used: **NodeJS**, **ExpressJS** and **AngularJS**.
    * **Jobs Postings** can be done from the UI Directly. As mock data, 4 Job Postings are already added by the server.
    * All Job Postings are stored in an **array on the server**.
    * Any Candidate or **User** can open the URL and enter their credentials, along with their skills and experiences, to get the most relevant job offerings using **Match Score**.
    * >                Technologies Matched with User (with User Experience >= Experience Required)
      > Match Score = ___________________________________________________________ x 100
      >                 Total Number of Technologies Required for the Job
    * Per Candidate, Jobs are sorted by first, by the Match Score, followed by **Technologies Occurrences** in the Job's Description.
    
    
