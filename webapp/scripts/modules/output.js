define(function(){

	var output = function (htmlElement){
		this.htmlElement = htmlElement;
	};

	output.prototype.print = function(msg) {
		this.htmlElement.append('<p>'+msg+'</p>');
		
		var outputHeight = this.htmlElement.children().last().offset().top - this.htmlElement.children().first().offset().top;
		this.htmlElement.get(0).scrollTop = outputHeight;
	};

	output.prototype.getFullscreenBackgroundElement = function() {
		var element = $("<div class='fullscreen-backgound'></div>");
		element.appendTo("#background");
		return element;
	};
	output.prototype.getFullscreenForegroundElement = function() {
		var element = $("<div class='fullscreen-foreground'></div>");
		element.appendTo("#foreground");
		element.height($(window).height());
		return element;
	};

	return output;
});