/**
 * Preloads the assets
 */
window.onload = function() {
    Game.CANVAS_WIDTH  = 800;
    Game.CANVAS_HEIGHT = 576;
    Game.canvas        = document.createElement('canvas');
    // Adding the canvas to the stage
    document.body.appendChild(Game.canvas);

    Game.context       = Game.canvas.getContext('2d');
    Game.canvas.id     = 'main';
    Game.canvas.width  = Game.CANVAS_WIDTH;
    Game.canvas.height = Game.CANVAS_HEIGHT;
    Game.context.fillStyle = 'rbg(0, 0, 0)';
    Game.context.fillRect(0, 0, Game.CANVAS_WIDTH, Game.CANVAS_HEIGHT);
    Game.load();
    Game.isOver = false;
};
