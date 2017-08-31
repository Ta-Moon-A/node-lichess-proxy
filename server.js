
var express = require('express');
var request = require('request');
var app = express();


var appContext = {};




// Add headers
app.use(function (req, res, next) {

   var allowedOrigins = ['http://127.0.0.1:8080','https://bumbeishvili.github.io', 'https://ta-moon-a.github.io','http://localhost:8080'];
   var origin = req.headers.origin;
   if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
   }
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/', function (req, res) {

  var usernames = Object.keys(req.query)[0];
  var options = {
    method: 'post',
    body: usernames,
    url: 'https://lichess.org/api/users',

  }

  if(!appContext[usernames]){
      appContext[usernames] = {};
  }
  
  if(appContext[usernames].lastSavedTime){
     var currentTime = Date.now();
     var minutesBetweenRequests =  Math.round((((currentTime - appContext[usernames].lastSavedTime) % 86400000) % 3600000) / 60000);
     if(minutesBetweenRequests>0){
        request.post(options, (err, response, data) => {
          appContext[usernames].lastSavedItem = JSON.parse(data);
          appContext[usernames].lastSavedTime = Date.now();
          res.json(appContext[usernames].lastSavedItem);
      })
     }else{
        res.json(appContext[usernames].lastSavedItem);
     }
       
  }else{
        request.post(options, (err, response, data) => {
          appContext[usernames].lastSavedItem = JSON.parse(data);
          appContext[usernames].lastSavedTime = Date.now();
          res.json(appContext[usernames].lastSavedItem);
      })
  }
  



})
var port = process.env.PORT || 3000;
app.listen(port); 
