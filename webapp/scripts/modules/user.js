define(function(){
	
	var users = {},
		pubnub,
		id,
		standardChannel = 'xmas-channel',
		pubKey = 'pub-d3256ead-73b8-4b3b-b2e6-34e140eda234',
		subKey = 'sub-779ac1c5-1d2a-11e2-8659-73f6697c88cb';

	// ----------------------------------
	// Define user obect
	// ----------------------------------
	var user = {
		name : '',
		location : '',
		id : ''
	};

	function init (name, location) {
		user.name = name;
		user.location = location;

		// ----------------------------------
		// INIT PUBNUB
		// ----------------------------------
		pubnub = PUBNUB({
			publish_key   : pubKey,
			subscribe_key : subKey,
			ssl           : false,
			origin        : 'pubsub.pubnub.com'
		});

		connect();

		// add methods
		user.send = send;
		user.run = run;
	}
	
	function sendCallback (info) {
		console.log('** pubnub callback: ' + JSON.stringify(info));
	}

	function connect(channel, callback) {
		var _channel = channel || standardChannel,
			_callback = callback || recieveMessage;

		pubnub.subscribe({
			restore  : true,
			channel  : _channel,
			connect  : send_hello,
			callback : _callback,
			disconnect : function() {
				console.log("Connection Lost");
			}
		});

		function send_hello (){
			pubnub.publish({
				channel  : _channel,
				message  : { joined : user.name, location : user.location },
				callback : function (info) {
					user.id = info[2];
				}
			});
		}
	}

	function send (channel, message) {
		var _channel = channel || standardChannel;

		pubnub.publish({
			channel  : channel,
			message  : message
		});
	}

	function isFromSelf (msgInfo) {
		return user.id === msgInfo[1];
	}

	function recieveMessage (message, info) {
		if(isFromSelf(info)){
			console.log('sent from yourself', message);
		} else {
			console.log(JSON.stringify(message));
		}
	}

	function run (args) {
		console.log("running user command with args : " + args.join(', '));
	}

	return { init : init };
});