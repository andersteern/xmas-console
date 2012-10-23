define(function(user){

	var Command = function(output) {
		this.output = output;
	};
	Command.prototype.run = function(args) {
		if (args[0] === "fullscreen") {
			var fullscreen = this.output.getFullscreenForegroundElement();
			fullscreen.css("background-color", "pink");
			
			setTimeout(function() {
				fullscreen.fadeOut(function() {
					fullscreen.remove();
				});
			}, 5000)
		}
		this.output.print('running command greeter with args:' + args.join(', ') );
	};

	return Command;
});