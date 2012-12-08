define(["modules/output"], function(output){

	var Command = function() {
	};
	Command.prototype.run = function(args) {
		var outputElement = output.getElement();

		switch (args[0]) {
            case "-r":
                outputElement.removeClass("starwars");
				output.print("The force is no longer with you");
                break;

            default:
            	outputElement.addClass("starwars").removeClass("spin");
				setTimeout(function() {
					outputElement.addClass("spin");
				}, 3000);
				
				output.print("May the force be with you");
		}
		
		
	};

	return Command;
});