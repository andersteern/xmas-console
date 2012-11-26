define(
	["modules/output"],
	function(output){

	var Command = function() {
	};
	Command.prototype.run = function(args) {
		output.print( "Why not try the new cool ls command instead?" );
	};

	return Command;
});