// The Cat class
define(['Engine', 'StateMachine', 'Keyboard', 'Engine/Map', 'inheritance', 'game/characters/Character'],

function(Engine, StateMachine, Keyboard, Map, inherits, Character) {

    /**
     * @constructor
     * @param {integer} x       The x position
     * @param {integer} y       The y position
     * @param {Object} sprites  The sprites for this character
     */
    var Cat = function(x, y, sprites) {
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
        this.body = new Engine.Body(this, 1, 1, Map.TS);

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
            error: function(eventName, from, to, args, errorCode, errorMessage) {
                console.log('Error # ' + errorCode + ' on event ' + eventName + '. From [' + from + '] to [' + to + '] : ' + errorMessage + ' (' + args + ')');
            },
            events: [{
                    name: 'turnLeft',
                    from: [Cat.IDLE_RIGHT, Cat.WALKING_LEFT, Cat.JUMPING_LEFT, Cat.FALLING_LEFT],
                    to: Cat.IDLE_LEFT
                }, {
                    name: 'turnRight',
                    from: [Character.NONE, Cat.IDLE_LEFT, Cat.WALKING_RIGHT, Cat.JUMPING_RIGHT, Cat.FALLING_RIGHT],
                    to: Cat.IDLE_RIGHT
                }, {
                    name: 'walkLeft',
                    from: [Cat.IDLE_LEFT, Cat.IDLE_RIGHT, Cat.WALKING_RIGHT, Cat.JUMPING_LEFT, Cat.JUMPING_RIGHT, Cat.FALLING_LEFT, Cat.FALLING_RIGHT],
                    to: Cat.WALKING_LEFT
                }, {
                    name: 'walkRight',
                    from: [Cat.IDLE_LEFT, Cat.IDLE_RIGHT, Cat.WALKING_LEFT, Cat.JUMPING_LEFT, Cat.JUMPING_RIGHT, Cat.FALLING_LEFT, Cat.FALLING_RIGHT],
                    to: Cat.WALKING_RIGHT
                }, {
                    name: 'jumpLeft',
                    from: [Cat.IDLE_LEFT, Cat.IDLE_RIGHT, Cat.WALKING_LEFT, Cat.WALKING_RIGHT, Cat.JUMPING_RIGHT, Cat.FALLING_LEFT, Cat.FALLING_RIGHT],
                    to: Cat.JUMPING_LEFT
                }, {
                    name: 'jumpRight',
                    from: [Cat.IDLE_LEFT, Cat.IDLE_RIGHT, Cat.WALKING_LEFT, Cat.WALKING_RIGHT, Cat.JUMPING_LEFT, Cat.FALLING_LEFT, Cat.FALLING_RIGHT],
                    to: Cat.JUMPING_RIGHT
                }, {
                    name: 'fallLeft',
                    from:[Cat.IDLE_LEFT, Cat.IDLE_RIGHT, Cat.WALKING_LEFT, Cat.WALKING_RIGHT, Cat.JUMPING_LEFT, Cat.JUMPING_RIGHT, Cat.FALLING_RIGHT],
                    to: Cat.FALLING_LEFT
                }, {
                    name: 'fallRight',
                    from: [Cat.IDLE_LEFT, Cat.IDLE_RIGHT, Cat.WALKING_LEFT, Cat.WALKING_RIGHT, Cat.JUMPING_LEFT, Cat.JUMPING_RIGHT, Cat.FALLING_LEFT],
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
                frameRate: 50
            });
        };

        this.fsm.onturnRight = function(e) {
            this.subject.view = new Engine.View(this.subject, {
                sprite: this.subject.sprites.idleRSprite,
                localX: this.subject.body.getWidth() - 35,
                localY: 0,
                width: 35,
                height: 34,
                totalFrames: 4,
                frameRate: 50
            });
        };

        this.fsm.onwalkLeft = function(e) {
            this.subject.view = new Engine.View(this.subject, {
                sprite: this.subject.sprites.walkLSprite,
                localX: 0,
                localY: 0,
                width: 44,
                height: 33,
                totalFrames: 5,
                frameRate: 120
            });
        };

        this.fsm.onwalkRight = function(e) {
            this.subject.view = new Engine.View(this.subject, {
                sprite: this.subject.sprites.walkRSprite,
                localX: this.subject.body.getWidth() - 44,
                localY: 0,
                width: 44,
                height: 33,
                totalFrames: 5,
                frameRate: 120
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
                frameRate: 120
            });
        };

        this.fsm.onjumpRight = function(e) {
            this.subject.view = new Engine.View(this.subject, {
                sprite: this.subject.sprites.jumpRSprite,
                localX: this.subject.body.getWidth() - 61,
                localY: 0,
                width: 61,
                height: 42,
                totalFrames: 8,
                frameRate: 120
            });
        };

        this.fsm.onfallLeft = function(e) {
            this.subject.view = new Engine.View(this.subject, {
                sprite: this.subject.sprites.fallLSprite,
                localX: 0,
                localY: 0,
                width: 58,
                height: 36,
                totalFrames: 1
            });
        };

        this.fsm.onfallRight = function(e) {
            this.subject.view = new Engine.View(this.subject, {
                sprite: this.subject.sprites.fallRSprite,
                localX: this.subject.body.getWidth() - 58,
                localY: 0,
                width: 58,
                height: 36,
                totalFrames: 1
            });
        };
    };

    /**
     * Called on each frame
     */
    Cat.prototype.update = function() {
        if (!this.enabled) {
            return;
        }
        // The character scroll with the map if he is not controlled by the player
        if (this.isPlayer && this.controllable) {
            this.realX = this.x + Map.scrollX;
            this.realY = this.y + Map.scrollY;
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
    };

    /**
     * Applies the player's controls on the cat
     */
    Cat.prototype.control = function() {
        if (!this.controllable || !this.enabled) {
            return;
        }

        // Walk left
        if (Keyboard.isDown(Keyboard.LEFT_ARROW) && this.physics.onFloor) {
            if (this.body.left && !this.fsm.is(Cat.WALKING_LEFT)) {
                this.fsm.walkLeft();
            }
            this.physics.addForce(-this.speed.x, 0);
        }

        // Walk right
        if (Keyboard.isDown(Keyboard.RIGHT_ARROW) && this.physics.onFloor) {
            if (!this.body.left && !this.fsm.is(Cat.WALKING_RIGHT)) {
                this.fsm.walkRight();
            }
            this.physics.addForce(this.speed.x, 0);
        }

        // Jump
        if (Keyboard.isDown(Keyboard.SPACE) && this.physics.onFloor) {
            this.jump();
            if (this.body.left) {
                this.fsm.jumpLeft();
            } else {
                this.fsm.jumpRight();
            }
        }

        // Left while jumping
        if (Keyboard.isDown(Keyboard.LEFT_ARROW) && this.physics.jumping) {
            this.physics.addForce(-this.speed.x, 0);
            if (!this.fsm.is(Cat.JUMPING_LEFT)) {
                this.fsm.jumpLeft();
            }
        }

        // Right while jumping
        if (Keyboard.isDown(Keyboard.RIGHT_ARROW) && this.physics.jumping) {
            this.physics.addForce(this.speed.x, 0);
            if (!this.fsm.is(Cat.JUMPING_RIGHT)) {
                this.fsm.jumpRight();
            }
        }

        // Left while falling
        if (!this.physics.onFloor && !this.physics.jumping) {
            
            if (Keyboard.isDown(Keyboard.LEFT_ARROW)) {
                this.physics.addForce(-this.speed.x, 0);
            }
            if (this.body.left && !this.fsm.is(Cat.FALLING_LEFT)) {
                this.fsm.fallLeft();
            }

            // Right while falling
            if (Keyboard.isDown(Keyboard.RIGHT_ARROW)) {
                this.physics.addForce(this.speed.x, 0);
            }
            if (!this.body.left && !this.fsm.is(Cat.FALLING_RIGHT)) {
                this.fsm.fallRight();
            }
        }

        // Idle
        if (this.physics.onFloor && this.physics.forces.length == 0 && this.physics.jumpForces.length == 0 && this.physics.v.x == 0 && this.physics.v.y == 0) {
            if (this.body.left && !this.fsm.is(Cat.IDLE_LEFT)) {
                this.fsm.turnLeft();
            } else if (!this.body.left && !this.fsm.is(Cat.IDLE_RIGHT)) {
                this.fsm.turnRight();
            }
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