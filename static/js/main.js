
require(["jquery", "cmd", "modules/output"], function($, Cmd, Output) {
	var debug = location.href.replace(/.*?.*debug=([^&]*).*/, "$1") == "true";

	// initialise the output console
	Output.create($("#output"), debug);
	
	// initialise the console
	var cmd = new Cmd($("#console"), debug);
	
	// keep the console in focus
	$("#main").on("click", function() { cmd.focus(); });
	
	// welcome message
	cmd.sayHello();

});
