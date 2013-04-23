var requestAnimationFrame = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.oRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function(callback) {
        return window.setInterval(callback, 1000 / 60);
    };

window.cancelAnimationFrame = window.cancelAnimationFrame
    || window.mozCancelAnimationFrame
    || function(index) {
        window.clearInterval(index);
};

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
    if (window.cancelAnimationFrame) {
        window.cancelAnimationFrame(index);
        return;
    }
    if (window.mozCancelAnimationFrame) {   
        window.mozCancelAnimationFrame(index);
        return;
    }
    window.clearInterval(index);
}