define(['modules/chat', 'modules/output'], function(chat, output){

	var Command = function() {
	};

	Command.prototype.run = function(args) {
		var name = args.join(' ');
		
		if(name.length < 4) {
			output.print('come on!!! A name cant be that short!');
		} else {

			if(chat.send){
				output.print('Me likez ur name just the wayz it is!');
			} 
			else {
				chat.init(name);
				output.print('setting name to: ' + name);
			}
		}
	};

	return Command;
});