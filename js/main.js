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

    Game.intensity = 1;

    Game.map      = new Game.Map();
    Game.useGhost();    // Playable character
    Game.player.x = 400;
    Game.player.y = 200;

    Game.Vec2     = illuminated.Vec2;
    Game.Lamp     = illuminated.Lamp;
    Game.Lighting = illuminated.Lighting;
    Game.DarkMask = illuminated.DarkMask;
    Game.light1   = new Game.Lamp({
        position: new Game.Vec2(Game.player.x, Game.player.y),
        distance: 100,
        diffuse: 2,
        radius: 5,
        samples: 1,
        angle: 0,
        roughness: 0
    });

    Game.lighting1 = new Game.Lighting({
        light: Game.light1
    });
    Game.darkmask = new Game.DarkMask({
        lights: [Game.light1],
        color: 'rgba(0,0,0,1)'
    });

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

    this.sounds = {
        ghost: {
            bgm: new buzz.sound("audio/ghost/bgm", {
                formats: ["mp3"],
                preload: true,
                loop: true
            })
        },
        oldwoman: {
            bgm: new buzz.sound("audio/oldwoman/bgm", {
                formats: ["mp3"],
                preload: true,
                loop: true
            })
        },
        cat: {
            bgm: new buzz.sound("audio/cat/bgm", {
                formats: ["mp3"],
                preload: true,
                loop: true
            })
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

    // Updating and rendering the player's character
    if (Game.player instanceof Game.Ghost) {
        // We draw the map before the character
        Game.map.draw(context);

        Game.player.update();
        Game.player.render(context);
        Game.player.control();
    } else {
        Game.player.update();
        Game.player.render(context);
        Game.player.control();
        
        // We draw the map after the character
        Game.map.draw(context);
        if (Game.player.renderFX) {
            Game.player.renderFX();
        }
    }

    if (Game.intensity > 0){
        Game.context.fillStyle = "rgba(0, 0, 0, "+ Game.intensity + ")";
        Game.context.fillRect(0, 0, Game.canvas.width, Game.canvas.height);
        Game.intensity -= 0.005;
    }
};

/**
 * Makes the player control the Ghost
 */
Game.useGhost = function() {
    this.player = new this.Ghost();   // Playable character
    this.player.onPossess();
};