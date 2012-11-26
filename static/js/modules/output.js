define(function(){

	var element,
        lastUsedCommand = '';
	
	function create( htmlElement ) {
		element = htmlElement;
	}
	

	function print( msg ) {
		element.append('<p><pre>'+msg+'</pre></p>');
		
		var outputHeight = element.children().last().offset().top - element.children().first().offset().top;
		if (outputHeight > element.height() + 20) {
			element.parent().addClass("fullscreen-console")
		}
		element.get(0).scrollTop = 1000000000;
	}
	
	function clear( ) {
		element.html("");
	}

	function getFullscreenBackgroundElement( ) {
		var element = $("<div class='fullscreen-backgound'></div>");
		element.appendTo("#background");
		return element;
	}
	function getFullscreenForegroundElement( ) {
		var element = $("<div class='fullscreen-foreground'></div>");
		element.appendTo("#foreground");
		element.height($(window).height());
		return element;
	}
	function getElement() {
		return element;
	}

    function setLastCommand(command) {
        lastUsedCommand = command;
    }

    function getLastCommand() {
        return lastUsedCommand;
    }

	return {
		create: create,
		print: print,
		clear: clear,
		getElement: getElement,
		getFullscreenForegroundElement: getFullscreenForegroundElement,
		getFullscreenBackgroundElement: getFullscreenBackgroundElement,
        setLastCommand: setLastCommand,
        getLastCommand: getLastCommand
	};
});