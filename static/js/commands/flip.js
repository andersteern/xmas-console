define(
	["modules/output"],
	function(output){

	var Command = function() {
	};
	Command.prototype.run = function(args) {
		var outputElement = output.getElement();
		

		if($("#main").hasClass("flip180")) {
			$("#main").removeClass("flip180");
		} else {
			$("#main").addClass("flip180");
		}

		output.print( "If that is what you really want?!" );
	};

	return Command;
});
