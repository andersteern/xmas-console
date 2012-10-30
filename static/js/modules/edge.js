define(["modules/chat"], function(chat){

	var Edge = function( element ) {
		this.element = element;
		
		this.x = 0;
		this.y = 0;
		this.speedX = 0;
		this.speedY = 0;
		
		
		this.addEventListeners();

		this.addInterface();
	
		setInterval( this.update.bind( this ), 50);
	};
	
	Edge.prototype.addEventListeners = function() {
		chat.send("adding event listeners")
		var self = this;
		this.element.on( "click", ".close-btn", this.destroy.bind( this ) );
		$(window).on( "devicemotion" ,function (e) {
			console.log(e);
			try {
				self.speedX = e.accelerationIncludingGravity.x;
				self.speedY = e.accelerationIncludingGravity.y;
			}
			catch (e) {
				console.log("failed to read accelleration from event")
			}
		});
	};

	Edge.prototype.removeEventListeners = function() {
		this.element.off( "click" );
	};

	Edge.prototype.addInterface = function() {
		// add close button
		this.element.append('<div class="edge-close-btn">I\'m done</div>');
		
		// add logging area
		this.log = $('<div class="edge-log"></div>');
		this.element.append( this.log )
	};
	
	Edge.prototype.destroy = function() {
		this.removeEventListeners();
		this.element.fadeOut(function() {
			this.element.remove();
		}.bind( this ))
	};
	
	Edge.prototype.update = function() {
		this.x += this.speedX;
		this.speedX = 0;
		this.y += this.speedY;
		this.speedY = 0;
		
		self.log.append("x: " + this.x + "<br/>y: " + this.y);
		
	};

	return Edge;
});