define(function(){
	var commands = {};
	
	var cmd = function(consoleElement, output) {
		this.output = output;
		
		this.consoleElement = consoleElement;
	    this.consoleElement.on('keyup', this.handleInput.bind(this));
	
		this.consoleElement.focus();
	    
	};
	cmd.prototype.handleInput = function (e) {
		if(e.keyCode === 13){

			//save command
			var command = this.consoleElement.val();

			//clear console
			this.consoleElement.val('');

			//process command
			this.processCommand(command);
		}
	};

	cmd.prototype.processCommand = function (cmd) {
		var cmdArray = cmd.split(/\s+/),
			command = cmdArray[0],
			args = cmdArray.slice(1);
		
		if (commands[command]) {
			commands[command].run(args);
		}
		else {
			require(["commands/" + command], function(Command) {
				commands[command] = new Command(this.output);
				commands[command].run(args);
			}.bind(this), function (err) {
				this.output.print('no such command: ' + command);
			}.bind(this));
		}
	}
	cmd.prototype.seyHello = function() {
		this.output.print("Hello");
	};
	
	return cmd;
});