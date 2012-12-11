define(['modules/output'], function(output){

	var Command = function() {
	};
	Command.prototype.run = function(args) {
        var lastCommand = output.getLastCommand();

        if(lastCommand !== '') {
            switch(lastCommand) {
                case "cd":
                    output.print("CD is da shitz, stop harrasing me!");
                    break;

                case "del":
                case "delete":
                    output.print("Nahh, that's just stupid...");
                    break;

                case "format":
                    output.print("Can't really remember which drive you wanted to format, so I'm gonna go ahead and format C: for you :)");
                    output.print('Formatting C: (<span id="formatter">0</span>% done)');
                    var counter = 0;
                    (function update() {
                        setTimeout(function() {
                            if (counter++ < 100) {
                                $("#formatter").html(counter);
                                update();
                            } else {
                                $("#main").prepend(
                                    $("<div>", {id: "overlay"}).fadeIn(500)
                                );
                                setTimeout(function() {
                                   $("#overlay").remove();
                                }, 5000);
                            }
                        }, 70);
                    })();
                    break;

                default:
                    output.print("Me not find anz YES-question :(");
            }
        }
        output.setLastCommand('');
	};

	return Command;
});