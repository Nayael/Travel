var Game = {};  // The game main namespace

/**
 * Initializes the game
 */
Game.init = function() {
    Game.canvas        = document.createElement('canvas');
    Game.canvas.id     = 'main';
    Game.canvas.width  = Game.CANVAS_WIDTH;
    Game.canvas.height = Game.CANVAS_HEIGHT;
    Game.context       = Game.canvas.getContext('2d');
    Game.frameCount    = 0;

    Game.map      = new Game.Map();
    Game.useGhost();    // Playable character
    Game.player.x = 400;
    Game.player.y = 200;

    Game.npcs = {};     // The non-playable characters displayed on the stage

    // Adding the canvas to the stage
    document.body.appendChild(Game.canvas);

    // Launching the main loop
    onEachFrame(Game.update);
};

/**
 * Preloads the assets
 */
Game.load = function() {
    // Declaring all the assets in PxLoader
    this.loader = new PxLoader(),
    this.images = {
        ghost: {
            idleImage : this.loader.addImage("images/sprites/ghost/right.png"),
            walkrImage: this.loader.addImage("images/sprites/ghost/right.png"),
            walklImage: this.loader.addImage("images/sprites/ghost/left.png"),
            tiles: this.loader.addImage("images/sprites/ghost/tiles.png")
        },
        cat: {
            idleImage : this.loader.addImage("images/sprites/cat/idle_right.png"),
            walkrImage: this.loader.addImage("images/sprites/cat/idle_right.png"),
            walklImage: this.loader.addImage("images/sprites/cat/idle_left.png"),
            tiles: this.loader.addImage("images/sprites/cat/tiles.png")
        }
    };
    
    // Progression bar
    this.loader.addProgressListener(function(e) { 
        console.log(e.completedCount * 100 / e.totalCount + '%');
    });

    this.loader.addCompletionListener(this.init);
    // Starting the loading
    this.loader.start();
}

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
    this.player.onPossess();
};