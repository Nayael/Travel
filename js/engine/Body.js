// The Body class for an entity
define(function() {
    var Body = function(entity, t_width, t_height, ts) {
        this.entity = entity;

        var width  = t_width * ts;  // The width in pixels
        var height = t_height * ts; // The height in pixels

        ////////////
        // GETTERS / SETTERS
        // 
        this.getWidth = function() {
            return width;
        };

        this.getHeight = function() {
            return height;
        };

        this.getTWidth = function() {
            return t_width;
        };

        this.getTHeight = function() {
            return t_height;
        };

        this.setWidth = function(value) {
            width = value;
            t_width = width / ts;
        };

        this.setHeight = function(value) {
            height = value;
            t_height = height / ts;
        };

        this.setTWidth = function(value) {
            t_width = value;
            width = t_width * ts;
        };

        this.setTHeight = function(value) {
            t_height = value;
            height = t_height * ts;
        };
    };

    Body.prototype.collide = function(target) {
        var leftThis     = this.entity.x,
            rightThis    = this.entity.x + this.getWidth();
            topThis      = this.entity.y,
            bottomThis   = this.entity.y + this.getHeight();
            leftTarget   = target.x,
            rightTarget  = target.x + target.body.getWidth();
            topTarget    = target.y,
            bottomTarget = target.y + target.body.getHeight();
        return !(leftThis > rightTarget || leftTarget > rightThis || topThis > bottomTarget || topTarget > bottomThis);
    };

    Body.prototype.tileCollide = function(tileX, tileY, ts) {
        var leftThis   = this.entity.realX,
            rightThis  = this.entity.realX + this.getWidth(),
            topThis    = this.entity.realY,
            bottomThis = this.entity.realY + this.getHeight(),
            leftTile   = tileX * ts,
            rightTile  = leftTile + ts,
            topTile    = tileY * ts,
            bottomTile = topTile + ts;
        return !(leftThis > rightTile || leftTile > rightThis || topThis > bottomTile || topTile > bottomThis);
    };

    return Body;
});