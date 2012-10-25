var express = require('express');

var app = express.createServer(express.logger());

app.use("/static", express.static(__dirname + '/static'));

app.get('/', function(request, response) {
	response.redirect('/static/app.html');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
 	console.log("Listening on " + port);
});

