// Create web server
var http = require("http");
var url = require("url");
var fs = require("fs");
var comments = require("./comments.js");

// Create server
http
  .createServer(function (request, response) {
    // Get the request
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    // Read the file
    fs.readFile(pathname.substr(1), function (err, data) {
      if (err) {
        console.log(err);
        response.writeHead(404, { "Content-Type": "text/html" });
      } else {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data.toString());
      }
      response.end();
    });

    // Get comments
    if (pathname == "/getComments") {
      comments.getComments(response);
    }

    // Add comments
    if (pathname == "/addComment") {
      var query = url.parse(request.url).query;
      var nameValue = querystring.parse(query)["name"];
      var commentValue = querystring.parse(query)["comment"];
      comments.addComment(nameValue, commentValue, response);
    }
  })
  .listen(8081);

console.log("Server running at localhost:8081");
