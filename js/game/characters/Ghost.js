// The Ghost character class file
define(['Engine', 'StateMachine', 'Keyboard', 'inheritance', 'game/characters/Character'],

function(Engine, StateMachine, Keyboard, inherits, Character) {

    /**
     * @constructor
     * @param {integer} x       The x position
     * @param {integer} y       The y position
     * @param {integer} ts      The map's tile size
     * @param {Object} sprites  The sprites for this character
     */
    var Ghost = function(x, y, ts, sprites) {
        this.parent.constructor.apply(this, arguments);
        this.name = 'ghost';

        this.speed = {
            x: 15,
            y: 15
        };
        this.maxSpeed = {
            x: 20,
            y: 20
        }

        // Body
        this.body = new Engine.Body(this, 1, 1.3, ts);
        this.body.limitToBounds = true;
        
        // Physics
        this.physics = new Engine.Physics(this);
        // this.physics.useGravity = false;
        // this.physics.useCollisions = false;
        
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
    Ghost.inheritsFrom(Character);

    // Constants
    Ghost.WALKING_RIGHT    = 'WALKING_RIGHT';
    Ghost.WALKING_LEFT     = 'WALKING_LEFT';
    Ghost.POSSESSION_LEFT  = 'POSSESSION_LEFT';
    Ghost.POSSESSION_RIGHT = 'POSSESSION_RIGHT';

    /**
     * Creates the State Machine
     */
    Ghost.prototype.initFSM = function() {
        this.fsm = StateMachine.create({
            initial: Ghost.WALKING_RIGHT,
            error: function(eventName, from, to, args, errorCode, errorMessage) {
                console.log('Error on event ' + eventName + '. From [' + from + '] to [' + to + '] : ' + errorMessage);
            },
            events: [
                { name: 'walkLeft', from: [Ghost.IDLE, Ghost.WALKING_RIGHT], to: Ghost.WALKING_LEFT },
                { name: 'walkRight', from: [Ghost.IDLE, Ghost.WALKING_LEFT], to: Ghost.WALKING_RIGHT }
            ]
        });
        this.fsm.subject = this;

        this.fsm.onwalkLeft = function(e) {
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

        this.fsm.onwalkRight = function(e) {
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

        this.parent.update.call(this, map, canvasWidth, canvasHeight);

        // Update the state
        if (this.realX < realX0 && !this.fsm.is(Ghost.WALKING_LEFT)) {
            this.fsm.walkLeft();
        } else if (this.realX > realX0 && !this.fsm.is(Ghost.WALKING_RIGHT)) {
            this.fsm.walkRight();
        }
    };

    /**
     * Applies the player's controls on the character
     */
    Ghost.prototype.control = function(npcs) {
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

        if (Keyboard.isDown(Keyboard.CTRL)) {
            this.takeControl(npcs);
        }
    };

    /**
     * The ghost takes control of a NPC
     */
    Ghost.prototype.takeControl = function(map, npcs) {
        // Take control of the npc he is colliding
        for (var npc in npcs) {
            // if (Game.npcs.hasOwnProperty(npc) && this.body.collide(Game.npcs[npc])) {
            //     this.state = Ghost.POSSESSION_RIGHT;
            //     this.controllable = false;
            //     Game.Npc.possessNpc(npc);
            //     map.autoScroll();
            //     break;
            // }
        }
    };

    /**
     * Triggered when the character is being possessed
     */
    Ghost.prototype.onPossess = function(map) {
        map.scrollable = false;
    };

    return Ghost;
});