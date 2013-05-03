// The Ghost character class file
define(['Engine', 'StateMachine', 'Keyboard', 'game/Npc'],

function(Engine, StateMachine, Keyboard, Npc) {

    /**
     * @constructor
     * @param {integer} x       The x position
     * @param {integer} y       The y position
     * @param {Object} sprites  The sprites for this character
     */
    var Ghost = function(x, y, sprites) {
        this.name = 'ghost';
        this.x = x || 0;
        this.y = y || 0;
        this.sprites = sprites;
        this.controllable = false;

        this.speed = {
            x: 15,
            y: 15
        };
        this.maxSpeed = {
            x: 20,
            y: 20
        }

        // Body
        this.body = new Engine.Body(this, 1, 1.3);
        
        // Physics
        this.physics = new Engine.Physics(this);
        this.physics.useGravity = false;
        this.physics.useCollisions = false;
        
        // View
        this.view = new Engine.View(this, {
            sprite: this.sprites.walkRSprite,
            localX: 0,
            localY: 0,
            width: 31.5,
            height: 43,
            totalFrames: 6,
            frameRate: 130
        });

        // this.useTileFade = true;

        // State Machine
        this.initFSM();
    };

    // Constants
    Ghost.IDLE             = 'IDLE';
    Ghost.WALKING_RIGHT    = 'WALKING_RIGHT';
    Ghost.WALKING_LEFT     = 'WALKING_LEFT';
    Ghost.POSSESSION_LEFT  = 'POSSESSION_LEFT';
    Ghost.POSSESSION_RIGHT = 'POSSESSION_RIGHT';

    /**
     * Creates the State Machine
     */
    Ghost.prototype.initFSM = function() {
        this.fsm = StateMachine.create({
            initial: Ghost.IDLE,
            error: function(eventName, from, to, args, errorCode, errorMessage) {
                console.log('Error on event ' + eventName + '. From [' + from + '] to [' + to + '] : ' + errorMessage);
            },
            events: [
                { name: 'idle', from: [Ghost.WALKING_LEFT, Ghost.WALKING_RIGHT], to: Ghost.IDLE },
                { name: 'turnLeft', from: [Ghost.IDLE, Ghost.WALKING_RIGHT], to: Ghost.WALKING_LEFT },
                { name: 'turnRight', from: [Ghost.IDLE, Ghost.WALKING_LEFT], to: Ghost.WALKING_RIGHT }
            ]
        });
        this.fsm.subject = this;

        this.fsm.onturnLeft = function(e) {
            this.subject.view = new Engine.View(this.subject, {
                sprite: this.subject.sprites.walkLSprite,
                localX: 0,
                localY: 0,
                width: 31.5,
                height: 43,
                totalFrames: 6,
                frameRate: 130
            });
        };

        this.fsm.onturnRight = function(e) {
            this.subject.view = new Engine.View(this.subject, {
                sprite: this.subject.sprites.walkRSprite,
                localX: 0,
                localY: 0,
                width: 31.5,
                height: 43,
                totalFrames: 6,
                frameRate: 130
            });
        };
    };

    /**
     * Called on each frame
     * @param  {Map} map          The game's map object
     * @param  {integer} canvasWidth  The game's canvas' width
     * @param  {integer} canvasHeight The game's canvas' height
     */
    Ghost.prototype.update = function(map, canvasWidth, canvasHeight) {
        this.realX = this.x + map.scrollX;
        this.realY = this.y + map.scrollY;

        var realX0 = this.realX,
            realY0 = this.realY;

        this.physics.update(map);

        var dX = this.realX - realX0,
            dY = this.realY - realY0;

        this.x = this.realX - map.scrollX;
        this.y = this.realY - map.scrollY;

        // The Ghost can't get out of the canvas bounds
        if (this.x <= 0) {
            this.x = 1;
            this.physics.v.x = 0;
        } else if (this.x >= canvasWidth - this.body.t_width * map.TS) {
            this.x = canvasWidth - this.body.t_width * map.TS - 1;
            this.physics.v.x = 0;
        }

        if (this.y <= 0) {
            this.y = 1;
            this.physics.v.y = 0;
        } else if (this.y >= canvasHeight - this.body.t_height * map.TS + 20) {
            this.y = canvasHeight - this.body.t_height * map.TS + 20 - 1;
            this.physics.v.y = 0;
        }

        // Update the state
        if (this.realX < realX0 && !this.fsm.is(Ghost.WALKING_LEFT)) {
            this.fsm.turnLeft();
        } else if (this.realX > realX0 && !this.fsm.is(Ghost.WALKING_RIGHT)) {
            this.fsm.turnRight();
        }
    };

    /**
     * Renders the character
     * @param  {Canvas2DContext} context The 2D context of the canvas to render in
     */
    Ghost.prototype.render = function(context) {
        this.view.draw(context);
    };

    /**
     * Applies the player's controls on the character
     */
    Ghost.prototype.control = function() {
        if (!this.controllable) {
            return;
        }

        if (Keyboard.isDown(Keyboard.UP_ARROW)) {
            this.physics.addForce(0, -this.speed.y)
        } else if (Keyboard.isDown(Keyboard.DOWN_ARROW)) {
            this.physics.addForce(0, this.speed.y)
        }

        if (Keyboard.isDown(Keyboard.LEFT_ARROW)) {
            this.physics.addForce(-this.speed.x, 0);
        } else if (Keyboard.isDown(Keyboard.RIGHT_ARROW)) {
            this.physics.addForce(this.speed.x, 0);
        }

        if (Keyboard.isDown(Keyboard.CTRL) && !this.fsm.is(Ghost.POSSESSION_RIGHT) && !this.fsm.is(Ghost.POSSESSION_LEFT)) {
            this.takeControl();
        }
    };

    /**
     * The ghost takes control of a NPC
     */
    Ghost.prototype.takeControl = function() {
        // Take control of the npc he is colliding
        // for (var npc in Game.npcs) {
        //     if (Game.npcs.hasOwnProperty(npc) && this.body.collide(Game.npcs[npc])) {
        //         this.state = Ghost.POSSESSION_RIGHT;
        //         Game.Npc.possessNpc(npc);
        //         break;
        //     }
        // }
    };

    /**
     * Triggered when the character is being possessed
     */
    Ghost.prototype.onPossess = function() {
        var self = this;
        setTimeout(function() {
            self.controllable = true;
        }, Npc.STUN_TIME);
    };

    return Ghost;
});