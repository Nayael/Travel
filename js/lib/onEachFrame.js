(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

var Time = {
    time: null,
    deltaTime: null
};

var requestAnimationFrameCallbacks = {};

function onEachFrame(cb, label) {
    var _cb = function() {
        cb();

        Time.time = Time.time || Date.now();
        var t = Date.now();
        Time.deltaTime = (t - Time.time) / 100;
        Time.time = t;
        
        var anim = requestAnimationFrame(_cb);
        if (label) {
            requestAnimationFrameCallbacks[label] = anim;
        }
    };
    return _cb();
};

function cancelOnEachFrame(index) {
    if (typeof index == 'string') { // If the given index is a label, cancel the callback with the given label
        var label = index;
        index = requestAnimationFrameCallbacks[label];
        delete requestAnimationFrameCallbacks[label];
    }
    if (index == undefined) {
        return;
    }
    window.cancelAnimationFrame(index);
}