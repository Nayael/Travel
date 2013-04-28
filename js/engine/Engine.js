define(['./Body', './Map', './Physics', './View'], function(Body, Map, Physics, View) {
    var Engine     = {};
    Engine.Body    = Body;
    Engine.Map     = Map;
    Engine.Physics = Physics;
    Engine.View    = View;
    
    return Engine;
});