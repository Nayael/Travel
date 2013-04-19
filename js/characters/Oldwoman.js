// The Oldwoman class
(function() {
    var Oldwoman = function(x, y) {
        this.name  = 'oldwoman';
        this.x     = x || 0;
        this.y     = y || 0;
        this.realX = this.x + Game.map.scrollX;
        this.realY = this.y + Game.map.scrollY;
        this.speed = {
            x: 10,
            y: 55
        };
        this.maxSpeed = {
            x: 10,
            y: 55
        }
        this.controllable = false;

        this.body = new Game.Body(this, 1, 2);

        this.physics = new Game.Physics(this);

        this.state         = 'IDLE_RIGHT';
        this.previousState = 'IDLE_RIGHT';
        this.frame         = 0;
        this.useTileFade   = true;
    };

    /**
     * Called on each frame
     */
    Oldwoman.prototype.update = function() {
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

        Game.map.scroll(dX, dY);
    };

    /**
     * Renders the Oldwoman
     * @param  {Canvas2DContext} context The 2D context of the canvas to render in
     */
    Oldwoman.prototype.render = function(context) {
        switch (this.state) {
            case 'IDLE_RIGHT':
                context.drawImage(Game.images[this.name].idlerImage, 46 * this.frame, 0, 46, 71, this.x - 20, this.y - 5, 46, 71);
                if (Game.frameCount % 20 == 0) {
                    this.frame++;
                }
                if (this.frame >= 2) {
                    this.frame = 0;
                }
                break;

            case 'IDLE_LEFT':
                context.drawImage(Game.images[this.name].idlelImage, 46 * this.frame, 0, 46, 71, this.x - 12, this.y - 5, 46, 71);
                if (Game.frameCount % 20 == 0) {
                    this.frame++;
                }
                if (this.frame >= 2) {
                    this.frame = 0;
                }
                break;

            case 'WALK_R':
                context.drawImage(Game.images[this.name].walkrImage, 45 * (this.frame), 0, 45, 72, this.x - 12, this.y - 5, 45, 72);
                if (Game.frameCount % 8  == 0) {
                    this.frame++;
                }
                if (this.frame >= 6) {
                    this.frame = 0;
                }
                break;

            case 'WALK_L':
                context.drawImage(Game.images[this.name].walklImage, 45 * (this.frame), 0, 45, 72, this.x - 12, this.y - 5, 45, 72);
                if (Game.frameCount % 8 == 0) {
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
    Oldwoman.prototype.renderFX = function() {
        // if (Game.player == this) {
        //     Game.lighting1.light.position = new Game.Vec2(Game.player.x + Game.player.body.width / 2, Game.player.y + Game.player.body.height / 2);
        //     Game.darkmask.compute(Game.canvas.width, Game.canvas.height);
        //     Game.darkmask.render(Game.context);
        // }
    };

    /**
     * Applies the player's controls on the Oldwoman
     */
    Oldwoman.prototype.control = function() {
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

        if (Keyboard.isDown(Keyboard.ESCAPE)) {
            Game.Npc.leaveNpc(this);
        }
    };

    /**
     * Triggered when the character is being possessed
     */
    Oldwoman.prototype.onPossess = function() {
        var self = this;
        setTimeout(function() {
            self.controllable = true;
        }, Game.Npc.STUN_TIME);
        Game.map.autoScroll();
    };

    /**
     * Triggered when the character is being left
     */
    Oldwoman.prototype.onLeave = function() {
        if (this.state == 'IDLE_LEFT' || this.state == 'WALK_L') {
            this.state = 'IDLE_LEFT';
        } else{
            this.state = 'IDLE_RIGHT';
        }
    };

    Game.Oldwoman = Oldwoman;
})();