define(['modules/chat', 'modules/output'], function(chat, output){

    var requestStr = "http://randomword.setgetgo.com/get.php";
    var Command = function() {
    };
    
    Command.prototype.run = function(args) {
        $.ajax({
            url: requestStr,
            dataType: "jsonp",
        }).done(function(data) {
            output.print(data.Word);
        })
    };

    return Command;
});