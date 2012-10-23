xmas-console
============
Web based xmas console to keep the raindeers at bay

Example command-module:

```js
define(['modules/output', 'modules/chat'], function(output, chat){
	
	// call output.print(message) to display things
	// call chat.send(message) to message other users 

	var Command = function() {
		// init instance
	};

	Command.prototype.run = function(/* string[] */ args) {
		output.print('running command with args:' + args.join(', ') );
	};

	return Command;
});
```

THE BRAIN! The brain...