define(['modules/chat', 'modules/output'], function(chat, output){

    var requestStr = "http://randomword.setgetgo.com/get.php";
    var Command = function() {
    };
    
    Command.prototype.run = function(args) {
        var apiKey = "76744c98a38747fd2396327c1691d8c52669161c55b7b49fe";
console.log(args[0]);
        if(args[0] && args[0] != "-r") {
            LookUpWord(args[0]);
        } else if(args[0] && args[0] == "-r") {
            $.ajax({
                url: requestStr,
                dataType: "jsonp",
            }).done(function(data) {
                if(data.Word != "") {
                    LookUpWord(data.Word.replace(/(\r\n|\n|\r)/gm,""));
                }
            });
        } else {
            output.print("Please enter a word or -r for a random word.");
        }

        function LookUpWord(word) {
            var apiUrl = "http://api.wordnik.com/v4/word.json/"+word+"/definitions?api_key="+apiKey;

            $.ajax({
                url: apiUrl,
                dataType: "jsonp",
            }).done(function(data) {
                output.print(word +": "+ data[0].text);
            });
        }
    };

    return Command;
});