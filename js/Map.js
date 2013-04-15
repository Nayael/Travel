// The Map class file
(function() {
    var Map = function() {
        this.TS = 32;           // The size of a tile in pixels
        this.obstacles = [1];   // Indexes in the tilemap that correspond to physical obstacles
        this.tilemap = window.map;   // Getting the map from the global object
    };

    /**
     * Draws the map
     * @param  {Canvas2DContext} context The 2D context of the canvas to render in
     */
    Map.prototype.draw = function(context) {
        var rows = this.tilemap.length,
            cols;
        for (var i = 0, j = 0; i < rows; i++) {
            cols = this.tilemap[i].length;
            for (j = 0; j < cols; j++) {
                if (this.tilemap[i][j] == 1) {
////////////////////////////
//        TEMPORARY       //
// Drawing filled squares //
////////////////////////////
                    context.fillStyle = 'rgb(255, 0, 0)';
                    context.fillRect(j * this.TS, i * this.TS, this.TS, this.TS);
                }
            }
        }
    };

    Game.Map = Map;
})();