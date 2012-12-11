define(['modules/output'], function(output){

	var Command = function() {
	};
	Command.prototype.run = function(args) {
        var d = new Date(),
            year = d.getFullYear(),
            month = d.getMonth() + 1,
            day = d.getDate(),
            dateString = "Today's date is: " + year + '/' + (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day,
            remainingDays = "Something is very strange...";

        var dhEvents = [
            [2013,6,15,"summer"],
            [2013,11,28,"winter"],
            [2014,6,14,"summer"],
            [2014,11,27,"winter"]
        ];

        if(d.getFullYear() > 2014) {
            remainingDays = "Didn't the world en in December 2012!?";
        } else {
            for(var i = 0; i < dhEvents.length; i++) {
                var numDays = daysUntil(dhEvents[i][0],dhEvents[i][1],dhEvents[i][2]);
                if(numDays > 0) {
                    remainingDays = "1337 Haxxing at the DreamHack " + dhEvents[i][3] + " event begins in " + numDays + " days.";
                    break;
                }
            }
        }

        output.print(dateString + ", " + remainingDays);

        function daysUntil(year, month, day) {
            var now = new Date(),
            dateEnd = new Date(year, month - 1, day), // months are zero-based
            days = (dateEnd - now) / 1000/60/60/24;   // convert milliseconds to days

            return Math.round(days);
        }
	};

	return Command;
});