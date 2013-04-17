// The Ghost character class file
(function() {
    var Ghost = function(x, y) {
        this.name = 'ghost';
        this.x = x || 0;
        this.realX = this.x + Game.map.scrollX;
        this.y = y || 0;
        this.realY = this.y + Game.map.scrollY;
        this.speed = {
            x: 15,
            y: 15
        };
        this.maxSpeed = {
            x: 20,
            y: 20
        }
        this.controllable = true;

        this.body = new Game.Body(this, 1, 2);

        this.physics               = new Game.Physics(this);
        this.physics.jumpHeight    = 90;
        this.physics.useGravity    = false;
        this.physics.useCollisions = false;

        this.state          = "IDLE";
        this.previousState  = "IDLE";
        this.frame          = 0;
    };

    /**
     * Called on each frame
     */
    Ghost.prototype.update = function() {
        if (this.previousState != this.state) {
            this.frame = 0;
        }

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
        // context.fillStyle = 'rgb(255, 0, 0)';
        // context.fillRect(this.x, this.y, this.body.width, this.body.height);
        context.globalAlpha = 0.5;
        switch (this.state){
            case "IDLE_RIGHT":
                context.drawImage(Game.images.ghost.walkrImage, 35 * this.frame,0,35,67,this.x,this.y,35,67);
                if (Game.frameCount % 8 == 0)
                    this.frame++;
                if (this.frame == 8)
                    this.frame = 0;
                break;
            case "IDLE_LEFT":
                context.drawImage(Game.images.ghost.walklImage, 35 * this.frame,0,35,67,this.x,this.y,35,67);
                if (Game.frameCount % 8 == 0)
                    this.frame++;
                if (this.frame == 8)
                    this.frame = 0;
                break;
            case "WALK_R":
                context.drawImage(Game.images.ghost.walkrImage, 35 * (this.frame),0, 35,67,this.x,this.y,35,67);
                if (Game.frameCount % 8  == 0) {
                    this.frame++;
                }
                if (this.frame == 8)
                    this.frame = 0;
                break;
            case "WALK_L":
                context.drawImage(Game.images.ghost.walklImage, 35 * (this.frame),0, 35,67,this.x,this.y,35,67);
                if (Game.frameCount % 8  == 0) {
                    this.frame++;
                }
                if (this.frame == 8) {
                    this.frame = 0;
                }
                break;
        }
        context.globalAlpha = 1;
    };

    /**
     * Applies the player's controls on the character
     */
    Ghost.prototype.control = function() {
        this.previousState = this.state;
        if (this.controllable && Keyboard.isDown(Keyboard.UP_ARROW)) {
            this.physics.addForce(0, -this.speed.y)
        }

        if (this.controllable && Keyboard.isDown(Keyboard.DOWN_ARROW)) {
            this.physics.addForce(0, this.speed.y)
        }

        if (this.controllable && Keyboard.isDown(Keyboard.LEFT_ARROW)) {
            this.state = "WALK_L";
            this.physics.addForce(-this.speed.x, 0);
        }

        if (this.controllable && Keyboard.isDown(Keyboard.RIGHT_ARROW)) {
            this.state = "WALK_R";
            this.physics.addForce(this.speed.x, 0);
        }

        if (Keyboard.isUp(Keyboard.LEFT_ARROW) && Keyboard.isUp(Keyboard.RIGHT_ARROW) && (this.previousState == "WALK_R" || this.previousState == "IDLE")) {
            this.state = "IDLE_RIGHT";
        }

        if (Keyboard.isUp(Keyboard.LEFT_ARROW) && Keyboard.isUp(Keyboard.RIGHT_ARROW) && this.previousState == "WALK_L") {
            this.state = "IDLE_LEFT";
        }

        if (this.controllable && Keyboard.isDown(Keyboard.CTRL)) {
            this.takeControl();
        }
    };

    /**
     * The ghost takes control of a NPC
     */
    Ghost.prototype.takeControl = function() {
        // Take control of the npc he is colliding
        for (var npc in Game.npcs) {
            if (Game.npcs.hasOwnProperty(npc) && this.body.collide(Game.npcs[npc])) {
                Game.Npc.possessNpc(npc);
                break;
            }
        }
    };

    /**
     * Triggered when the character is being possessed
     */
    Ghost.prototype.onPossess = function() {
        var self = this;
        setTimeout(function() {
            self.controllable = true;
        }, Game.Npc.STUN_TIME);
        Game.map.scrollable = false;
    };

    Game.Ghost = Ghost;
})();