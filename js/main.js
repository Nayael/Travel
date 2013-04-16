var Game = {};  // The game main namespace

// Constants
Game.CANVAS_WIDTH  = 800;
Game.CANVAS_HEIGHT = 576;

/**
 * Initializes the game
 */
Game.init = function() {
    this.canvas        = document.createElement('canvas');
    this.canvas.id     = 'main';
    this.canvas.width  = this.CANVAS_WIDTH;
    this.canvas.height = this.CANVAS_HEIGHT;
    this.context       = this.canvas.getContext('2d');

    this.map      = new this.Map();
    this.useGhost();   // Playable character
    this.player.x = 400;
    this.player.y = 200;

    this.npcs     = [];                 // Non-playable characters
    this.entities = [this.player];      // All the entities in the game
};

/**
 * The main game loop
 */
Game.update = function() {
    var canvas   = Game.canvas,
        context  = Game.context,
        entities = Game.entities;

    // Clearing the canvas
    context.fillStyle = 'rgb(0, 0, 0)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // We draw the map
    Game.map.scroll(Game.player);
    Game.map.draw(context);
    
    // Updating all the entities
    for (var entity in entities) {
        if (entities.hasOwnProperty(entity)) {
            entities[entity].update();
            entities[entity].render(context);
        }
    }

    // Updating the player's character's controls
    if (Game.player) {
        Game.player.control();
    }
};

/**
 * Makes the player control the Ghost
 */
Game.useGhost = function() {
    this.player = new this.Ghost();   // Playable character
    this.map.scrollable = false;
};