define(
	["modules/output"],
	function(output){

	var Command = function() {
	};
	Command.prototype.run = function(args) {
		if (args[0] === "fullscreen") {
			var fullscreen = output.getFullscreenForegroundElement();
			fullscreen.css("background-color", "pink");
			
			setTimeout(function() {
				fullscreen.fadeOut(function() {
					fullscreen.remove();
				});
			}, 5000)
		}
		output.print('running command greeter with args:' + args.join(', ') );
	};

	return Command;
});