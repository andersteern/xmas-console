var express = require('express');

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
	console.log(request);
	response.send('Hello World!');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
 	console.log("Listening on " + port);
});

app.use("/static", express.static(__dirname + '/static'));
