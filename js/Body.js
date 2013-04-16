// The Body class for an entity
(function() {
    var Body = function(entity) {
        this.entity = entity;

        this.t_width  = 1;  // The width in tile unit
        this.t_height = 1;  // The height in tile unit
        this.elapsedPx = {
            x: 0,
            y: 0
        }
    };

    Body.prototype.collide = function(target) {
        var leftThis     = this.entity.x,
            rightThis    = this.entity.x + this.t_width * Game.map.TS,
            topThis      = this.entity.y,
            bottomThis   = this.entity.y + this.t_height * Game.map.TS,
            leftTarget   = target.x,
            rightTarget  = target.x + target.body.t_width * Game.map.TS,
            topTarget    = target.y,
            bottomTarget = target.y + target.body.t_height * Game.map.TS;
        return !(leftThis > rightTarget || leftTarget > rightThis || topThis > bottomTarget || topTarget > bottomThis);
    };

    Game.Body = Body;
})();