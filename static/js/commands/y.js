define(['modules/output'], function(output){

	var Command = function() {
	};
	Command.prototype.run = function(args) {
        var lastCommand = output.getLastCommand();

        if(lastCommand !== '') {
            switch(lastCommand) {
                case "cd":
                    output.print("CD is da shitz, stop harrasing me!");
                    break;

                default:
                    output.print("Me not find anz YES-question :(");
            }
        }
        output.setLastCommand('');
	};

	return Command;
});