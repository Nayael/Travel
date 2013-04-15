var requestAnimationFrame = window.requestAnimationFrame
	|| window.webkitRequestAnimationFrame
	|| window.mozRequestAnimationFrame
	|| window.oRequestAnimationFrame
	|| window.msRequestAnimationFrame
	|| function(callback) {
		window.setTimeout(callback, 1000 / 60);
	};
var Time = {
	time: null,
	deltaTime: null
};

function onEachFrame(cb) {
	var _cb = function() {
		cb();

		Time.time = Time.time || Date.now();
		var t = Date.now();
		Time.deltaTime = (t - Time.time) / 100;
		Time.time = t;
		
		requestAnimationFrame(_cb);
	};
	_cb();
};