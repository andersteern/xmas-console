
require(["jquery", "cmd", "modules/output"], function($, Cmd, Output) {
	var debug = location.href.replace(/.*?.*debug=([^&]*).*/, "$1") == "true";
	Output.create($("#output"), debug);
	var cmd = new Cmd($("#console"), debug);
	cmd.sayHello();

});
