define(
	["modules/output", "modules/chat", "modules/cookie"],
	function(output, chat, cookie){

	var Command = function() {
	};
	Command.prototype.run = function(args) {
		var msg = args.join(" ");
		if(msg.trim().length === 0){
			output.print('  - "say" &lt;message&gt; sends to everyone');
			output.print('  - "say" @&lt;username&gt; &lt;message&gt; to only send to &lt;username&gt;');
		} else {
			var uname = args.shift(), usrname;
			if(uname.charAt(0) === '@'){
				usrname = uname.substr(1);
				msg = args.join(' ');
			}
			output.print(cookie.getName() + ": \"" + msg + "\"");
			chat.send(encodeURIComponent(msg), usrname);
		}

	};

	return Command;
});