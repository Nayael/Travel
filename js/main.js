var Game = {};  // The game main namespace

// Constants
Game.CANVAS_WIDTH  = 800;
Game.CANVAS_HEIGHT = 576;

/**
 * Initializes the game
 */
Game.init = function() {

    this.loader = new PxLoader(),
        this.idleImage = this.loader.addImage("images/sprites/ghost_right.png"),
        this.walkrImage = this.loader.addImage("images/sprites/ghost_right.png"),
        this.walklImage = this.loader.addImage("images/sprites/ghost_left.png"),
        this.platformImage = this.loader.addImage("images/sprites/platform.png");

    this.canvas        = document.createElement('canvas');
    this.canvas.id     = 'main';
    this.canvas.width  = this.CANVAS_WIDTH;
    this.canvas.height = this.CANVAS_HEIGHT;
    this.context       = this.canvas.getContext('2d');
    this.frameCount    = 0;

    this.map      = new this.Map();
    this.useGhost();    // Playable character
    this.player.x = 400;
    this.player.y = 200;

    this.npcs = {};     // The non-playable characters displayed on the stage
    // this.entities = [this.player];      // All the entities in the game

    this.loader.start();
};

/**
 * The main game loop
 */
Game.update = function() {
    var canvas  = Game.canvas,
        context = Game.context,
        npcs    = Game.npcs;

    Game.frameCount++;
    // Clearing the canvas
    context.fillStyle = 'rgb(0, 0, 0)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // We draw the map
    Game.map.draw(context);

    // Updating all the entities
    // The index of a NPC corresponds to the position of it in the tilemap
    for (entity in Game.npcs) {
        if (Game.npcs.hasOwnProperty(entity)) {
            npc = npcs[entity];
            npc.update();
            // If the character steps out of the view, we destroy it
            if (npc.x < -npc.body.width || npc.x > Game.CANVAS_WIDTH || npc.y < -npc.body.height || npc.y > Game.CANVAS_HEIGHT) {
                delete npcs[entity];
                continue;
            }
            npc.render(context);
        }
    }

    // Updating the player's character's controls
    if (Game.player) {
        Game.player.update();
        Game.player.render(context);
        Game.player.control();
    }
};

/**
 * Makes the player control the Ghost
 */
Game.useGhost = function() {
    this.player = new this.Ghost();   // Playable character
    this.map.scrollable = false;
    Game.Sound.startBGM(this.player);
    this.player.onPossess();
};