// Initializing the game
Game.init();

window.onload = function() {
    // Adding the canvas to the stage
    document.body.appendChild(Game.canvas);

    // Launching the main loop
    onEachFrame(Game.update);
};
