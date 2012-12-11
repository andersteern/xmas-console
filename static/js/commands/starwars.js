define(["modules/output", "modules/player"], function(output, player){

	var outputElement, myPlayer;

	var Command = function() {
		outputElement = output.getElement();
		myPlayer = new player('https://dl.dropbox.com/u/4512000/star_wars_intro.mp3');
	};

	function toggleStarwarsMode () {
		// body...
		outputElement.addClass("starwars");
		outputElement.toggleClass("spin");

		var init = outputElement.hasClass('spin');
		var message = init ? "May the force be with you" : "The force is no longer with you" ;
		setTimeout(function(){
			output.print(message);
			if(init){
				myPlayer.play();
			} else {
				myPlayer.pause();
			}
		}, 2100);
	}

	Command.prototype.run = function(args) {

		switch (args[0]) {
			case "-h":
				output.print('just do it man!');
				break;

			default:
				toggleStarwarsMode();
		}
		
		
	};

	return Command;
});