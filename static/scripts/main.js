
require(["jquery", "cmd", "modules/output"], function($, Cmd, Output) {

	// initialise the output console
	Output.create( $("#output") );
	
	// initialise the console
	var cmd = new Cmd( $("#console") );
	
	// keep the console in focus
	$("#main").on("click", function() { cmd.focus(); });
	
	// welcome message
	cmd.sayHello();

});