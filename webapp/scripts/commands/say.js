define(
	["modules/output", "modules/user"],
	function(output, user){

	var Command = function() {
	};
	Command.prototype.run = function(args) {
		user.send(args.join(" "));
	};

	return Command;
});