define(["modules/output"],	function(output){

	var apiKey = 'cb094e6c41330d30a3ab3464519c8a0abdde848e37dd028acb06c85abe2000e5';

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