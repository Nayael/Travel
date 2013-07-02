(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }

    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }

    var requestAnimationFrameCallbacks = {};

    window.onEachFrame = function(cb, label, target) {
        var callback = cb;

        if (target != undefined) {
            callback = function() {
                cb.apply(target);
            }
        }

        var _cb = function() {
            callback();

            var anim = requestAnimationFrame(_cb);
            if (label) {
                requestAnimationFrameCallbacks[label] = anim;
            }
        };
        requestAnimationFrame(_cb);
    };

    window.onEachFrame.cancel = function(index) {
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

    // Initializing a global delta-time
    window.Time = {
        time: null,
        deltaTime: null
    };

    onEachFrame(function() {
        Time.time = Time.time || Date.now();
        var t = Date.now();
        Time.deltaTime = (t - Time.time) / 100;
        if (Time.deltaTime > 0.2) {
            Time.deltaTime = 0.2;
        }
        Time.time = t;
    });
}());