// The Character character class file
(function() {
    var Character = function() {
        this.x = (Game.CANVAS_WIDTH >> 1) + 70;
        this.realX = this.x + Game.map.scrollX;
        this.y = 0;
        this.realY = this.y + Game.map.scrollY;
        this.speed = {
            x: 200,
            y: 300
        };
        this.maxSpeed = {
            x: 250,
            y: 300
        }

        this.body = new Game.Body(this);
        this.body.t_width  = 1;  // The width in tile unit
        this.body.t_height = 1;  // The height in tile unit

        this.physics = new Game.Physics(this);
        this.physics.jumpHeight = 20;
        // this.physics.useGravity = false;
        // this.physics.useCollisions = false;
    };

    /**
     * Called on each frame
     */
    Character.prototype.update = function() {
        this.realX = this.x + Game.map.scrollX;
        this.realY = this.y + Game.map.scrollY;

        var realX0 = this.realX,
            realY0 = this.realY;

        this.physics.update();
                console.log('this.realY: ', this.realY);

        var dX = this.realX - realX0,
            dY = this.realY - realY0;

        this.x = this.realX - Game.map.scrollX;
        this.y = this.realY - Game.map.scrollY;
        // console.log('this.realY: ', this.realY);
        // console.log('this.y: ', this.y);

        if (!Game.map.scrollable) {
            return;
        }

        // X-axis scrolling
        if (dX > 0 && this.x > Game.map.scrollXMax) {
            this.x = Game.map.scrollXMax;
            Game.map.scrollX += dX;
        } else if (dX < 0 && this.x < Game.map.scrollXMin) {
            this.x = Game.map.scrollXMin;
            Game.map.scrollX += dX;
        }

        // Y-axis scrolling
        if (dY > 0 && this.y > Game.map.scrollYMax) {
            this.y = Game.map.scrollYMax;
            Game.map.scrollY += dY;
        } else if (dY < 0 && this.y < Game.map.scrollYMin) {
            this.y = Game.map.scrollYMin;
            Game.map.scrollY += dY;
        }
    };

    /**
     * Renders the character
     * @param  {Canvas2DContext} context The 2D context of the canvas to render in
     */
    Character.prototype.render = function(context) {
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
    Character.prototype.control = function() {
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

    Character.prototype.jump = function() {
        this.physics.addForce(0, -this.speed.y);
    };

    Game.Character = Character;
})();