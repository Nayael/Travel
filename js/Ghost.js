// The Ghost character class file
(function() {
    var Ghost = function() {
        this.x = (Game.CANVAS_WIDTH >> 1) + 70;
        this.y = 0;
        this.speed = {
            x: 50,
            y: 50
        };
        this.maxSpeed = {
            x: 100,
            y: 100
        }

        this.body = new Game.Body(this);
        this.body.t_width  = 1;  // The width in tile unit
        this.body.t_height = 2;  // The height in tile unit

        this.physics = new Game.Physics(this);
        this.physics.jumpHeight = 20;
        // this.physics.useGravity = false;
        // this.physics.useCollisions = false;
    };

    /**
     * Called on each frame
     */
    Ghost.prototype.update = function() {
        this.physics.update();
    };

    /**
     * Renders the character
     * @param  {Canvas2DContext} context The 2D context of the canvas to render in
     */
    Ghost.prototype.render = function(context) {
///////////////
// TEMPORARY //
///////////////
        for (var i = 0, j = 0; i < this.body.t_height; i++) {
            for (j = 0; j < this.body.t_width; j++) {
                context.fillStyle = 'rgb(0, 0, 255)';
                context.fillRect((this.x + j * Game.map.TS) | 0, (this.y + i * Game.map.TS) | 0, Game.map.TS, Game.map.TS);
            }
        }
    };

    /**
     * Applies the player's controls on the character
     */
    Ghost.prototype.control = function() {
        if (Keyboard.isDown(Keyboard.LEFT_ARROW)) {
            this.physics.addForce(-this.speed.x, 0);
        }
        if (Keyboard.isDown(Keyboard.RIGHT_ARROW)) {
            this.physics.addForce(this.speed.x, 0);
        }
        if (Keyboard.isDown(Keyboard.UP_ARROW)) {
            // this.physics.addForce(0, -this.speed.y);
        }
        if (Keyboard.isDown(Keyboard.DOWN_ARROW)) {
            // this.physics.addForce(0, this.speed.y);
        }

        if (Keyboard.isDown(Keyboard.SPACE) && this.physics.onFloor) {
            this.jump();
        }
    };

    Ghost.prototype.jump = function() {
        this.physics.addForce(0, -500);
    };

    Game.Ghost = Ghost;
})();