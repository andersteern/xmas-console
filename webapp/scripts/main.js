
require(["jquery", "cmd", "modules/output", "modules/user"], function($, Cmd, Output, User) {

	User.init(name, location);
	var output = new Output($("#output"));
	var cmd = new Cmd($("#console"), output);
	cmd.seyHello();
	
});