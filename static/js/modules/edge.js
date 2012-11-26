define(["modules/chat"], function(chat){

	var Edge = function( element ) {
		this.element = element;
		
		this.x = 0;
		this.y = 0;
		this.speedX = 0;
		this.speedY = 0;
		this.accelerationX = 0;
		this.accelerationY = 0;
		
		
		this.addEventListeners();

		this.addInterface();
	
		setInterval( this.update.bind( this ), 50);
	};
	
	Edge.prototype.addEventListeners = function() {
		var self = this;
		self.element.on( "click", ".edge-close-btn", this.destroy.bind( this ) );
		window.addEventListener("deviceorientation", function(e) {
			// gets the gyro position
			//self.log.append("gamma: " + e.gamma + ", beta: " + e.beta + "<br/>");
			//self.log.get(0).scrollTop = 1000000000;
			self.accelerationX = e.gamma;
			self.accelerationY = e.beta;
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

		// add close button
		//this.ball = $('<div class="edge-ball"></div>');
		this.element.append( this.ball );
	};
	
	Edge.prototype.destroy = function() {
		this.removeEventListeners();
		this.element.fadeOut(function() {
			this.element.remove();
		}.bind( this ))
	};
	
	Edge.prototype.update = function() {
		this.speedX += this.accelerationX;
		this.speedY += this.accelerationY;

		this.log.append("speedY: " + this.speedY + "<br/>");
		this.log.get(0).scrollTop = 1000000000;

		this.x += this.speedX / 3;
		this.y += this.speedY / 3;
		
		this.ball.css({
			top: this.y,
			left: this.x
		});
		
	};

	return Edge;
});