xmas-console
============
Web based xmas console to keep the raindeers at bay

Example command-module:

```js
define(function(){

	var Command = function(output) {
		this.output = output;
	};
	Command.prototype.run = function(/* string[] */ args) {
		this.output.print('running command with args:' + args.join(', ') );
	};

	return Command;
});
```

THE BRAIN! The brain...