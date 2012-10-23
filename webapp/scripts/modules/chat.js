define(['modules/output'], function(_output){
	
	var users = {},
		output = _output,
		pubnub,
		id,
		standardChannel = 'xmas-channel',
		pubKey = 'pub-d3256ead-73b8-4b3b-b2e6-34e140eda234',
		subKey = 'sub-779ac1c5-1d2a-11e2-8659-73f6697c88cb';

	// ----------------------------------
	// Define Chat and User obect
	// ----------------------------------
	var user = {
		name : '',
		location : '',
		id : ''
	};
	var chat = {};
	chat.user = user;

	chat.init = function (name, location) {
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

		// add methods
		chat.send = send;

		connect();
	};

	function connect(channel, callback) {
		var _callback = callback || recieveMessage;

		pubnub.subscribe({
			restore  : true,
			channel  : standardChannel,
			connect  : function () {
				// assign uuid and send hello
				pubnub.uuid(function(uuid){
					user.id = uuid;
					send(user.name + ' joined from ' + user.location); 
				});

				// get users from server
				// server.registerNewUser()
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
		msg.id = user.id;
		msg.body = message;
		return msg;
	}

	function isFromSelf (id) {
		return user.id === id;
	}

	function getSender (msg) {
		if(!users[msg.id]) {
			users[msg.id] = msg.body.split(' ')[0];
		}
		return users[msg.id];
	}

	function recieveMessage (msg, info) {
		if(isFromSelf(msg.id)){
			return;
		}
		var sender = getSender(msg);
		
		output.print(sender + ': ' + JSON.stringify(msg.body));
	}

	return chat;
});