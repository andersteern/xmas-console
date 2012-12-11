define(['modules/chat', 'modules/output'], function(chat, output){

    var requestStr = "http://randomword.setgetgo.com/get.php";
    var Command = function() {
    };
    
    Command.prototype.run = function(args) {
        var wordCount = 1,
            readyCounter = 0;
            outputString = "";

        if(args[0] != "" && parseInt(args[0]) > 1) {
            wordCount = parseInt(args[0]);
        }

        for(var i = 0; i < wordCount; i++) {
            $.ajax({
                url: requestStr,
                dataType: "jsonp",
            }).done(function(data) {
                readyCounter++;

                if(readyCounter < wordCount) {
                    outputString += data.Word.replace(/(\r\n|\n|\r)/gm,"") + " ";
                } else {
                    outputString += data.Word.replace(/(\r\n|\n|\r)/gm,"");
                }

                if(readyCounter == wordCount) {
                    output.print(outputString);
                }
            });
        }
    };

    return Command;
});