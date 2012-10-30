define(
	["modules/output"],
	function(output){

	var Command = function() {
	};
	Command.prototype.run = function(args) {
		output.clear();
	};

	return Command;
});