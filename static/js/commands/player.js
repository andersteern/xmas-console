define(["modules/player", "modules/output"], function(Player, output){

	var Command = function() {
		this.player = new Player();
		this.player.onError = function(e) {
			output.print("player error occurred");
		};
	};
	Command.prototype.run = function(args) {
		switch (args[0]) {
			case "play":
				this.play(args[1]);
				break;
			case "pause":
				this.pause();
				break;
			case "load":
				this.load(args[1]);
				break;
			case "next":
				this.next();
				break;
			case "help":
				this.printDetailedUsage();
				break;
			default:
				this.printUsage();
		}
	};
	Command.prototype.play = function(src) {
		
		if (src) {
			this.load(src);
		}
		try {
			output.print("player playing");
			this.player.play();
		}
		catch (e) {
			this.next();
		}
	};
	Command.prototype.pause = function() {
		output.print("player paused");
		this.player.pause();
	};
	Command.prototype.load = function(src) {
		if (!src) {
			output.print("no source file given");
			this.printUsage();
			return;
		}
		output.print("loading file");
		this.player.load(src);
	};
	Command.prototype.next = function() {
		output.print("player next");
		this.player.nextRandom();
	};
	Command.prototype.printUsage = function() {
		output.print("Usage: player {play | pause | load | next} [url]");
	};
	Command.prototype.printDetailedUsage = function() {
		this.printUsage();
		
		output.print("player play [url] - Play the given url, previous song or a playlist");
		output.print("player load {url} - Loads the given url into player");
		output.print("player next       - Skip to next song in playlist");
		output.print("player pause      - Pauses the player");
	};

	return Command;
});