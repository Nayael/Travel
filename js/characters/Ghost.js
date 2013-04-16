// The Ghost character class file
(function() {
    var Ghost = function() {
        this.x = 0;
        this.realX = this.x + Game.map.scrollX;
        this.y = 0;
        this.realY = this.y + Game.map.scrollY;
        this.speed = {
            x: 300,
            y: 300
        };
        this.maxSpeed = {
            x: 350,
            y: 350
        }

        this.body = new Game.Body(this);
        this.body.t_width  = 1;  // The width in tile unit
        this.body.t_height = 2;  // The height in tile unit

        this.physics = new Game.GhostPhysics(this);
        this.physics.jumpHeight = 20;
        this.physics.useGravity = false;
        this.physics.useCollisions = false;
    };

    /**
     * Called on each frame
     */
    Ghost.prototype.update = function() {
        this.realX = this.x + Game.map.scrollX;
        this.realY = this.y + Game.map.scrollY;

        var realX0 = this.realX,
            realY0 = this.realY;

        this.physics.update();

        var dX = this.realX - realX0,
            dY = this.realY - realY0;

        this.x = this.realX - Game.map.scrollX;
        this.y = this.realY - Game.map.scrollY;

        // The Ghost can't get out of the canvas bounds
        if (this.x <= 0) {
            this.x = 1;
            this.physics.v.x = 0;
        } else if (this.x >= Game.CANVAS_WIDTH - this.body.t_width * Game.map.TS) {
            this.x = Game.CANVAS_WIDTH - this.body.t_width * Game.map.TS - 1;
            this.physics.v.x = 0;
        }
        if (this.y <= 0) {
            this.y = 1;
            this.physics.v.y = 0;
        } else if (this.y >= Game.CANVAS_HEIGHT - this.body.t_height * Game.map.TS) {
            this.y = Game.CANVAS_HEIGHT - this.body.t_height * Game.map.TS - 1;
            this.physics.v.y = 0;
        }

        if (!Game.map.scrollable) {
            return;
        }

        // X-axis scrolling
        if (dX > 0 && this.x >= Game.map.scrollXMax) {
            this.x = Game.map.scrollXMax - 1;
            Game.map.scrollX += dX;
        } else if (dX < 0 && this.x <= Game.map.scrollXMin) {
            this.x = Game.map.scrollXMin + 1;
            Game.map.scrollX += dX;
        }

        // Y-axis scrolling
        if (dY > 0 && this.y >= Game.map.scrollYMax) {
            this.y = Game.map.scrollYMax - 1;
            Game.map.scrollY += dY;
        } else if (dY < 0 && this.y <= Game.map.scrollYMin) {
            this.y = Game.map.scrollYMin + 1;
            Game.map.scrollY += dY;
        }
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
            this.physics.addForce(0, -this.speed.y);
        }
        if (Keyboard.isDown(Keyboard.DOWN_ARROW)) {
            this.physics.addForce(0, this.speed.y);
        }

        if (Keyboard.isDown(Keyboard.SPACE) && this.physics.onFloor) {
            this.jump();
        }

        if (Keyboard.isDown(Keyboard.CTRL)) {
            this.takeControl();
        }
    };

    Ghost.prototype.jump = function() {
        this.physics.addForce(0, -this.speed.y);
    };

    /**
     * The ghost takes control of a NPC
     */
    Ghost.prototype.takeControl = function() {
        
    };

    Game.Ghost = Ghost;
})();