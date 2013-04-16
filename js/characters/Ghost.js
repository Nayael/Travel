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

        this.state = "IDLE";
        this.previousState = "IDLE";
        this.frame = 0;
        this.elapsedPixels = 0;
        this.idleImage = new Image();
        this.walkrImage = new Image();
        this.walklImage = new Image();
        this.idleImage.src = "images/sprites/ghost_right.png";
        this.walkrImage.src = "images/sprites/ghost_right.png";
        this.walklImage.src = "images/sprites/ghost_left.png";
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
        context.globalAlpha = 0.5;
        switch (this.state){
            case "IDLE_RIGHT":
                context.drawImage(this.walkrImage, 35 * this.frame,0,35,67,this.x,this.y,35,67);
                if (Game.frameCount % 8 == 0)
                    this.frame++;
                if (this.frame == 8)
                    this.frame = 0;
                break;
            case "IDLE_LEFT":
                context.drawImage(this.walklImage, 35 * this.frame,0,35,67,this.x,this.y,35,67);
                if (Game.frameCount % 8 == 0)
                    this.frame++;
                if (this.frame == 8)
                    this.frame = 0;
                break;
            case "WALK_R":
                context.drawImage(this.walkrImage, 35 * (this.frame),0, 35,67,this.x,this.y,35,67);
                if (Game.frameCount % 8  == 0) {
                    this.frame++;
                }
                if (this.frame == 8)
                    this.frame = 0;
                break;
            case "WALK_L":
                context.drawImage(this.walklImage, 35 * (this.frame),0, 35,67,this.x,this.y,35,67);
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
        if (Keyboard.isDown(Keyboard.UP_ARROW)){
            this.physics.addForce(0, -this.speed.y)
        }

        if (Keyboard.isDown(Keyboard.DOWN_ARROW)){
            this.physics.addForce(0, this.speed.y)
        }

        if (Keyboard.isDown(Keyboard.LEFT_ARROW)) {
            this.state = "WALK_L";
            this.physics.addForce(-this.speed.x, 0);
        }
        if (Keyboard.isDown(Keyboard.RIGHT_ARROW)) {
            this.state = "WALK_R";
            this.physics.addForce(this.speed.x, 0);
        }

        if (Keyboard.isUp(Keyboard.LEFT_ARROW) && Keyboard.isUp(Keyboard.RIGHT_ARROW) && this.previousState == "WALK_R") {
            this.state = "IDLE_RIGHT";
        }

        if(Keyboard.isUp(Keyboard.LEFT_ARROW) && Keyboard.isUp(Keyboard.RIGHT_ARROW) && this.previousState == "WALK_L"){
            this.state = "IDLE_LEFT";
        }

        if(Keyboard.isUp(Keyboard.LEFT_ARROW) && Keyboard.isUp(Keyboard.RIGHT_ARROW) && this.previousState == "IDLE"){
            this.state = "IDLE_RIGHT";
        }

        if (Keyboard.isDown(Keyboard.SPACE) && this.physics.onFloor) {
            this.jump();
        }

        if (Keyboard.isDown(Keyboard.CTRL)) {
            this.takeControl();
        }

        if (this.previousState != this.state) {
            this.frame = 0;
        }
    };

    Ghost.prototype.jump = function() {
        this.physics.addForce(0, -this.speed.y);
    };

    /**
     * The ghost takes control of a NPC
     */
    Ghost.prototype.takeControl = function() {
        // Take control of the npc he is colliding
        for (var i = 0; i < Game.npcs.length; i++) {
            if (this.body.collide(Game.npcs[i])) {
                Game.Npc.possessNpc(i);
                break;
            }
        }
    };

    Game.Ghost = Ghost;
})();