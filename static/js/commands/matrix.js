define(["modules/output"], function(output){

	var Command = function() {
	};	

	var SetAbsPos = function(element, top, left){
		$(element).attr('style','position:absolute;left: ' + left + 'px;top:' + top +'px;');
	};

	Command.prototype.run = function(args) {
		var outputElement = output.getElement();

		var pres = $(outputElement).find('pre');

		var elements = [];
		var width = $(outputElement).width();			

		for(var i = 0; i < pres.length; i++){	
			var words = $(pres[i]).text().split(' ');
			
			for(var j = 0; j < words.length; j++){

				var left = Math.floor(Math.random()*width);
				var word = document.createElement('pre');
				$(word).html(words[j]);

				SetAbsPos(word, -20, left);
				outputElement.append(word);

				var e = {
					element: word,
					top: -20,
					left: left
				};

				elements.push(e);
			}

			$(pres[i]).text($(pres[i]).text().replace(/./g, " "));
		}		

		var intervalHandle = setInterval(function() {

		    var randindex = Math.floor(Math.random()*elements.length);
			randelem = elements[randindex];

			var speed = Math.floor(Math.random()*50);

			randelem.top = randelem.top + speed;

			if(randelem.top > window.innerHeight){
				clearInterval();

				$.each(elements, function(){
					var el = this.element;

					$(el).remove();
				});				

				return;
			}

			var htmlelem = randelem.element;
			SetAbsPos(htmlelem, randelem.top, randelem.left);
		}, 10);		
		
		output.print("Does it rain?");
	};

	return Command;
});