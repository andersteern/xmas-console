define(function(user){

	var Command = function(output) {
		this.output = output;
	};
	Command.prototype.run = function(args) {
		this.output.print( "Did you really think we would let you do that?!?!" );
	};

	return Command;
});