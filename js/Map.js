// The Map class file
(function() {
    var Map = function() {
        this.TS = 32;           // The size of a tile in pixels
        this.obstacles = [1];   // Indexes in the tilemap that correspond to physical obstacles
        this.npcs      = [2];   // Indexes in the tilemap that correspond to physical obstacles
        this.tilemap   = window.map;   // Getting the map from the global object

        this.scrollable = true;
        this.scrollX = 0;
        this.scrollY = 0;

        this.scrollXMin = 200;
        this.scrollXMax = 600;
        this.scrollYMin = 100;
        this.scrollYMax = 400;
    };

    /**
     * Draws the map
     * @param  {Canvas2DContext} context The 2D context of the canvas to render in
     */
    Map.prototype.draw = function(context) {
        var rows = this.tilemap.length,
            cols, tileX, tileY;
        for (var i = 0, j = 0; i < rows; i++) {
            cols = this.tilemap[i].length;
            for (j = 0; j < cols; j++) {
                tileX = (j * this.TS - this.scrollX);
                tileY = (i * this.TS - this.scrollY);
                if (this.obstacles.indexOf(this.tilemap[i][j]) != -1 && tileX > -this.TS && tileX < Game.CANVAS_WIDTH && tileY > -this.TS && tileY < Game.CANVAS_HEIGHT) {
////////////////////////////
//        TEMPORARY       //
// Drawing filled squares //
////////////////////////////
                    context.fillStyle = 'rgb(255, 0, 0)';
                    context.fillRect(tileX, tileY, this.TS, this.TS);
                } else if (this.npcs.indexOf(this.tilemap[i][j]) != -1 && tileX > -this.TS && tileX < Game.CANVAS_WIDTH && tileY > -this.TS && tileY < Game.CANVAS_HEIGHT) {
                    Game.createNpc(this.tilemap[i][j], j, i);
                }
            }
        }
    };

    Game.Map = Map;
})();