var express = require('express'),
	cheerio = require('cheerio'),
	request = require('request'),
	fs = require('fs'),
	url = require('url');

var app = express.createServer(express.logger());

app.use("/static", express.static(__dirname + '/static'));

app.get('/', function(request, response) {
	response.redirect('/static/app.html');
});

var getMediaFileFromUrl = (function () {
	var cache = {};
	return function(url, callback) {
		if (cache[url]) {
			return callback(cache[url]);
		}
		request({uri: url}, function(err, response, body){
			if(err && response.statusCode !== 200){console.log('Request error.');}

			var $ = cheerio.load(body);
			$("ref").each(function() {
				cache[url] = $(this).attr("href");
				callback(cache[url]);
			});
		});
	};
}());

app.get('/digi', function(req, res){
	var asxFiles = [];
	var mediaFiles = [];

	request('http://sverigesradio.se/sida/topplista.aspx?programid=2697', function(error, response, body){
		if(error && response.statusCode !== 200){console.log('Request error.');}

		var $ = cheerio.load(body);

		$(".music-toplist-table .play").each(function () {
			asxFiles.push("http://sverigesradio.se" + $(this).attr("href"));
		});
		if (asxFiles.length) {
			asxFiles.forEach(function(asxFile) {
				getMediaFileFromUrl(asxFile, function(media) {
					mediaFiles.push(media);
					if (asxFiles.length === mediaFiles.length) {
						res.end(JSON.stringify(mediaFiles));
					}
				});
			});
		}
		else {
			res.end("{}");
		}
	});
});

// get names of commands from files
app.get('/cmds', function(req, res) {
	var results = [];
	fs.readdir('static/js/commands', function(err, list){
		if(err){
			res.statusCode = 400;
			res.end('{}');
		} else {
			res.statusCode = 200;
			res.write(JSON.stringify(list));
			res.end();
		}
	});
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
	console.log("Listening on " + port);
});

