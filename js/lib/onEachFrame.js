(function() {

    ///////////////////////////////////////////////////////
    // Assuring compatibility with requestAnimationFrame //
    ///////////////////////////////////////////////////////
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

    /**
     * A list containing all the callbacks running on each frame that were registered with a name
     * @type {Object}
     */
    var requestAnimationFrameCallbacks = {};

    /**
     * Triggers a callback on each rendering frame
     * @param  {Function} cb     The callback to call on each frame
     * @param  {String}   label  The loop label. If not null, the callback will be registered, in a list, and cancellable with onEachFrame.cancel()
     * @param  {Object}   target The object to bind to the call on each frame (the "this"-object in the callback)
     */
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

    /**
     * Cancels an onEachFrame() loop
     * @param  {String} loopLabel The label of the loop to cancel
     * @return {[type]}       [description]
     */
    window.onEachFrame.cancel = function(loopLabel) {
        if (typeof loopLabel == 'string') { // If the given index is a label, cancel the callback with the given label
            var label = loopLabel;
            loopLabel = requestAnimationFrameCallbacks[label];
            delete requestAnimationFrameCallbacks[label];
        }
        if (loopLabel == undefined) {
            return;
        }
        window.cancelAnimationFrame(loopLabel);
    }

    // Initializing a global time/delta-time
    window.Time = {
        time: null,
        deltaTime: null
    };

    /**
     * Launching a callback to always update the passed time and delta-time
     */
    onEachFrame(function() {
        Time.time = Time.time || Date.now();
        var t = Date.now();
        Time.deltaTime = (t - Time.time) / 100;
        if (Time.deltaTime > 0.2) {
            Time.deltaTime = 0.2;
        }
        Time.time = t;
    });
})();