define(['modules/output'], function(output){

	var Command = function() {
	};
	Command.prototype.run = function(args) {

        $("body, #console").css("background-color", '#'+Math.floor(Math.random()*16777215).toString(16));
        $("body, #console").css("color", '#'+Math.floor(Math.random()*16777215).toString(16));
       
        switch (args[0]) {
            case "-r":
                $("body, #console").css("background-color", "black");
                $("body, #console").css("color", "limegreen");
                break;
        }
    };

	return Command;
});