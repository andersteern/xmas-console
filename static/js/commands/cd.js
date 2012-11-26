define(['modules/output'], function(output){

	var Command = function() {
	};
	Command.prototype.run = function(args) {
        output.print('We not sell em\' CD\'s no more! You wantz a Blu-ray? (y/n)');
        output.setLastCommand("cd");
	};

	return Command;
});