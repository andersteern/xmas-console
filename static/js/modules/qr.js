define(["modules/output"], function(output){
	function display(msg) {
		var fullscreen = output.getFullscreenForegroundElement();
		fullscreen.append([
			'<div class="qr">',
				msg,
				'<div class="qr-img"></div>',
			'</div>'
		].join(''));
		
		$(".qr").click(function() {
			fullscreen.remove();
		});
	};

	return {
		display: display
	};
});