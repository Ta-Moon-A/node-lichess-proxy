
var express = require('express');
var request = require('request');
var app = express();

app.get('/', function (req, res) {

  var usernames = Object.keys(req.query)[0];
  var options = {
    method: 'post',
    body: usernames,
    url: 'https://lichess.org/api/users',

  }

  request.post(options, (err, response, data) => {
    
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json(JSON.parse(data));
  })

})
var port = process.env.PORT || 3000;
app.listen(port); 
