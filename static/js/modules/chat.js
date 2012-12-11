define(['modules/output', 'modules/cookie'], function(_output, cookie){
	
	var users = {},
		output = _output,
		pubnub,
		id,
		standardChannel = 'xmas-channel',
		pubKey = 'pub-d3256ead-73b8-4b3b-b2e6-34e140eda234',
		subKey = 'sub-779ac1c5-1d2a-11e2-8659-73f6697c88cb';

	// ----------------------------------
	// Define Chat and User object
	// ----------------------------------
	var user = {
		name : '',
		id : ''
	};

	var chat = {};
	chat.user = user;

	chat.init = function (name) {
		setName(name);

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
		chat.setName = setName;

		connect();
	};
	chat.getUsers = function() {
		var userId, userArray = [];
		for (userId in users) {
			userArray.push(users[userId]);
		}
		return userArray;
	};

	function setName (name) {
		cookie.setName(name);
		user.name = name;
	}

	function connect(channel, callback) {
		var _callback = callback || recieveMessage;

		pubnub.subscribe({
			restore  : true,
			channel  : standardChannel,
			connect  : function () {
				// assign uuid and send hello
				pubnub.uuid(function(uuid){
					user.id = uuid;
					send(user.name + ' joined!'); 
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

	function send (message, receiver) {
		var msg = prepareMessage(message, receiver),
			_channel = standardChannel;
		
		pubnub.publish({
			channel  : _channel,
			message  : msg
		});
	}

	function prepareMessage (message, receiver) {
		var msg = {};
		msg.id = user.id;
		msg.name = user.name;
		msg.body = message;
		msg.receiver = receiver;
		return msg;
	}

	function isFromSelf (id) {
		return user.id === id;
	}
	
	function isToMe(msg) {
		return !msg.receiver || msg.receiver === user.name;
	}

	function getSender (msg) {
		users[msg.id] = msg.name;
		return msg.name;
	}

	function recieveMessage (msg, info) {
		if(isFromSelf(msg.id)){
			return;
		}
		if (!isToMe(msg)) {
			return;
		}
		var name = getSender(msg);
		output.print(name + ': ' + decodeURIComponent(msg.body));
	}

	return chat;
});