define(['modules/chat', 'modules/output'], function(chat, output){

	var Command = function() {
	};

	Command.prototype.run = function(args) {
		var outputElement = output.getElement();
		
		outputElement.addClass("flip");

		output.print(chat.user.name );
	};

	return Command;
});