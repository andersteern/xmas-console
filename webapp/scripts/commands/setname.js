define(['modules/chat'], function(chat){

	var Command = function(output) {
		this.output = output;
	};
	Command.prototype.run = function(args) {
		var name = args.join(' ');
		if(name.length < 4){
			this.output.print('come on!!! A name cant be that short!');
		} else {
			chat.init(args.join(' '));
			this.output.print('setting name to: ' + chat.user.name );
		}
	};

	return Command;
});