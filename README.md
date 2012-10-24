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
Example is [available as a gist][commandSnippet].  
*[gists in sublime text][gistsInSublime]*

## Using the modules
### output

```js
output.print(/* string */ msg); // output something to command line

output.clear(); // clear previous outputs

var bgEl = output.getFullscreenBackgroundElement(); // get reference to html-element
var fgEl = output.getFullscreenForegroundElement(); // to do with as you wish
```

### chat

```js
chat.user.name; // get user's name

chat.getUsers(); // get names of all connected users

chat.send(/*string*/ msg); // send message to all users
```

[commandSnippet]: https://gist.github.com/3945388  
[gistsInSublime]: http://net.tutsplus.com/tutorials/tools-and-tips/sexy-code-snippet-management-with-gists/