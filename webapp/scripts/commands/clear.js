define(function(user){

	var Command = function(output) {
		this.output = output;
	};
	Command.prototype.run = function(args) {
		this.output.clear();
	};

	return Command;
});