define(
	["modules/output"],
	function(output){

	var Command = function() {
	};
	Command.prototype.run = function(args) {
        if(args != '') {
            output.print( "Are you sure you want to delete \"root/*\" ? (y/n)" );
            output.setLastCommand("delete");
        } else {
            output.print( "You have not specified anything to delete, please tell me what U want to delete :)" );
        }
	};

	return Command;
});