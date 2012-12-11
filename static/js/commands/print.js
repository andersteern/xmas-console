define(
	["modules/output"],
	function(output){

	var Command = function() {
	};
	Command.prototype.run = function(args) {
		var objDoc = window.open(),
			win = objDoc.document,
			body = $("#output").html();

		win.write("<html><head>");
		win.write("<title>Xmas-console</title>");
		win.write("</head><body onload='window.focus(); window.print(); window.close();'>");
		win.write(body);
		win.write("</body></html>");
		win.close();
	};

	return Command;
});