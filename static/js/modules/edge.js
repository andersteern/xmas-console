define(["modules/chat"], function(chat){

	var maxSpeed = 300,
		friction = 0.9,
		maxX = $(window).width() - 10,
		maxY = $(window).height() - 10;

	function constrain(value, min, max) {
		var constrainedValue = Math.max(value, min);
		constrainedValue = Math.min(constrainedValue, max);
		return constrainedValue;
	}
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
			self.accelerationX = e.gamma < 0 ? -90 + Math.abs(e.gamma + 90) : 90 - Math.abs(e.gamma - 90);
			self.accelerationY = e.beta < 0  ? -90 + Math.abs(e.beta + 90)  : 90 - Math.abs(e.beta - 90);
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
		this.ball = $('<div class="edge-ball"></div>');
		this.element.append( this.ball );
	};
	
	Edge.prototype.destroy = function() {
		this.removeEventListeners();
		this.element.fadeOut(function() {
			this.element.remove();
		}.bind( this ))
	};
	
	Edge.prototype.update = function() {
		this.speedX = Math.floor(constrain(this.speedX + this.accelerationX, -maxSpeed, maxSpeed) * friction);
		this.speedY = Math.floor(constrain(this.speedY + this.accelerationY, -maxSpeed, maxSpeed) * friction);

		this.x = constrain(this.x + this.speedX / 10, 0, maxX);
		this.y = constrain(this.y + this.speedY / 10, 0, maxY);
		
		// bounce?
		if (this.x === 0) {         this.speedX =  Math.abs(this.speedX); }
		else if (this.x === maxX) { this.speedX = -Math.abs(this.speedX); }
		else if (this.y === 0) {    this.speedY =  Math.abs(this.speedY); }
		else if (this.y === maxY) { this.speedY = -Math.abs(this.speedY); }
		
		this.ball.css({
			top: Math.round(this.y),
			left: Math.round(this.x)
		});
	};

	return Edge;
});