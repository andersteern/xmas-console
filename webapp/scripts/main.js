
require(["jquery", "cmd", "modules/output", "modules/user"], function($, Cmd, Output, User) {

	window.user = User;
	User.init('Tobias', 'Oslo');
	var output = new Output($("#output"));
	var cmd = new Cmd($("#console"), output);
	cmd.seyHello();
});