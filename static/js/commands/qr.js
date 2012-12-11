define(["modules/qr"], function(Qr){

	var Command = function() {
	};
	Command.prototype.run = function(args) {
		Qr.display("Pick up your phone, use your avourite QR-code scanner app.<br/>Go figure!");
	};

	return Command;
});