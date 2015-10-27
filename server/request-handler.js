var storage = require('./message-data');

var requestHandler = function(request, response) {
  // Request and Response come from node's http module.

  // console.log("here is the request: ", request);
  console.log("Serving request type " + request.method + " for url " + request.url);

  // The outgoing status.
  var statusCode = 200;

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  // Tell the client we are sending JSONP.
  headers['Content-Type'] = "application/jsonp";

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  if (request.method === 'POST') {
    request.on('data', function(data) {
      console.log('Here is data recevied from POST: ' + data);
      storage.messageData.results.push(JSON.parse(data));

      console.log('Here is data in dataStore from POST: ' + JSON.stringify(storage.messageData.results));

      console.log('Response data from inside POST request: ' + response.data);
      
      // response.writeHead takes statusCode and headers
      response.writeHead(201, headers);
      response.end(JSON.stringify(storage.messageData));
    });
  } else if (request.method === 'GET') {
    // response.writeHead takes statusCode and headers
    console.log('url ' + request.url);
    response.writeHead(200, headers);
    console.log('Response data from inside GET request: ' + response.data);
    response.end(JSON.stringify(storage.messageData));
  } else {
    console.log('Response data from inside ELSE statement: ' + response.data);
    response.end(JSON.stringify(storage.messageData));
  }
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

module.exports.requestHandler = requestHandler;
