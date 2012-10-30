
require(["jquery", "cmd", "modules/output"], function($, Cmd, Output) {

	Output.create( $("#output") );
	var cmd = new Cmd($("#console"));
	cmd.sayHello();

});