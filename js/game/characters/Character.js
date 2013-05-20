// The Character character class file
define(['Engine', 'Keyboard', 'inheritance'],
function(Engine, Keyboard, inherits) {

    /**
     * @constructor
     * @param {integer} x       The x position
     * @param {integer} y       The y position
     * @param {integer} ts      The map's tile size
     * @param {Object} sprites  The sprites for this character
     */
    var Character = function(x, y, ts, sprites) {
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

    Character.IDLE          = 'CHARACTER_IDLE';
    Character.IDLE_LEFT     = 'CHARACTER_IDLE_LEFT';
    Character.IDLE_RIGHT    = 'CHARACTER_IDLE_RIGHT';
    Character.WALKING_LEFT  = 'CHARACTER_WALKING_LEFT';
    Character.WALKING_RIGHT = 'CHARACTER_WALKING_RIGHT';
    Character.JUMPING_LEFT  = 'CHARACTER_JUMPING_LEFT';
    Character.JUMPING_RIGHT = 'CHARACTER_JUMPING_RIGHT';
    Character.FALLING_LEFT  = 'CHARACTER_FALLING_LEFT';
    Character.FALLING_RIGHT = 'CHARACTER_FALLING_RIGHT';

    /**
     * Called on each frame
     * @param  {Map} map          The game's map object
     * @param  {integer} canvasWidth  The game's canvas' width
     * @param  {integer} canvasHeight The game's canvas' height
     */
    Character.prototype.update = function(map, canvasWidth, canvasHeight) {
        this.realX = this.x + map.scrollX;
        this.realY = this.y + map.scrollY;

        var realX0 = this.realX,
            realY0 = this.realY;

        this.physics.update(map);

        var dX = this.realX - realX0,
            dY = this.realY - realY0;

        this.x = this.realX - map.scrollX;
        this.y = this.realY - map.scrollY;

        if (this.body.limitToBounds) {
            if (this.x <= 0) {
                this.x = 1;
                this.physics.v.x = 0;
            } else if (this.x >= canvasWidth - this.body.getWidth()) {
                this.x = canvasWidth - this.body.getWidth() - 1;
                this.physics.v.x = 0;
            }

            if (this.y <= 0) {
                this.y = 1;
                this.physics.v.y = 0;
            } else if (this.y >= canvasHeight - this.body.getHeight() + 20) {
                this.y = canvasHeight - this.body.getHeight() + 20 - 1;
                this.physics.v.y = 0;
            }
        }

        // Update the scrolling if the character is controlled by the player
        if (!this.isPlayer || !this.controllable || !map.scrollable) {
            return;
        }

        map.scroll(this, dX, dY);
    };

    /**
     * Renders the character
     * @param  {Canvas2DContext} context The 2D context of the canvas to render in
     */
    Character.prototype.render = function(context) {
        this.view.draw(context);
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