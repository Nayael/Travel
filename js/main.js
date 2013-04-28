// Main game file
(function(Game) {
    /**
     * Starts a new game
     */
    Game.startGame = function() {
        this.context.drawImage(this.canvasBuffers.normal, 0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT, 0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);

        // Launching the main loop
        // onEachFrame(Game.update);
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
        this.paused = true;
    }

    /**
     * Resumes the game
     */
    Game.resume = function() {
        this.paused = false;
    }
})(Game);