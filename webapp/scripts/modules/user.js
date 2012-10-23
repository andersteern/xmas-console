define(function(){
	var users = [];
	
	function addUser( user ) {
		users.push( user );
	}
	function removeUser( user ) {
		// write the code!
	}
	
	var user = {
		add: addUser,
		remove: removeUser
	};

	return user;
});