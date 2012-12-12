define(function(){

	var element,
        lastUsedCommand = '';
	
	function create( htmlElement ) {
		element = htmlElement;
	}
	

	function scroll () {
		var firstOffset = element.children().first().offset();
		var lastOffset = element.children().last().offset();
		if (firstOffset && lastOffset) {
			var outputHeight = lastOffset.top - firstOffset.top;
			if (outputHeight > element.height() + 20) {
				element.parent().addClass("fullscreen-console");
			}
			element.get(0).scrollTop = 1000000000;
		}
	}

	function print( msg ) {
		element.append('<p><pre>'+msg+'</pre></p>');
		
		scroll();
	}

	function getPrintElement( ) {
		var el = $('<p></p>');
		element.append(el);
		return el;
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
	
	function slowPrint(msg, borderCharacter, speed) {
		if (borderCharacter) {
			borderCharacter = borderCharacter.substr(0,1);
		}
		if (typeof speed !== "number") {
			speed = 20;
		}
		var maxWidth = Math.floor(element.width()/parseInt(element.css("font-size"), 10)/.6);
		var characters = [];
		var width = 0;

		$.each(msg, function() { width = Math.max(width, this.length); });
		if (borderCharacter) {
			width += 4;
			width = Math.min(width, maxWidth);
			maxWidth -= 4;
		}

		function newline() {
			characters.push("<br/>");
		}
		function addRow() {
			for (var i = 0; i < width; i++) {
				characters.push(borderCharacter);
			}
			newline();
		}
		function spaces(nr) {
			while (nr-- > 0) {
				characters.push(" ");
			}
		}
		function padMsg(msg) {
			if (borderCharacter) {
				characters.push(borderCharacter);
				spaces(Math.floor((width-msg.length-2)/2))
			}
			$.each(msg.split(""), function() {
				characters.push(this);
			});
			if (borderCharacter) {
				spaces(Math.ceil((width-msg.length-2)/2))
				characters.push(borderCharacter);
			}
		}
		function addPaddedMessage(msg) {
			if (borderCharacter && maxWidth < msg.length) {
				var split = msg.lastIndexOf(" ", maxWidth);
				addPaddedMessage(msg.substr(0,split));
				addPaddedMessage(msg.substr(split+1, msg.length-split));
				return;
			}
			padMsg(msg);
			newline();
		}
		if (borderCharacter) {
			addRow();
		}
		$.each(msg, function() {
			addPaddedMessage(this);
		});
		if (borderCharacter) {
			addRow();
		}

        print('<span class="slowprint"></span>');
		var slowprintElement = $(".slowprint").last().get(0);
		var index = -1;
		var spaceCharacterRegex = new RegExp("[\ " + (borderCharacter ? borderCharacter : "") + "]");
		function printCharacter() {
			if (++index >= characters.length) {
				return 
			}
			var char = characters[index];
			slowprintElement.innerHTML += char;
			scroll();
			if (spaceCharacterRegex.test(char.toString())) {
				printCharacter();
			}
			else {
				setTimeout(printCharacter,speed);
			}
		}
		printCharacter();

	}

	return {
		create: create,
		print: print,
		getPrintElement: getPrintElement,
		clear: clear,
		scroll: scroll,
		getElement: getElement,
		getFullscreenForegroundElement: getFullscreenForegroundElement,
		getFullscreenBackgroundElement: getFullscreenBackgroundElement,
        setLastCommand: setLastCommand,
        getLastCommand: getLastCommand,
		slowPrint: slowPrint
	};
});