define(['modules/output'], function(output){

	var Command = function() {
	};
	Command.prototype.run = function(args) {

        $("body, #console").css("background-color", '#'+Math.floor(Math.random()*16777215).toString(16));
        $("body, #console").css("color", '#'+Math.floor(Math.random()*16777215).toString(16));
       
        if (args && args.length && args[0] === "-r") {
			$("body, #console").css("background-color", "black");
			$("body, #console").css("color", "limegreen");
        }
    };

	return Command;
});