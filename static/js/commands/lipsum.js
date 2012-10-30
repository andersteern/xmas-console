define(['modules/chat', 'modules/output'], function(chat, output){

	var apiUrl = "http://json-lipsum.appspot.com/?amount=5";
	var Command = function() {
	};

	Command.prototype.run = function(args) {
		$.ajax({
			url: apiUrl,
			dataType: "jsonp",
		}).done(function(data) {
			output.print(data.lipsum);
		})
	};

	return Command;
});