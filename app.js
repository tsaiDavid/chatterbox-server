var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var storage = require('./server/message-data');

app.use(express.static(__dirname + '/client'));

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/client/index.html')
})

app.post('/classes/send', function(req, res) {
  console.log('res from post ' + JSON.stringify(req.body));
  storage.messageData.results.push(req.body);
  res.sendStatus(201);
  console.log('after post ' + JSON.stringify(storage.messageData));
})

app.get('/classes', function(req, res){
  // console.log('req from get ' + JSON.stringify(req.data));
  res.jsonp(storage.messageData);
  console.log('res from get ' + JSON.stringify(res.body));
});

// app.listen(port, hostname)
app.listen(3000);