
require(["jquery", "cmd", "modules/output"], function($, Cmd, Output) {
	var output = new Output($("#output"))
	var cmd = new Cmd($("#console"), output);
	cmd.seyHello();
});

