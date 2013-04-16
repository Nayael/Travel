// The Cat class
(function() {
    var Cat = function() {
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
    };

    /**
     * Called on each frame
     */
    Cat.prototype.update = function() {
        this.realX = this.x + Game.map.scrollX;
        this.realY = this.y + Game.map.scrollY;

        var realX0 = this.realX,
            realY0 = this.realY;

        this.physics.update();

        var dX = this.realX - realX0,
            dY = this.realY - realY0;

        this.x = this.realX - Game.map.scrollX;
        this.y = this.realY - Game.map.scrollY;

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

    Cat.prototype.jump = function() {
        this.physics.addForce(0, -this.speed.y);
    };

    Game.Cat = Cat;
})();