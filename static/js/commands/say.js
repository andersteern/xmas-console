define(
	["modules/output", "modules/chat", "modules/cookie"],
	function(output, chat, cookie){

	var Command = function() {
	};
	Command.prototype.run = function(args) {
		var msg = args.join(" ")
		output.print(cookie.getName() + ": \"" + msg + "\"");
		chat.send(encodeURIComponent(msg));
	};

	return Command;
});