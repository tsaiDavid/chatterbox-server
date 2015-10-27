var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// var storage = require('./server/message-data');

  var messageData = {
    results: []
  };

app.use(express.static(__dirname + '/client'));

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/client/index.html')
})

app.post('/what', function(req, res) {
  console.log('req ' + req.body.username);
  // console.log('res from post ' + JSON.stringify(res.data));
  // res.jsonp(storage);
  res.end();
})

app.get('/classes', function(req, res){
  console.log('req from get ' + JSON.stringify(req.data));
  console.log('res from get ' + JSON.stringify(res.locals));
  res.jsonp(messageData);
  res.end();
});

// app.listen(port, hostname)
app.listen(3000);