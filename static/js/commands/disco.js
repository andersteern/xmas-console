define(["modules/output", "modules/player", "commands/color"], function(output, Player, Color){

	var outputElement, myPlayer = new Player(), color = new Color(), interval;



	var Command = function() {
	};

	function toggleDiscoMode (init) {

		// body...

		var message = init ? "It's hammertime!" : "It's regular time again.. You are so boring! :(" ;
		setTimeout(function(){
			output.print(message);
			if(init){

				myPlayer.loadPlaylist(function() {
					myPlayer.load("random");
					myPlayer.play();
				});


				interval = setInterval(function() {
					color.run();

				}, 1000);


			} else {
				clearInterval(interval);
				myPlayer.pause();
				myPlayer.rewind();
				color.run(["-r"]);
			}
		}, 2100);
	}

	Command.prototype.run = function(args) {

		switch (args[0]) {
			case "-h":
				output.print('Disco? I say HIT IT! And hit the volume!');
				break;

			case "-r":
				toggleDiscoMode(false);
				break;

			default:
				toggleDiscoMode(true);
		}
		
		
	};

	return Command;
});