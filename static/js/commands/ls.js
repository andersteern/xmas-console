define(
	["modules/output"],
	function(output){

	var Command = function() {
	};
	Command.prototype.run = function(args) {
		output.print( "Did you really think we would let you do that?!?!" );
	};

	return Command;
});