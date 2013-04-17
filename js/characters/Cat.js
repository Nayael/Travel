// The Cat class
(function() {
    var Cat = function(x, y) {
        this.name = 'cat';
        this.x = x || 0;
        this.realX = this.x + Game.map.scrollX;
        this.y = y || 0;
        this.realY = this.y + Game.map.scrollY;
        this.speed = {
            x: 30,
            y: 50
        };
        this.maxSpeed = {
            x: 30,
            y: 60
        }
        this.controllable = false;

        this.body = new Game.Body(this);
        this.body.t_width  = 1;  // The width in tile unit
        this.body.t_height = 1;  // The height in tile unit

        this.physics = new Game.Physics(this);
        this.physics.jumpHeight = 20;
    };

    /**
     * Called on each frame
     */
    Cat.prototype.update = function() {
        // The character scroll with the map if he is not controlled by the player
        if (this == Game.player && this.controllable) {
            this.realX = this.x + Game.map.scrollX;
            this.realY = this.y + Game.map.scrollY;
        }

        var realX0 = this.realX,
            realY0 = this.realY;

        this.physics.update();

        var dX = this.realX - realX0,
            dY = this.realY - realY0;

        this.x = this.realX - Game.map.scrollX;
        this.y = this.realY - Game.map.scrollY;

        if (this != Game.player || !this.controllable || !Game.map.scrollable) {
            return;
        }

        // X-axis scrolling
        if (dX > 0 && (this.x + this.body.width) > Game.map.scrollXMax) {
            this.x = Game.map.scrollXMax - this.body.width;
            Game.map.scrollX += dX;
        } else if (dX < 0 && this.x < Game.map.scrollXMin) {
            this.x = Game.map.scrollXMin;
            Game.map.scrollX += dX;
        }

        // Y-axis scrolling
        if (dY > 0 && this.y + this.body.height > Game.map.scrollYMax) {
            this.y = Game.map.scrollYMax - this.body.height;
            Game.map.scrollY += dY;
        } else if (dY < 0 && this.y < Game.map.scrollYMin) {
            this.y = Game.map.scrollYMin;
            Game.map.scrollY += dY;
        }
    };

    /**
     * Renders the cat
     * @param  {Canvas2DContext} context The 2D context of the canvas to render in
     */
    Cat.prototype.render = function(context) {
        for (var i = 0, j = 0; i < this.body.t_height; i++) {
            for (j = 0; j < this.body.t_width; j++) {
                context.fillStyle = 'rgb(0, 0, 255)';
                context.fillRect((this.x + j * Game.map.TS) | 0, (this.y + i * Game.map.TS) | 0, Game.map.TS, Game.map.TS);
            }
        }
    };

    /**
     * Applies the player's controls on the cat
     */
    Cat.prototype.control = function() {
        if (!this.controllable) {
            return;
        }
        if (Keyboard.isDown(Keyboard.LEFT_ARROW)) {
            this.physics.addForce(-this.speed.x, 0);
        }
        if (Keyboard.isDown(Keyboard.RIGHT_ARROW)) {
            this.physics.addForce(this.speed.x, 0);
        }

        if (Keyboard.isDown(Keyboard.SPACE) && this.physics.onFloor) {
            this.jump();
        }

        if (Keyboard.isDown(Keyboard.ESCAPE)) {
            Game.Npc.leaveNpc(this);
        }
    };

    /**
     * Triggered when the character is being possessed
     */
    Cat.prototype.onPossess = function() {
        var self = this;
        setTimeout(function() {
            self.controllable = true;
        }, Game.Npc.STUN_TIME);
        Game.map.scroll();
    };

    Cat.prototype.jump = function() {
        this.physics.addJumpForce(-this.speed.y);
    };

    Game.Cat = Cat;
})();