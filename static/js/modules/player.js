define(function(){
	var playlist = [];
	
	var Player = function(src) {
		
		this.element = $("<audio></audio>");
		this.element.appendTo(document.body);
		this.element.hide();
		
		if (src) {
			this.load(src)
		}
	};
	Player.prototype.loadPlaylist = function(callback) {
		if (playlist.length) {
			callback();
			return;
		}
		$.getJSON("/digi", function(data) {
			playlist = data;
			callback();
		});
		this.element.on("ended", this.nextRandom.bind(this));
	};
	Player.prototype.nextRandom = function() {
		if (playlist.length) {
			while (true) {
				for (key in playlist) {
					if (playlist.hasOwnProperty(key) && Math.random() < 0.01) {
						this.load(playlist[key]);
						this.play();
						return;
					}
				}
			}
		}
		else {
			this.loadPlaylist(this.nextRandom.bind(this));
		}
	};
	Player.prototype.load = function (src) {
		var key;
		if (src === "random") {
			this.nextRandom();
		}
		else {
			this.element.attr("src", src.replace(/(^\"|\"$)/g, ""));
		}
	};

	Player.prototype.play = function () {
		if (!this.element.attr("src")) {
			throw new Error("no source file loaded");
			return;
		}
		this.element.get(0).play();
	};
	Player.prototype.loop = function () {
		if (!this.element.attr("src")) {
			throw new Error("no source file loaded");
			return;
		}
		this.element.attr('loop','loop');
		this.element.get(0).play();
	};
	Player.prototype.pause = function () {
		this.element.get(0).pause();
	};
	Player.prototype.rewind = function () {
		this.element.get(0).currentTime = 0.01;
	};
	
	return Player;
});