// The Body class for an entity
(function() {
    var Body = function(entity, t_width, t_height) {
        this.entity = entity;

        this.t_width  = t_width || 1;  // The width in tile unit
        this.t_height = t_height || 1;  // The height in tile unit
        this.width    = this.t_width * Game.map.TS;  // The width in pixles
        this.height   = this.t_height * Game.map.TS;  // The height in pixels
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

    Body.prototype.tileCollide = function(tileX, tileY) {
        var leftThis   = this.entity.realX,
            rightThis  = this.entity.realX + this.width,
            topThis    = this.entity.realY,
            bottomThis = this.entity.realY + this.height,
            leftTile   = tileX * Game.map.TS,
            rightTile  = leftTile + Game.map.TS,
            topTile    = tileY * Game.map.TS,
            bottomTile = topTile + Game.map.TS;
        return !(leftThis > rightTile || leftTile > rightThis || topThis > bottomTile || topTile > bottomThis);
    };

    Game.Body = Body;
})();