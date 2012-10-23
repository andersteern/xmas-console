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
		id : '',
		init : init
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

	function connect(channel, callback) {
		var _callback = callback || recieveMessage;

		pubnub.subscribe({
			restore  : true,
			channel  : standardChannel,
			connect  : function () {
				// get users from server
				// server.registerNewUser()
				send(user.name + ' joined from ' + user.location); 
			},
			callback : _callback,
			disconnect : function() {
				console.log("Connection Lost");
			}
		});
	}

	function send (message, channel) {
		var msg = prepareMessage(message),
			_channel = channel || standardChannel;
		
		pubnub.publish({
			channel  : _channel,
			message  : msg
		});
	}

	function prepareMessage (message) {
		var msg = {};
		msg.id = user.name;
		msg.body = message;
		return msg;
	}

	function isFromSelf (id) {
		return user.name === id;
	}

	function recieveMessage (message, info) {
		if(isFromSelf(message.id)){
			return;
		}

		if(!users[msg.id]) {
			users[msg.id] = msg.body.split(' ')[0];
		}
		console.log(users[msg.id] + ': ' + JSON.stringify(message.body));
	}

	function run (args) {
		console.log("running user command with args : " + args.join(', '));
	}

	return user;
});