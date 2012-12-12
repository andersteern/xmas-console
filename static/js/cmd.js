define(["modules/output", "modules/cookie", "modules/chat"], function(output, cookie, chat){

	var commands = {};
	
	var cmd = function(consoleElement, debug) {
		
		this.consoleElement = consoleElement;
	    this.consoleElement.on('keyup', this.handleInput.bind(this));
	
		this.consoleElement.focus();
		
		this.history = [];
		this.historyPointer = null;
		
		this.debug = debug;
	};
	cmd.prototype.handleInput = function (e) {
		if (e.keyCode === 13) { // enter

			//save command
			var command = this.consoleElement.val();

			//clear console
			this.consoleElement.val('');

			//process command
			this.processCommand(command.toLowerCase());
		}
		else if (e.keyCode === 38) { // up
			this.getHistory( -1 );
			e.preventDefault();
		}
		else if (e.keyCode === 40) { // down
			this.getHistory( +1 );
			e.preventDefault();
		}
	};

	cmd.prototype.processCommand = function (cmd) {
		var cmdArray = cmd.split(/\s+/),
			command = cmdArray[0],
			args = cmdArray.slice(1);

		output.print("> " + cmd);
		
		if( !cookie.hasName() && command !== 'setname' ) {
			output.print("bad bad, u not said u name!");
			return;
		}

		this.history.push(cmd);
		this.historyPointer = this.history.length;
		
		if (commands[command]) {
			commands[command].run(args);
		}
		else {
			require(["commands/" + command], function(Command) {
				commands[command] = new Command();
				commands[command].run(args);
			}.bind(this), function (err) {
				output.print('no such command: ' + command);
				if (this.debug) {
					output.print(err);
				}
			}.bind(this));
		}
	};
	cmd.prototype.getHistory = function( /* int */ direction ) {
		this.historyPointer = this.historyPointer + direction;
		
		if (this.historyPointer >= this.history.length) {
			this.historyPointer = this.history.length;
			this.consoleElement.val("");
			return;
		}
		if (this.historyPointer < 0) {
			this.historyPointer = 0;
		}
		
		this.consoleElement.val(this.history[this.historyPointer]);
	};

	cmd.prototype.sayHello = function() {
		output.print("Hello!");
		if(cookie.hasName()){
			var name = cookie.getName();
			chat.init(name);
			output.print("Hai "+name+", welcome back!");
		} else {
			output.print("Plz give name thxs! (Pzt: 'setname &lt;yao name&gt;')");
		}
		
	};
	
	cmd.prototype.focus = function() {
		console.log("focus");
		this.consoleElement.focus();
	};
	
	return cmd;
});