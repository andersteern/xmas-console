define(
	["modules/output"],
	function(output){

	var Command = function() {
	};
	Command.prototype.run = function(args) {
		output.print( "Hello Petter ( 1337! Initializing 1337-mode" );

		setTimeout( function() {
			$("body").css("font-size", 8);
			$("#console").css("height", 10);
		}, 1000);
	};

	return Command;
});