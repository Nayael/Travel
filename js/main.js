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
    Game.player.x = 736;
    Game.player.y = 448;

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
            idleImage : this.loader.addImage('images/sprites/ghost/right.png'),
            walkrImage: this.loader.addImage('images/sprites/ghost/right.png'),
            walklImage: this.loader.addImage('images/sprites/ghost/left.png'),
            tiles: this.loader.addImage('images/sprites/ghost/tiles.png'),
            // bg: this.loader.addImage('images/sprites/ghost/bg.jpg')
        },
        cat: {
            idlerImage : this.loader.addImage('images/sprites/cat/idle_right.png'),
            idlelImage : this.loader.addImage('images/sprites/cat/idle_left.png'),
            walkrImage: this.loader.addImage('images/sprites/cat/right.png'),
            walklImage: this.loader.addImage('images/sprites/cat/left.png'),
            tiles: this.loader.addImage('images/sprites/cat/tiles.png'),
            jumprImage: this.loader.addImage('images/sprites/cat/jump_r.png'),
            jumplImage: this.loader.addImage('images/sprites/cat/jump_l.png'),
            // bg: this.loader.addImage('images/sprites/cat/bg.jpg')
        },
        oldwoman: {
            idlerImage : this.loader.addImage('images/sprites/oldwoman/idle_right.png'),
            idlelImage : this.loader.addImage('images/sprites/oldwoman/idle_left.png'),
            walkrImage: this.loader.addImage('images/sprites/oldwoman/right.png'),
            walklImage: this.loader.addImage('images/sprites/oldwoman/left.png'),
            tiles: this.loader.addImage('images/sprites/oldwoman/tiles.png'),
            // bg: this.loader.addImage('images/sprites/oldwoman/bg.jpg')
        },
        woodsman: {
            idlerImage : this.loader.addImage('images/sprites/woodsman/idle_right.png'),
            idlelImage : this.loader.addImage('images/sprites/woodsman/idle_left.png'),
            tiles: this.loader.addImage('images/sprites/woodsman/tiles.png'),
            // bg: this.loader.addImage('images/sprites/woodsman/bg.jpg')
        }
    };

    this.sounds = {
        ghost: {
            bgm: new buzz.sound('audio/ghost/bgm', {
                formats: ['mp3', 'ogg'],
                preload: true,
                loop: true
            }),
            take: new buzz.sound('audio/ghost/ghost_take', {
                formats: ['mp3', 'ogg'],
                preload: true,
                loop: false
            }),
            leave: new buzz.sound('audio/ghost/ghost_leave', {
                formats: ['mp3', 'ogg'],
                preload: true,
                loop: false
            })
        },
        oldwoman: {
            bgm: new buzz.sound('audio/oldwoman/bgm', {
                formats: ['mp3', 'ogg'],
                preload: true,
                loop: true
            })
        },
        woodsman: {
            bgm: new buzz.sound('audio/woodsman/bgm', {
                formats: ['mp3', 'ogg'],
                preload: true,
                loop: true
            }),
            fx: new buzz.sound('audio/woodsman/fx', {
                formats: ['mp3', 'ogg'],
                preload: true,
                loop: false
            })
        },
        cat: {
            bgm: new buzz.sound('audio/cat/bgm', {
                formats: ['mp3', 'ogg'],
                preload: true,
                loop: true
            }),
            fx: new buzz.sound('audio/cat/fx', {
                formats: ['mp3', 'ogg'],
                preload: true,
                loop: false
            })
        }
    };

    // Progression bar
    this.loader.addProgressListener(function(e) {
        console.log(e.completedCount * 100 / e.totalCount + '%');
    });

    // Starting the loading
    this.loader.addCompletionListener(this.init);
    this.loader.start();
}

/**
 * The main game loop
 */
Game.update = function() {
    var canvas  = Game.canvas,
        context = Game.context;

    Game.frameCount++;

    // Clearing the canvas
    context.fillStyle = 'rgb(127, 127, 127)';
    context.fillRect(0, 0, Game.CANVAS_WIDTH, Game.CANVAS_HEIGHT);
    // context.drawImage(Game.images[Game.player.name].bg, Game.map.scrollX, Game.map.scrollY, Game.CANVAS_WIDTH, Game.CANVAS_HEIGHT, 0, 0, Game.CANVAS_WIDTH, Game.CANVAS_HEIGHT);

    // We draw the map after the character
    Game.map.draw(context);

    // Updating all the entities
    // The index of a NPC corresponds to the position of it in the tilemap
    for (entity in Game.npcs) {
        if (Game.npcs.hasOwnProperty(entity)) {
            npc = Game.npcs[entity];
            npc.update();
            // If the character steps out of the view, we destroy it
            if (npc.x < -npc.body.width || npc.x > Game.CANVAS_WIDTH || npc.y < -npc.body.height || npc.y > Game.CANVAS_HEIGHT) {
                delete Game.npcs[entity];
                continue;
            }
            npc.render(context);
        }
    }


    // Updating and rendering the player's character
    Game.player.update();
    Game.player.render(context);
    Game.player.control();
    if (Game.player.renderFX) {
        Game.player.renderFX();
    }

    if (Game.intensity > 0){
        Game.context.fillStyle = 'rgba(0, 0, 0, '+ Game.intensity + ')';
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