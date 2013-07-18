// The Ghost character class file
define(['Engine', 'StateMachine', 'Keyboard', 'inheritance', 'game/characters/Character', 'Engine/Map'],

function(Engine, StateMachine, Keyboard, inherits, Character, Map) {

    /**
     * @constructor
     * @param {integer} x       The x position
     * @param {integer} y       The y position
     * @param {Object} sprites  The sprites for this character
     */
    var Ghost = function(x, y, sprites) {
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
        this.body = new Engine.Body(this, 1, 1.8, Map.TS);
        this.body.limitToBounds = true;
        
        // Physics
        this.physics = new Engine.Physics(this);
        this.physics.useGravity = false;
        this.physics.useCollisions = false;
        
        // View
        this.initFSM();
        this.fsm.walkRight();
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
            error: function(eventName, from, to, args, errorCode, errorMessage) {
                console.log('Error on event ' + eventName + '. From [' + from + '] to [' + to + '] : ' + errorMessage);
            },
            events: [
                { name: 'walkLeft', from: [Character.NONE, Ghost.WALKING_RIGHT], to: Ghost.WALKING_LEFT },
                { name: 'walkRight', from: [Character.NONE, Ghost.WALKING_LEFT], to: Ghost.WALKING_RIGHT }
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
     */
    Ghost.prototype.update = function() {
        this.realX = this.x + Map.scrollX;
        this.realY = this.y + Map.scrollY;

        var realX0 = this.realX,
            realY0 = this.realY;

        this.parent.update.call(this, arguments);
    };

    /**
     * Applies the player's controls on the character
     */
    Ghost.prototype.control = function(npcs) {
        if (!this.controllable) {
            return;
        }

        // Move up
        if (Keyboard.isDown(Keyboard.UP_ARROW)) {
            this.physics.addForce(0, -this.speed.y)
        }

        // Move down
        if (Keyboard.isDown(Keyboard.DOWN_ARROW)) {
            this.physics.addForce(0, this.speed.y)
        }

        // Walk left
        if (Keyboard.isDown(Keyboard.LEFT_ARROW)) {
            if (this.body.left && !this.fsm.is(Ghost.WALKING_LEFT)) {
                this.fsm.walkLeft();
            }
            this.physics.addForce(-this.speed.x, 0);
        }

        // Walk right
        if (Keyboard.isDown(Keyboard.RIGHT_ARROW)) {
            if (!this.body.left && !this.fsm.is(Ghost.WALKING_RIGHT)) {
                this.fsm.walkRight();
            }
            this.physics.addForce(this.speed.x, 0);
        }

        // Take control of an entity
        if (Keyboard.isDown(Keyboard.CTRL)) {
            this.takeControl(npcs);
        }
    };

    /**
     * The ghost takes control of a NPC
     */
    Ghost.prototype.takeControl = function(npcs) {
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
    Ghost.prototype.onPossess = function() {
        this.parent.onPossess.call(this, arguments);
        Map.scrollable = false;
    };

    return Ghost;
});