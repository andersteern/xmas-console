define(["modules/output", "modules/player"], function(output, Player){

	var player,
		fakeWorkConf = {
			data: null,
			dataClone: null,
			currentLine: null,
			interval: null,
			state: 'off',
			outputEl: null,
			dataUrl: 'https://dl.dropbox.com/u/4512000/fakeWorkData.txt',
			soundUrl: 'https://dl.dropbox.com/u/4512000/TypingSound.mp3'
		},
		elkSoundUrl = 'https://dl.dropbox.com/u/4512000/elk-orgasm.mp3',
		fakeLaughUrl = 'https://dl.dropbox.com/u/4512000/fakeLaugh.mp3';


	function startFakeWork () {
		fakeWorkConf.outputEl = output.getPrintElement();
		fakeWorkConf.dataClone = fakeWorkConf.data.slice(0);
		fakeWorkConf.currentLine = fakeWorkConf.dataClone.shift().match(/.{1,3}/g);
		
		resumeFakeWork(true);
	}

	function performFakeWork () {
		var pieceOfWork = fakeWorkConf.currentLine.shift();
		if(pieceOfWork){
			fakeWorkConf.outputEl.append('<pre style="display:inline;">'+pieceOfWork+'</pre>');
			output.scroll();
		} else {
			fakeWorkConf.currentLine = fakeWorkConf.dataClone.shift().match(/.{1,3}/g);
			if(fakeWorkConf.currentLine) {
				fakeWorkConf.outputEl.append('<br />');
				output.scroll();
			} else {
				stopFakeWork();
			}
		}
	}

	function pauseFakeWork () {
		if(fakeWorkConf.state === 'on'){
			clearInterval(fakeWorkConf.interval);
			player.pause();
			fakeWorkConf.state = 'paused';
		} else {
			output.print(' cant PAUSE work that is not in progress!');
		}
	}

	function stopFakeWork () {
		if(fakeWorkConf.state === 'on' || fakeWorkConf.state === 'paused'){
			clearInterval(fakeWorkConf.interval);
			fakeWorkConf.interval = null;
			fakeWorkConf.outputEl = null;
			player.pause();
			output.print(' aaaaand its coffee time!!!');
			fakeWorkConf.state = 'off';
		} else {
			output.print(' cant STOP work that is not in progress!');
		}
	}

	function resumeFakeWork (forceStart) {
		if(fakeWorkConf.state === 'paused' || forceStart){
			if(player.getCurrentSource() !== fakeWorkConf.soundUrl){
				player.load(fakeWorkConf.soundUrl);
				player.loop(true);
			}
			player.play();
			fakeWorkConf.interval = setInterval(performFakeWork, 100);
			fakeWorkConf.state = 'on';
		}  else {
			output.print(' you just cant RESUME work like that! Try pausing or starting first');
		}
	}

	function fakeWork () {
		if(!fakeWorkConf.data){
			$.get('/static/fakeWorkData.txt')
				.done(function(data){
					fakeWorkConf.data = data.split(/\n/g);
					startFakeWork();
				});
		} else {
			startFakeWork();
		}
	}

	function fakeLaugh () {
		player.load(fakeLaughUrl);
		player.loop(false);
		player.play();
	}

	function fakeElkOrgasm () {
		player.load(elkSoundUrl);
		player.loop(false);
		player.play();
	}

	var Command = function() {
		player = new Player();
	};

	Command.prototype.run = function(args) {
		if(!args.length){

			output.print('  - Usage: fake { work | laugh | elk-orgasm }');
			output.print('  - control fake work via: fake { work-pause | work-resume | work-stop }');

		} else {
			var arg = args.shift().toLowerCase();
			if(arg === 'work'){
				if(fakeWorkConf.interval){
					clearInterval(fakeWorkConf.interval);
				}
				fakeWork();
			}
			else if(arg === 'work-pause'){
				pauseFakeWork();
			}
			else if(arg === 'work-resume'){
				resumeFakeWork();
			}
			else if(arg === 'work-stop'){
				stopFakeWork();
			}
			else if(arg === 'laugh'){
				clearInterval(fakeWorkConf.interval);
				fakeLaugh();
			}
			else if(arg === 'elk-orgasm'){
				clearInterval(fakeWorkConf.interval);
				fakeElkOrgasm();
			}
		}
	};

	return Command;
});