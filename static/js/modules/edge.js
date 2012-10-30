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
		var self = this;
		self.element.on( "click", ".edge-close-btn", this.destroy.bind( this ) );
		window.addEventListener("deviceorientation", function(e) {
			// gets the gyro position
			self.speedX = e.gamma;
			self.speedY = e.beta;
		}, false);
		/*
		flat on table: x = 0, y = 0
		standing top up: x = 0, y = 90
		standing bottom up: x = 0, y = -90
		standing left side up: x = 90, y = 0
		standing right side up: x = -90, y = 0
		*/
	};

	Edge.prototype.removeEventListeners = function() {
		this.element.off( "click" );
	};

	Edge.prototype.addInterface = function() {
		// add logging area
		this.log = $('<div class="edge-log"></div>');
		this.element.append( this.log )

		// add close button
		this.element.append('<div class="edge-close-btn">I\'m done</div>');
	};
	
	Edge.prototype.destroy = function() {
		this.removeEventListeners();
		this.element.fadeOut(function() {
			this.element.remove();
		}.bind( this ))
	};
	
	Edge.prototype.update = function() {
		this.x = this.speedX;
		this.speedX = 0;
		this.y = this.speedY;
		this.speedY = 0;
		
		this.log.append("x: " + this.x + ", y: " + this.y + "<br/>");
		this.log.get(0).scrollTop = 1000000000;
		
	};

	return Edge;
});