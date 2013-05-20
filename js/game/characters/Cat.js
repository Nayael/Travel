// The Cat class
define(['Engine', 'StateMachine', 'Keyboard', 'inheritance', 'game/characters/Character', 'game/characters/Npc'],

function(Engine, StateMachine, Keyboard, inherits, Character, Npc) {

    /**
     * @constructor
     * @param {integer} x       The x position
     * @param {integer} y       The y position
     * @param {integer} ts      The map's tile size
     * @param {Object} sprites  The sprites for this character
     */
    var Cat = function(x, y, ts, sprites) {
        this.parent.constructor.apply(this, arguments);
        this.name = 'cat';

        this.speed = {
            x: 20,
            y: 55
        };
        this.maxSpeed = {
            x: 20,
            y: 55
        }

        // Body
        this.body = new Engine.Body(this, 1, 1, ts);

        // Physics
        this.physics = new Engine.Physics(this);
        this.physics.jumpHeight = 20;

        // View
        this.initFSM();
        this.fsm.turnRight();
    };
    Cat.inheritsFrom(Character);

    // Constants
    Cat.IDLE_LEFT     = 'CAT_IDLE_LEFT';
    Cat.IDLE_RIGHT    = 'CAT_IDLE_RIGHT';
    Cat.WALKING_RIGHT = 'CAT_WALKING_RIGHT';
    Cat.WALKING_LEFT  = 'CAT_WALKING_LEFT';
    Cat.JUMPING_LEFT  = 'CAT_JUMPING_LEFT';
    Cat.JUMPING_RIGHT = 'CAT_JUMPING_RIGHT';
    Cat.FALLING_LEFT  = 'CAT_FALLING_LEFT';
    Cat.FALLING_RIGHT = 'CAT_FALLING_RIGHT';

    /**
     * Creates the State Machine
     */
    Cat.prototype.initFSM = function() {
        this.fsm = StateMachine.create({
            initial: Cat.IDLE_RIGHT,
            error: function(eventName, from, to, args, errorCode, errorMessage) {
                console.log('Error # ' + errorCode + ' on event ' + eventName + '. From [' + from + '] to [' + to + '] : ' + errorMessage + ' (' + args + ')');
            },
            events: [{
                    name: 'turnLeft',
                    from: [Cat.IDLE_LEFT, Cat.WALKING_LEFT, Cat.JUMPING_LEFT, Cat.FALLING_LEFT],
                    to: Cat.IDLE_LEFT
                }, {
                    name: 'turnRight',
                    from: [Cat.IDLE_RIGHT, Cat.WALKING_RIGHT, Cat.JUMPING_RIGHT, Cat.FALLING_RIGHT],
                    to: Cat.IDLE_RIGHT
                }, {
                    name: 'walkLeft',
                    from: [Cat.IDLE_LEFT, Cat.IDLE_RIGHT, Cat.WALKING_LEFT, Cat.WALKING_RIGHT, Cat.JUMPING_LEFT, Cat.JUMPING_RIGHT, Cat.FALLING_LEFT, Cat.FALLING_RIGHT],
                    to: Cat.WALKING_LEFT
                }, {
                    name: 'walkRight',
                    from: [Cat.IDLE_LEFT, Cat.IDLE_RIGHT, Cat.WALKING_LEFT, Cat.WALKING_RIGHT, Cat.JUMPING_LEFT, Cat.JUMPING_RIGHT, Cat.FALLING_LEFT, Cat.FALLING_RIGHT],
                    to: Cat.WALKING_RIGHT
                }, {
                    name: 'jumpLeft',
                    from: [Cat.IDLE_LEFT, Cat.IDLE_RIGHT, Cat.WALKING_LEFT, Cat.WALKING_RIGHT],
                    to: Cat.JUMPING_LEFT
                }, {
                    name: 'jumpRight',
                    from: [Cat.IDLE_LEFT, Cat.IDLE_RIGHT, Cat.WALKING_LEFT, Cat.WALKING_RIGHT],
                    to: Cat.JUMPING_RIGHT
                }, {
                    name: 'fallRight',
                    from: [Cat.IDLE_LEFT, Cat.IDLE_RIGHT, Cat.WALKING_LEFT, Cat.WALKING_RIGHT, Cat.JUMPING_LEFT, Cat.JUMPING_RIGHT, Cat.FALLING_LEFT, Cat.FALLING_RIGHT],
                    to: Cat.FALLING_LEFT
                }, {
                    name: 'fallRight',
                    from: [Cat.IDLE_LEFT, Cat.IDLE_RIGHT, Cat.WALKING_LEFT, Cat.WALKING_RIGHT, Cat.JUMPING_LEFT, Cat.JUMPING_RIGHT, Cat.FALLING_LEFT, Cat.FALLING_RIGHT],
                    to: Cat.FALLING_RIGHT
                }
            ]
        });
        this.fsm.subject = this;

        this.fsm.onturnLeft = function(e) {
            this.subject.view = new Engine.View(this.subject, {
                sprite: this.subject.sprites.idleLSprite,
                localX: 0,
                localY: 0,
                width: 35,
                height: 34,
                totalFrames: 4,
                frameRate: 80
            });
        };

        this.fsm.onturnRight = function(e) {
            this.subject.view = new Engine.View(this.subject, {
                sprite: this.subject.sprites.idleRSprite,
                localX: 0,
                localY: 0,
                width: 35,
                height: 34,
                totalFrames: 4,
                frameRate: 80
            });
        };

        this.fsm.onwalkLeft = function(e) {
            this.subject.view = new Engine.View(this.subject, {
                sprite: this.subject.sprites.walkLSprite,
                localX: 0,
                localY: 0,
                width: 35,
                height: 34,
                totalFrames: 5,
                frameRate: 80
            });
        };

        this.fsm.onwalkRight = function(e) {
            this.subject.view = new Engine.View(this.subject, {
                sprite: this.subject.sprites.walkRSprite,
                localX: 0,
                localY: 0,
                width: 35,
                height: 34,
                totalFrames: 5,
                frameRate: 80
            });
        };

        this.fsm.onjumpLeft = function(e) {
            this.subject.view = new Engine.View(this.subject, {
                sprite: this.subject.sprites.jumpLSprite,
                localX: 0,
                localY: 0,
                width: 61,
                height: 42,
                totalFrames: 8,
                frameRate: 80
            });
        };

        this.fsm.onjumpRight = function(e) {
            this.subject.view = new Engine.View(this.subject, {
                sprite: this.subject.sprites.jumpRSprite,
                localX: 0,
                localY: 0,
                width: 61,
                height: 42,
                totalFrames: 8,
                frameRate: 80
            });
        };

        this.fsm.onfallLeft = function(e) {
            this.subject.view = new Engine.View(this.subject, {
                sprite: this.subject.sprites.jumpLSprite,
                localX: 0,
                localY: 0,
                width: 35,
                height: 34,
                totalFrames: 5,
                frameRate: 80
            });
        };

        this.fsm.onfallRight = function(e) {
            this.subject.view = new Engine.View(this.subject, {
                sprite: this.subject.sprites.jumpRSprite,
                localX: 0,
                localY: 0,
                width: 35,
                height: 34,
                totalFrames: 5,
                frameRate: 80
            });
        };
    };

    /**
     * Called on each frame
     */
    Cat.prototype.update = function(map, canvasWidth, canvasHeight) {
        // The character scroll with the map if he is not controlled by the player
        if (this.isPlayer && this.controllable) {
            this.realX = this.x + map.scrollX;
            this.realY = this.y + map.scrollY;
        }

        var realX0 = this.realX,
            realY0 = this.realY;

        // Preventing from getting out of the canvas
        if (this.isPlayer) {
            this.body.limitToBounds = true;
        } else {
            this.body.limitToBounds = false;
        }

        this.parent.update.apply(this, arguments);

        // Update the state
        // if (this.realX < realX0 && !this.fsm.is(Cat.JUMPING_LEFT) && !this.fsm.is(Cat.FALLING_LEFT)) {
        //     this.fsm.walkLeft();
        // }

        // if (this.realX > realX0 && !this.fsm.is(Cat.JUMPING_RIGHT) && !this.fsm.is(Cat.FALLING_RIGHT)) {
        //     this.fsm.walkRight();
        // }

        // if (this.physics.onFloor && this.realX == realX0) {
        //     if (this.fsm.is(Cat.WALK_RIGHT) || this.fsm.is(Cat.IDLE_RIGHT) || this.fsm.is(Cat.FALLING_RIGHT) || this.fsm.is(Cat.JUMPING_RIGHT)) {
        //         this.fsm.turnRight();
        //     } else {
        //         this.fsm.turnLeft();
        //     }
        // }

        // if (!this.physics.onFloor && this.physics.jumpForces.length > 0 && !this.fsm.is(Cat.JUMPING_RIGHT) && (this.fsm.is(Cat.IDLE_RIGHT) || this.fsm.is(Cat.WALK_RIGHT))) {
        //     this.fsm.jumpRight();
        // } else if (!this.physics.onFloor && this.physics.jumpForces.length == 0 && (this.fsm.is(Cat.IDLE_RIGHT) || this.fsm.is(Cat.WALK_RIGHT))) {
        //     this.fsm.fallRight();
        // }

        // if (!this.physics.onFloor && this.physics.jumpForces.length > 0 && !this.fsm.is(Cat.JUMPING_LEFT) && (this.fsm.is(Cat.IDLE_LEFT) || this.fsm.is(Cat.WALK_LEFT))) {
        //     this.fsm.jumpLeft();
        // } else if (!this.physics.onFloor && this.physics.jumpForces.length == 0 && (this.fsm.is(Cat.IDLE_LEFT) || this.fsm.is(Cat.WALK_LEFT))) {
        //     this.fsm.fallLeft();
        // }
    };

    /**
     * Renders the special effect on the map
     */
    Cat.prototype.renderFX = function() {

    };

    /**
     * Applies the player's controls on the cat
     */
    Cat.prototype.control = function() {
        if (!this.controllable) {
            return;
        }

        if (Keyboard.isDown(Keyboard.RIGHT_ARROW) && (this.fsm.is(Cat.JUMPING_RIGHT) || this.fsm.is(Cat.FALLING_RIGHT)) && this.physics.onFloor) {
            this.fsm.walkRight();
            this.physics.addForce(this.speed.x, 0);
        }

        if (Keyboard.isDown(Keyboard.RIGHT_ARROW) && (this.fsm.is(Cat.JUMPING_RIGHT) || this.fsm.is(Cat.FALLING_RIGHT)) && !this.physics.onFloor) {
            this.fsm.jumpRight();
            this.physics.addForce(this.speed.x, 0);
        }

        if (Keyboard.isDown(Keyboard.LEFT_ARROW) && (this.fsm.is(Cat.JUMPING_LEFT) || this.fsm.is(Cat.FALLING_LEFT)) && this.physics.onFloor) {
            this.fsm.walkLeft();
            this.physics.addForce(-this.speed.x, 0);
        }

        if (Keyboard.isDown(Keyboard.LEFT_ARROW) && (this.fsm.is(Cat.JUMPING_LEFT) || this.fsm.is(Cat.FALLING_LEFT)) && !this.physics.onFloor) {
            this.fsm.jumpLeft();
            this.physics.addForce(-this.speed.x, 0);
        }

        if (Keyboard.isDown(Keyboard.SPACE) && this.physics.onFloor) {
            this.jump();
        }

        if (Keyboard.isDown(Keyboard.ESCAPE)) {
            // Npc.leaveNpc(this);
        }
    };

    /**
     * Triggered when the character is being left
     */
    Cat.prototype.onLeave = function() {
        this.parent.onLeave.call(this);
        if (this.fsm.is(Cat.IDLE_LEFT) || this.fsm.is(Cat.WALKING_LEFT)) {
            this.fsm.walkLeft();
        } else {
            this.fsm.walkRight();
        }
    };

    return Cat;
});