// The Character character class file
define(['Engine', 'Keyboard', 'game/Globals', 'Engine/Map'],

function(Engine, Keyboard, Globals, Map) {

    /**
     * @constructor
     * @param {integer} x       The x position
     * @param {integer} y       The y position
     * @param {Object} sprites  The sprites for this character
     */
    var Character = function(x, y, sprites) {
        this.name = null;
        this.body = null;
        this.physics = null;
        this.view = null;
        this.fsm = null

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
        };
    };

    // Constants
    Character.STUN_TIME = 800; // The time during which a character is not controllable after the possession
    Character.NONE      = 'none';

    /**
     * Called on each frame
     */
    Character.prototype.update = function() {
        this.realX = this.x + Map.scrollX;
        this.realY = this.y + Map.scrollY;

        var realX0 = this.realX,
            realY0 = this.realY;

        this.physics.update(Map);

        var dX = this.realX - realX0,
            dY = this.realY - realY0;

        this.x = this.realX - Map.scrollX;
        this.y = this.realY - Map.scrollY;

        if (this.body.limitToBounds) {
            if (this.x <= 0) {
                this.x = 1;
                this.physics.v.x = 0;
            } else if (this.x >= Globals.CANVAS_WIDTH - this.body.getWidth()) {
                this.x = Globals.CANVAS_WIDTH - this.body.getWidth() - 1;
                this.physics.v.x = 0;
            }

            if (this.y <= 0) {
                this.y = 1;
                this.physics.v.y = 0;
            } else if (this.y >= Globals.CANVAS_HEIGHT - this.body.getHeight() + 20) {
                this.y = Globals.CANVAS_HEIGHT - this.body.getHeight() + 20 - 1;
                this.physics.v.y = 0;
            }
        }

        // Update the scrolling if the character is controlled by the player
        if (!this.isPlayer || !this.controllable || !Map.scrollable) {
            return;
        }

        Map.scroll(this, dX, dY);
    };

    /**
     * Renders the character
     * @param  {Canvas2DContext} context The 2D context of the canvas to render in
     */
    Character.prototype.render = function(context) {
        if (this.view) {
            this.view.draw(context);
        }
    };

    /**
     * Applies the player's controls on the character
     */
    Character.prototype.control = function() {
        if (!this.controllable) {
            return;
        }

        if (Keyboard.isDown(Keyboard.LEFT_ARROW)) {
            this.physics.addForce(-this.speed.x, 0);
        } else if (Keyboard.isDown(Keyboard.RIGHT_ARROW)) {
            this.physics.addForce(this.speed.x, 0);
        }
    };

    /**
     * Makes the character jump
     */
    Character.prototype.jump = function() {
        this.physics.addJumpForce(-this.speed.y);
    };

    /**
     * Triggered when the character is being possessed
     */
    Character.prototype.onPossess = function() {
        this.isPlayer = true;
        Map.scrollable = true;

        var self = this;
        setTimeout(function() {
            self.controllable = true;
        }, Character.STUN_TIME);
    };

    /**
     * Triggered when the character is being left
     */
    Character.prototype.onLeave = function() {
        this.isPlayer = false;
    };

    return Character;
});