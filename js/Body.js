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

    Game.Body = Body;
})();