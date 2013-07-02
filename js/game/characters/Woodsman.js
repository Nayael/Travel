// The Woodsman class
define(['Engine', 'StateMachine', 'Keyboard', 'inheritance', 'game/characters/Character', 'game/characters/Npc'],

function(Engine, StateMachine, Keyboard, inherits, Character, Npc) {

    /**
     * @constructor
     * @param {integer} x       The x position
     * @param {integer} y       The y position
     * @param {integer} ts      The map's tile size
     * @param {Object} sprites  The sprites for this character
     */
    var Woodsman = function(x, y, ts, sprites) {
        this.parent.constructor.apply(this, arguments);
        this.name  = 'woodsman';

        this.speed = {
            x: 20,
            y: 55
        };
        this.maxSpeed = {
            x: 20,
            y: 55
        }

        // Body
        this.body = new Engine.Body(this, 2, 3, ts);

        // Physics
        this.physics = new Engine.Physics(this);
        this.physics.jumpHeight = 20;

        // View
        this.initFSM();
        this.fsm.turnRight();
    };
    Woodsman.inheritsFrom(Character);

    // Constants
    Woodsman.IDLE_LEFT     = 'WOODSMAN_IDLE_LEFT';
    Woodsman.IDLE_RIGHT    = 'WOODSMAN_IDLE_RIGHT';
    Woodsman.WALKING_RIGHT = 'WOODSMAN_WALKING_RIGHT';
    Woodsman.WALKING_LEFT  = 'WOODSMAN_WALKING_LEFT';
    Woodsman.JUMPING_LEFT  = 'WOODSMAN_JUMPING_LEFT';
    Woodsman.JUMPING_RIGHT = 'WOODSMAN_JUMPING_RIGHT';
    Woodsman.FALLING_LEFT  = 'WOODSMAN_FALLING_LEFT';
    Woodsman.FALLING_RIGHT = 'WOODSMAN_FALLING_RIGHT';

    /**
     * Creates the State Machine
     */
    Woodsman.prototype.initFSM = function() {
        this.fsm = StateMachine.create({
            error: function(eventName, from, to, args, errorCode, errorMessage) {
                console.log('Error # ' + errorCode + ' on event ' + eventName + '. From [' + from + '] to [' + to + '] : ' + errorMessage + ' (' + args + ')');
            },
            events: [{
                    name: 'turnLeft',
                    from: [Woodsman.IDLE_RIGHT, Woodsman.WALKING_LEFT, Woodsman.JUMPING_LEFT, Woodsman.FALLING_LEFT],
                    to: Woodsman.IDLE_LEFT
                }, {
                    name: 'turnRight',
                    from: ['none', Woodsman.IDLE_LEFT, Woodsman.WALKING_RIGHT, Woodsman.JUMPING_RIGHT, Woodsman.FALLING_RIGHT],
                    to: Woodsman.IDLE_RIGHT
                }, {
                    name: 'walkLeft',
                    from: [Woodsman.IDLE_LEFT, Woodsman.IDLE_RIGHT, Woodsman.WALKING_RIGHT, Woodsman.JUMPING_LEFT, Woodsman.JUMPING_RIGHT, Woodsman.FALLING_LEFT, Woodsman.FALLING_RIGHT],
                    to: Woodsman.WALKING_LEFT
                }, {
                    name: 'walkRight',
                    from: [Woodsman.IDLE_LEFT, Woodsman.IDLE_RIGHT, Woodsman.WALKING_LEFT, Woodsman.JUMPING_LEFT, Woodsman.JUMPING_RIGHT, Woodsman.FALLING_LEFT, Woodsman.FALLING_RIGHT],
                    to: Woodsman.WALKING_RIGHT
                }, {
                    name: 'jumpLeft',
                    from: [Woodsman.IDLE_LEFT, Woodsman.IDLE_RIGHT, Woodsman.WALKING_LEFT, Woodsman.WALKING_RIGHT, Woodsman.JUMPING_RIGHT],
                    to: Woodsman.JUMPING_LEFT
                }, {
                    name: 'jumpRight',
                    from: [Woodsman.IDLE_LEFT, Woodsman.IDLE_RIGHT, Woodsman.WALKING_LEFT, Woodsman.WALKING_RIGHT, Woodsman.JUMPING_LEFT],
                    to: Woodsman.JUMPING_RIGHT
                }, {
                    name: 'fallLeft',
                    from:[Woodsman.IDLE_LEFT, Woodsman.IDLE_RIGHT, Woodsman.WALKING_LEFT, Woodsman.WALKING_RIGHT, Woodsman.JUMPING_LEFT, Woodsman.JUMPING_RIGHT, Woodsman.FALLING_RIGHT],
                    to: Woodsman.FALLING_LEFT
                }, {
                    name: 'fallRight',
                    from: [Woodsman.IDLE_LEFT, Woodsman.IDLE_RIGHT, Woodsman.WALKING_LEFT, Woodsman.WALKING_RIGHT, Woodsman.JUMPING_LEFT, Woodsman.JUMPING_RIGHT, Woodsman.FALLING_LEFT],
                    to: Woodsman.FALLING_RIGHT
                }
            ]
        });
        this.fsm.subject = this;

        this.fsm.onturnLeft = function(e) {
            this.subject.view = new Engine.View(this.subject, {
                sprite: this.subject.sprites.idleLSprite,
                localX: 0,
                localY: 0,
                width: 47,
                height: 108,
                totalFrames: 2,
                frameRate: 50
            });
        };

        this.fsm.onturnRight = function(e) {
            this.subject.view = new Engine.View(this.subject, {
                sprite: this.subject.sprites.idleRSprite,
                localX: this.subject.body.getWidth() - 47,
                localY: 0,
                width: 47,
                height: 108,
                totalFrames: 2,
                frameRate: 50
            });
        };

        this.fsm.onwalkLeft = function(e) {
            this.subject.view = new Engine.View(this.subject, {
                sprite: this.subject.sprites.walkLSprite,
                localX: 0,
                localY: 0,
                width: 44,
                height: 108,
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
                height: 108,
                totalFrames: 5,
                frameRate: 120
            });
        };

        this.fsm.onjumpLeft = function(e) {
            this.subject.view = new Engine.View(this.subject, {
                sprite: this.subject.sprites.jumpLSprite,
                localX: 0,
                localY: 0,
                width: 57,
                height: 111,
                totalFrames: 7,
                frameRate: 120
            });
        };

        this.fsm.onjumpRight = function(e) {
            this.subject.view = new Engine.View(this.subject, {
                sprite: this.subject.sprites.jumpRSprite,
                localX: this.subject.body.getWidth() - 57,
                localY: 0,
                width: 57,
                height: 111,
                totalFrames: 7,
                frameRate: 120
            });
        };

        this.fsm.onfallLeft = function(e) {
            this.subject.view = new Engine.View(this.subject, {
                sprite: this.subject.sprites.fallLSprite,
                localX: 0,
                localY: 0,
                width: 57,
                height: 111,
                totalFrames: 1
            });
        };

        this.fsm.onfallRight = function(e) {
            this.subject.view = new Engine.View(this.subject, {
                sprite: this.subject.sprites.fallRSprite,
                localX: this.subject.body.getWidth() - 57,
                localY: 0,
                width: 57,
                height: 111,
                totalFrames: 1
            });
        };
    };

    /**
     * Called on each frame
     */
    Woodsman.prototype.update = function(map, canvasWidth, canvasHeight) {
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
    };

    /**
     * Applies the player's controls on the Woodsman
     */
    Woodsman.prototype.control = function() {
        if (!this.controllable) {
            return;
        }

        // Walk left
        if (Keyboard.isDown(Keyboard.LEFT_ARROW) && this.physics.onFloor) {
            this.physics.addForce(-this.speed.x, 0);
        }
        if (this.body.left && !this.fsm.is(Woodsman.WALKING_LEFT) && this.physics.onFloor) {
            this.fsm.walkLeft();
        }

        // Walk right
        if (Keyboard.isDown(Keyboard.RIGHT_ARROW) && this.physics.onFloor) {
            this.physics.addForce(this.speed.x, 0);
        }
        if (!this.body.left && !this.fsm.is(Woodsman.WALKING_RIGHT) && this.physics.onFloor) {
            this.fsm.walkRight();
        }

        // Left while jumping
        if (Keyboard.isDown(Keyboard.LEFT_ARROW) && !this.physics.onFloor) {
            this.physics.addForce(-this.speed.x, 0);
        }
        if (this.body.left && !this.fsm.is(Woodsman.JUMPING_LEFT) && !this.physics.onFloor && this.physics.jumping) {
            this.fsm.jumpLeft();
        }

        // Right while jumping
        if (Keyboard.isDown(Keyboard.RIGHT_ARROW) && !this.physics.onFloor) {
            this.physics.addForce(this.speed.x, 0);
        }
        if (!this.body.left && !this.fsm.is(Woodsman.JUMPING_RIGHT) && !this.physics.onFloor && this.physics.jumping) {
            this.fsm.jumpRight();
        }

        // Left while falling
        if (Keyboard.isDown(Keyboard.LEFT_ARROW) && !this.physics.onFloor && !this.physics.jumping) {
            this.physics.addForce(-this.speed.x, 0);
        }
        if (this.body.left && !this.fsm.is(Woodsman.FALLING_LEFT) && !this.physics.onFloor && !this.physics.jumping) {
            this.fsm.fallLeft();
        }

        // Right while falling
        if (Keyboard.isDown(Keyboard.RIGHT_ARROW) && !this.physics.onFloor && !this.physics.jumping) {
            this.physics.addForce(this.speed.x, 0);
        }
        if (!this.body.left && !this.fsm.is(Woodsman.FALLING_RIGHT) && !this.physics.onFloor && !this.physics.jumping) {
            this.fsm.fallRight();
        }

        // Jump
        if (Keyboard.isDown(Keyboard.SPACE) && this.physics.onFloor) {
            this.jump();
        }

        // Idle
        if (this.physics.onFloor && this.physics.forces.length == 0 && this.physics.jumpForces.length == 0 && this.physics.v.x == 0 && this.physics.v.y == 0) {
            if (this.body.left && !this.fsm.is(Woodsman.IDLE_LEFT)) {
                this.fsm.turnLeft();
            } else if (!this.body.left && !this.fsm.is(Woodsman.IDLE_RIGHT)) {
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
    Woodsman.prototype.onLeave = function() {
        this.parent.onLeave.call(this);
        if (this.fsm.is(Woodsman.IDLE_LEFT) || this.fsm.is(Woodsman.WALKING_LEFT)) {
            this.fsm.walkLeft();
        } else {
            this.fsm.walkRight();
        }
    };

    return Woodsman;
});