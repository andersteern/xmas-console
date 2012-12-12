define(["modules/output", "modules/player"], function(output, Player){

	var player,
		fakeWorkData,
		fakeWorkSoundUrl = 'https://dl.dropbox.com/u/4512000/TypingSound.mp3',
		fakeWorkDataUrl = 'https://dl.dropbox.com/u/4512000/fakeWorkData.txt',
		elkSoundUrl = 'https://dl.dropbox.com/u/4512000/elk-orgasm.mp3',
		fakeLaughUrl = 'https://dl.dropbox.com/u/4512000/fakeLaugh.mp3';


	function startFakeWork () {
		var el = output.getPrintElement();
		var clonedData = fakeWorkData.slice(0);
		var line = clonedData.shift().match(/.{1,3}/g);
		
		player.load(fakeWorkSoundUrl);
		player.loop();

		var interval = setInterval(function(){
			var pieceOfWork = line.shift();
			if(pieceOfWork){
				el.append('<pre style="display:inline;">'+pieceOfWork+'</pre>');
				output.scroll();
			} else {
				line = clonedData.shift().match(/.{1,3}/g);
				if(line) {
					el.append('<br />');
					output.scroll();
				} else {
					clearInterval(interval);
					player.pause();
				}
			}
		}, 100);
	}

	function fakeWork () {
		if(!fakeWorkData){
			$.get('/static/fakeWorkData.txt')
				.done(function(data){
					fakeWorkData = data.split(/\n/g);
					startFakeWork();
				});
		} else {
			startFakeWork();
		}
	}

	function fakeLaugh () {
		player.load(fakeLaughUrl);
		player.play();
	}

	function fakeElkOrgasm () {
		player.load(elkSoundUrl);
		player.play();
	}

	var Command = function() {
		player = new Player();
	};

	Command.prototype.run = function(args) {
		if(!args.length){

			output.print('  - Usage: fake { work | laugh | elk-orgasm }');

		} else {
			var arg = args.shift().toLowerCase();
			if(arg === 'work'){
				fakeWork();
			}
			else if(arg === 'laugh'){
				fakeLaugh();
			}
			else if(arg === 'elk-orgasm'){
				fakeElkOrgasm();
			}
		}
	};

	return Command;
});