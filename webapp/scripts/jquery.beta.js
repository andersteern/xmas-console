define("jquery.beta", function(){
	$.fn.beta = function() {
		return this.append('<p>Beta is Go!</p>');
	};

	return 'jquery.beta';
});

(function(define){
define("jquery.beta", 
	//["dep1", "dep2"], // a list of our dependencies
function(dep1, dep2){ // the arguments match up with our dependencies
 // the contents of our module
//  ...
  // what we return from our module
  return {
    someExportedFunction: function(){
		console.log("someExportedFunction")
	},
  }
});
})(typeof define=="function"?define:function(factory){module.exports=factory.apply(this, deps.map(require));});
