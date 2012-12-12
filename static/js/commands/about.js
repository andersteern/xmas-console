define(['modules/output', 'modules/player'], function(output, Player){

	var player = new Player("https://dl.dropbox.com/u/1473866/jinglebellrock.mp3");
	
	var message = [
		"This would not have been possible",
		"if it wasn't for the splendid work of",
		"",
		"Anders Karlsson",
		"Tobias Lundin",
		"Christoffer Winter-Hjelm",
		"Daniel Walz",
		"Bjørn-Harald Olsen",
		"Henrik Edberg",
		"Erik Skogby",
		"Sebastian Schöld",
		"Fredrik Löf",
		"Jonathan Melchert",
		"",
		"♪ Jingle bells, jingle bells ♪",
		"♪ Jingle all the way,        ♪",
		"♪ Oh what fun it is to ride  ♪",
		"♪ In a one-horse open sleigh ♪",
		"",
		"From all of us",
		"To All of You",
		"a Very Merry Christmas!"
	];


	var Command = function() {
	};
	Command.prototype.run = function(args) {
		output.slowPrint(message, "#", 80);
		player.play();
		// curl -i "https://api.github.com/repos/andersk2/xmas-console/contributors?anon=true",
		// curl -i "https://api.github.com/users/andersk2"
	};

	return Command;
});