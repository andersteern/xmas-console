define(['modules/chat', 'modules/output'], function(chat, output){

	var Command = function() {
	};

	Command.prototype.run = function(args) {
		var name = args.join(' ');
		if(name.length < 4){
			output.print('come on!!! A name cant be that short!');
		} else {
			if(!chat.send){
				chat.init(args.join(' '));	
			} else {
				chat.user.name = name;
			}
			
			output.print('setting name to: ' + chat.user.name );
		}
	};

	return Command;
});