define(["modules/output"],	function(output){
	
	// IPInfoDB 
	var apiKey = ''; // key was disabled since it was made avaiable via github

	function checkInputIp (ip) {
		return /^\d{1,3}(\.\d{1,3}){3}/.test(ip);
	}

	function runIpCheck (ip) {
		var url = 'http://api.ipinfodb.com/v3/ip-city/?key='+apiKey+'&ip='+ip+'&format=json&callback=?';
		$.getJSON(url).done(function (data) {
			if(data.statusCode === "OK"){
				output.print('  country: ' + data.countryName + ' (' + data.countryCode + ')');
				output.print('   region: ' + data.regionName);
				output.print('     city: ' + data.cityName);
				output.print(' lat/long: ' + data.latitude + '/' + data.longitude);
			}
		});
	}

	var Command = function() {
	};
	Command.prototype.run = function(args) {
		var ip = args.join(" ");
		if(checkInputIp(ip)){
			runIpCheck(ip);
		} else {
			output.print('  - ip must be formatted like so: d{1,3}(.d{1,3}){3}');
		}
	};

	return Command;
});
