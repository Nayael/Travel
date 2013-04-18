// The Woodsman class
(function() {
    var Woodsman = function(x, y) {
        this.name  = 'woodsman';
        this.x     = x || 0;
        this.y     = y || 0;
        this.realX = this.x + Game.map.scrollX;
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

        this.body = new Game.Body(this, 1, 3);

        this.physics = new Game.Physics(this);
        this.physics.jumpHeight = 20;

        this.state         = 'IDLE_RIGHT';
        this.previousState = 'IDLE_RIGHT';
        this.frame         = 0;
    };

    /**
     * Called on each frame
     */
    Woodsman.prototype.update = function() {
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

        // Preventing from getting out of the canvas
        if (Game.player == this) {
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
            } else if (this.y >= Game.CANVAS_HEIGHT - this.body.t_height * Game.map.TS + 20) {
                this.y = Game.CANVAS_HEIGHT - this.body.t_height * Game.map.TS + 20 - 1;
                this.physics.v.y = 0;
            }
        }

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
     * Renders the Woodsman
     * @param  {Canvas2DContext} context The 2D context of the canvas to render in
     */
    Woodsman.prototype.render = function(context) {
        switch (this.state) {
            case 'IDLE_RIGHT':
                context.drawImage(Game.images[this.name].idlerImage, 47 * this.frame, 0, 47, 108, this.x - 10, this.y - 6, 47, 108);
                if (Game.frameCount % 20 == 0) {
                    this.frame++;
                }
                if (this.frame >= 2) {
                    this.frame = 0;
                }
                break;

            case 'IDLE_LEFT':
                context.drawImage(Game.images[this.name].idlelImage, 47 * this.frame, 0, 47, 108, this.x - 12, this.y - 6, 47, 108);
                if (Game.frameCount % 20 == 0) {
                    this.frame++;
                }
                if (this.frame >= 2) {
                    this.frame = 0;
                }
                break;

            case 'WALK_R':
                context.drawImage(Game.images[this.name].idlerImage, 47 * this.frame, 0, 47, 108, this.x - 10, this.y - 6, 47, 108);
                if (Game.frameCount % 6  == 0) {
                    this.frame++;
                }
                if (this.frame >= 6) {
                    this.frame = 0;
                }
                break;

            case 'WALK_L':
                context.drawImage(Game.images[this.name].idlelImage, 47 * this.frame, 0, 47, 108, this.x - 12, this.y - 6, 47, 108);
                if (Game.frameCount % 6  == 0) {
                    this.frame++;
                }
                if (this.frame >= 6) {
                    this.frame = 0;
                }
                break;
        }
    };

    /**
     * Renders the special effect on the map
     */
    Woodsman.prototype.renderFX = function() {
        // if (Game.player == this) {
        //     Game.lighting1.light.position = new Game.Vec2(Game.player.x + Game.player.body.width / 2, Game.player.y + Game.player.body.height / 2);
        //     Game.darkmask.compute(Game.canvas.width, Game.canvas.height);
        //     Game.darkmask.render(Game.context);
        // }
    };

    /**
     * Applies the player's controls on the Woodsman
     */
    Woodsman.prototype.control = function() {
        this.previousState = this.state;
        if (!this.controllable) {
            return;
        }

        if (Keyboard.isDown(Keyboard.LEFT_ARROW)) {
            this.state = "WALK_L";
            this.physics.addForce(-this.speed.x, 0);
        }

        if (Keyboard.isDown(Keyboard.RIGHT_ARROW)) {
            this.state = "WALK_R";
            this.physics.addForce(this.speed.x, 0);
        }

        if (Keyboard.isUp(Keyboard.LEFT_ARROW) && Keyboard.isUp(Keyboard.RIGHT_ARROW) && (this.previousState == "WALK_R" || this.previousState == "IDLE_RIGHT")) {
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
    Woodsman.prototype.onPossess = function() {
        var self = this;
        setTimeout(function() {
            self.controllable = true;
        }, Game.Npc.STUN_TIME);
        Game.map.autoScroll();
    };

    /**
     * Triggered when the character is being left
     */
    Woodsman.prototype.onLeave = function() {
        if (this.state == 'IDLE_LEFT' || this.state == 'WALK_L') {
            this.state = 'IDLE_LEFT';
        } else{
            this.state = 'IDLE_RIGHT';
        }
    };

    /**
     * Makes the character jump
     * @return {[type]} [description]
     */
    Woodsman.prototype.jump = function() {
        this.physics.addJumpForce(-this.speed.y);
    };

    Game.Woodsman = Woodsman;
})();