// The Cat class
(function() {
    var Cat = function(x, y) {
        this.name = 'cat';
        this.x = x || 0;
        this.realX = this.x + Game.map.scrollX;
        this.y = y || 0;
        this.realY = this.y + Game.map.scrollY;
        this.speed = {
            x: 20,
            y: 55
        };
        this.maxSpeed = {
            x: 30,
            y: 55
        }
        this.controllable = false;

        this.body = new Game.Body(this);
        this.body.t_width  = 1;  // The width in tile unit
        this.body.t_height = 1;  // The height in tile unit

        this.physics = new Game.Physics(this);
        this.physics.jumpHeight = 20;

        this.state          = "IDLE_RIGHT";
        this.previousState  = "IDLE_RIGHT";
        this.frame          = 0;
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
        switch (this.state){
            case "IDLE_RIGHT":
                context.drawImage(Game.images[this.name].idlerImage, 35 * this.frame,0,35,34,this.x,this.y,35,34);
                if (Game.frameCount % 15 == 0)
                    this.frame++;
                if (this.frame == 4)
                    this.frame = 0;
                break;
            case "IDLE_LEFT":
                context.drawImage(Game.images[this.name].idlelImage, 35 * this.frame,0,35,34,this.x,this.y,35,34);
                if (Game.frameCount % 15 == 0)
                    this.frame++;
                if (this.frame == 4)
                    this.frame = 0;
                break;
            case "WALK_R":
                context.drawImage(Game.images[this.name].walkrImage, 44 * (this.frame),0, 44,35,this.x,this.y,44,35);
                if (Game.frameCount % 6  == 0) {
                    this.frame++;
                }
                if (this.frame == 5)
                    this.frame = 0;
                break;
            case "WALK_L":
                context.drawImage(Game.images[this.name].walklImage, 44 * (this.frame),0, 44,35,this.x,this.y,44,35);
                if (Game.frameCount % 6  == 0) {
                    this.frame++;
                }
                if (this.frame == 5) {
                    this.frame = 0;
                }
                break;
        }
    };

    /**
     * Renders the special effect on the map
     */
    Cat.prototype.renderFX = function() {
        if (Game.player == this) {
            Game.lighting1.light.position = new Game.Vec2(Game.player.x + Game.player.body.width / 2, Game.player.y + Game.player.body.height / 2);
            Game.darkmask.compute(Game.canvas.width, Game.canvas.height);
            Game.darkmask.render(Game.context);
        }
    };

    /**
     * Applies the player's controls on the cat
     */
    Cat.prototype.control = function() {
        this.previousState = this.state;
        if (!this.controllable) {
            return;
        }
        if (Keyboard.isDown(Keyboard.LEFT_ARROW)) {
            this.state = "WALK_L";
            this.physics.addForce(-this.speed.x, 0);
            console.log(this.state);
        }
        if (Keyboard.isDown(Keyboard.RIGHT_ARROW)) {
            this.state = "WALK_R";
            this.physics.addForce(this.speed.x, 0);
            console.log(this.state);
        }
        if (Keyboard.isUp(Keyboard.LEFT_ARROW) && Keyboard.isUp(Keyboard.RIGHT_ARROW) && (this.previousState == "WALK_R" || this.previousState == "IDLE")) {
            this.state = "IDLE_RIGHT";
        }

        if (Keyboard.isUp(Keyboard.LEFT_ARROW) && Keyboard.isUp(Keyboard.RIGHT_ARROW) && this.previousState == "WALK_L") {

            this.state = "IDLE_LEFT";

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
        Game.Sound.startBGM(this.name);
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