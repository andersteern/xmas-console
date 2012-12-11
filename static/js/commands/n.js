define(['modules/output'], function(output){

	var Command = function() {
	};
	Command.prototype.run = function(args) {
        var lastCommand = output.getLastCommand();

        if(lastCommand !== '') {
            switch(lastCommand) {
                case "cd":
                    output.print("WTF! Then getz you a VHS!");
                    break;

                case "del":
                case "delete":
                    output.print("Weak, are you a ***** !?");
                    break;

                case "format":
                    output.print("Stop bugging me with stuff if ya ain't gonna go through with it!");
                    break;

                default:
                    output.print("Me not find anz NO-question :(");
            }
        }
        output.setLastCommand('');
	};

	return Command;
});