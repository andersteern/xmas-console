define(
	["modules/output"],
	function(output){

	var Command = function() {
	};
	Command.prototype.run = function(args) {
        if(args != '') {
            var regExp = new RegExp("^([a-zA-Z]{1}:)$");
            if(regExp.test(args[0])) {
                output.print( "Are you sure you want to format \"" + args[0].toUpperCase() + "\"? (y/n)" );
                output.setLastCommand("format");
            } else {
                output.print( "Can't format that, invalid drive letter :(" );
            }
        } else {
            output.print( "You have not specified anything to format, please tell me what U want to format :)" );
        }
	};

	return Command;
});