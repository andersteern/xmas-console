define(["modules/output"], function(output){

	var availableCommands = [];
	var secretHelpResources = [
		'http://www.internet.com/',
		'http://www.telegraph.co.uk/news/newstopics/howaboutthat/4696372/Greatest-101-questions-of-all-time-1-20.html',
		'http://www.allexperts.com/',
		'http://www.answers.com/',
		'http://www.theatlantic.com/international/archive/2012/09/answers-to-all-your-questions-about-iran-israel-bibi-and-obama/261906/',
		'http://www.wolframalpha.com/'
		];

	var Command = function() { };

	function printCommandHelp (argument) {
		output.print(' Available help:');
		output.print(' -c : prints available commands');
		output.print(' -e : get external help');
		output.print(' -x : get secret help');
	}

	function parseArgs (args) {
		if(_.contains(args, '-c')){
			printCommands();
		} else if(_.contains(args, '-e')) {
			printExternalHelp();
		} else if(_.contains(args, '-x')) {
			printSecretHelp();
		}
	}

	function printCommands () {
		
		if(availableCommands.length === 0){
			$.getJSON("/cmds", function(data) {
				availableCommands = data;
				printCommands();
			});
		} else {
			output.print(' Available commands:');
			_.each(availableCommands, function(item){
				output.print(' - '  + item.replace('.js', ''));
			});
		}
	}

	function printExternalHelp (argument) {
		output.print(' External help:');
		output.print(' - <a href="https://www.yammer.com/netlight.com" target="_blank">netlight at yammer</a>');
	}

	function printSecretHelp (argument) {
		output.print(' Secret help:');
		output.print(' - have you tried "the" internet?');
		var href = secretHelpResources[Math.floor(Math.random()*secretHelpResources.length)];
		output.print(' - <a href="'+href+'" target="_blank">the internet says...</a>'); 
	}

	Command.prototype.run = function(args) {
		if(!args.length){
			printCommandHelp();
		} else {
			parseArgs(args);
		}
	};

	return Command;
});