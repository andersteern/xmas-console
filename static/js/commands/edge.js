define( ["modules/output", "modules/edge"], function(output, Edge){

	var Command = function() {};
	
	Command.prototype.run = function(args) {
		var fullscreen = output.getFullscreenForegroundElement();
		fullscreen.css("background", "black");
		
		var edge = new Edge(fullscreen);
	};

	return Command;
});