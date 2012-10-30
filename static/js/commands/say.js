define(
	["modules/output", "modules/chat"],
	function(output, chat){

	var Command = function() {
	};
	Command.prototype.run = function(args) {
		chat.send(args.join(" "));
	};

	return Command;
});