define(
	["modules/output"],
	function(output){

	var Command = function() {
	};
	Command.prototype.run = function(args) {
		if(args[0] == "--help"){
			output.print('-a    all')
			output.print('-o    OS name')
			output.print('-m    Machine')
			output.print('-p    Processor')
			output.print('-i    Hardware platform')
			output.print('-v    Kernel version')
			output.print('-r    Kernel release')
		}	
		else if(args.length > 0)
		{
			var uname = "";
			
			args.forEach(function(arg){
				var isAll = arg=="-a"
				
				if(arg=="-o" || isAll)
					uname += "xmas-console "
				if(arg=="-m" || isAll)
					uname += "sun4u "
				if(arg=="-p" || isAll)
					uname += "sparc "
				if(arg=="-i" || isAll)
					uname += "SUNW,Sun-Fire-V490 "
				if(arg=="-v" || isAll)
					uname += "Generic_142900-13 "
				if(arg=="-r" || isAll)
					uname += "5.10 "
			});

			if(uname == "")
				uname = "Unknown command"

			output.print(uname)
		}
		else
		{
			output.print("use --help to see available arguments")
		}
	};

	return Command;
});