define(["modules/output"], function(output){

	var Command = function() {
	};
	Command.prototype.run = function(args) {
		var outputElement = output.getElement();
		
		outputElement.addClass("starwars").removeClass("spin");
		setTimeout(function() {
			outputElement.addClass("spin");
		}, 5000);
		
		output.print("May the force be with you");
	};

	return Command;
});