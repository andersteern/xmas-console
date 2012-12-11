define(
	["modules/output"],
	function(output){

	var Command = function() {
	};
	Command.prototype.run = function(args) {
		var outputElement = output.getElement();
		

		$("#main").toggleClass("flip180");

		output.print( "If that is what you really want?!" );
	};

	return Command;
});
