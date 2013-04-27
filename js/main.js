// Main game file
(function(Game) {
    /**
     * Initializes the game
     */
    // Game.launch = function(e) {
    //     Game.canvas        = document.createElement('canvas');
    //     Game.canvas.id     = 'main';
    //     Game.canvas.width  = Game.CANVAS_WIDTH;
    //     Game.canvas.height = Game.CANVAS_HEIGHT;
    //     Game.context       = Game.canvas.getContext('2d');
    //     Game.frameCount    = 0;
    //     Game.paused        = false;

    //     Game.intensity = 1;

    //     Game.map      = new Game.Map();
    //     Game.useGhost();    // Playable character
    //     Game.player.x = 20;
    //     Game.player.y = 400;

    //     Game.Vec2     = illuminated.Vec2;
    //     Game.Lamp     = illuminated.Lamp;
    //     Game.Lighting = illuminated.Lighting;
    //     Game.DarkMask = illuminated.DarkMask;
    //     Game.light1   = new Game.Lamp({
    //         position: new Game.Vec2(Game.player.x, Game.player.y),
    //         distance: 75,
    //         diffuse: 0.5,
    //         radius: 0,
    //         samples: 1,
    //         angle: 0,
    //         roughness: 0
    //     });

    //     Game.lighting1 = new Game.Lighting({
    //         light: Game.light1
    //     });
    //     Game.darkmask = new Game.DarkMask({
    //         lights: [Game.light1],
    //         color: 'rgba(0,0,0,1)'
    //     });

    //     Game.npcs = {};     // The non-playable characters displayed on the stage

    //     // Adding the canvas to the stage
    //     document.body.appendChild(Game.canvas);

    //     // Launching the main loop
    //     onEachFrame(Game.update);
    // };

    Game.startGame = function() {
        // Launching the main loop
        onEachFrame(Game.update);
    };

    /**
     * The main game loop
     */
    Game.update = function() {
        // var canvas  = Game.canvas,
        //     context = Game.context;

        // // Clearing the canvas
        // context.fillStyle = 'rgb(127, 127, 127)';
        // context.fillRect(0, 0, Game.CANVAS_WIDTH, Game.CANVAS_HEIGHT);
        // Game.map.drawBackground(context);

        // // We draw the map after the character
        // Game.map.draw(context);

        // // Updating all the entities
        // // The index of a NPC corresponds to the position of it in the tilemap
        // for (entity in Game.npcs) {
        //     if (Game.npcs.hasOwnProperty(entity)) {
        //         npc = Game.npcs[entity];
        //         npc.update();
        //         // If the character steps out of the view, we destroy it
        //         if (npc.x < -npc.body.width || npc.x > Game.CANVAS_WIDTH || npc.y < -npc.body.height || npc.y > Game.CANVAS_HEIGHT) {
        //             delete Game.npcs[entity];
        //             continue;
        //         }
        //         npc.render(context);
        //     }
        // }


        // // Updating and rendering the player's character
        // Game.player.update();
        // if (!Game.paused) {
        //     Game.player.render(context);
        //     Game.player.control();
        //     if (Game.player.renderFX) {
        //         Game.player.renderFX();
        //     }
        // }

        // if (Game.intensity > 0){
        //     Game.context.fillStyle = 'rgba(0, 0, 0, '+ Game.intensity + ')';
        //     Game.context.fillRect(0, 0, Game.canvas.width, Game.canvas.height);
        //     Game.intensity -= 0.005;
        // }
    };

    /**
     * Pauses the game
     */
    Game.pause = function() {
        this.canResume = false;
        this.paused = true;
    }

    /**
     * Resumes the game
     */
    Game.resume = function() {
        this.paused = false;
        this.Sound.startBGM(this.player.name);
    }
})(Game);