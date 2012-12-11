define(
	["modules/output"],
	function(output){

	var Command = function() {
	};
	Command.prototype.run = function(args) {
        window.focus();
		window.print();
	};

	return Command;
});