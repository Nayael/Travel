// The Map class file
(function() {
    var Map = function() {
        this.yShiftUp   = 0;    // The y position of the square tiles in the tiles spritesheet
        this.yShiftDown = 4;    // The height of extra graphics on the bottom of the tile
        this.TS         = 32;   // The size of a tile in pixels
        this.obstacles  = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 50];   // Indexes in the tilemap that correspond to physical obstacles
        this.npcs       = [200, 300, 400, 500];   // Indexes in the tilemap that correspond to physical obstacles
        this.items      = [21];
        this.tilemap    = window.map;        // Getting the map from the global object
        this.overlayAlpha = 1;

        this.scrollable = true;
        this.scrollX    = 512;
        this.scrollY    = 1792;

        this.scrollXMin = Game.CANVAS_WIDTH >> 2;
        this.scrollXMax = Game.CANVAS_WIDTH - this.scrollXMin;
        this.limitX     = 6400 - Game.CANVAS_WIDTH;
        this.scrollYMin = Game.CANVAS_HEIGHT >> 2;
        this.scrollYMax = Game.CANVAS_HEIGHT - this.scrollYMin;
        this.limitY     = 3456 - Game.CANVAS_HEIGHT;
    };

    /**
     * Draws the map
     * @param  {Canvas2DContext} context The 2D context of the canvas to render in
     */
    Map.prototype.draw = function(context) {
        var rows = Game.CANVAS_HEIGHT / this.TS + 2,
            cols, tileX, tileY;
        for (var i = ((this.scrollY / this.TS) | 0), j = 0; i < ((this.scrollY / this.TS) | 0) + rows; i++) {
            cols = Game.CANVAS_WIDTH / this.TS + 2;
            for (j = ((this.scrollX / this.TS) | 0); j < cols + ((this.scrollX / this.TS) | 0); j++) {
                tileX = (j * this.TS - this.scrollX);
                tileY = (i * this.TS - this.scrollY) - this.yShiftUp;
                // Drawing tiles
                if ((this.obstacles.indexOf(this.tilemap[i][j]) != -1 || this.items.indexOf(this.tilemap[i][j]) != -1) && tileX > -this.TS && tileX < Game.CANVAS_WIDTH && tileY > -this.TS && tileY < Game.CANVAS_HEIGHT) {
                    context.drawImage(Game.images[Game.player.name].tiles,
                        this.tilemap[i][j] * this.TS, 0, this.TS, this.TS + this.yShiftUp + this.yShiftDown,
                        tileX, tileY, this.TS, this.TS + this.yShiftUp + this.yShiftDown);
                // Creating NPCs that will be drawn
                } else if (this.npcs.indexOf(this.tilemap[i][j]) != -1 && tileX > -this.TS && tileX < Game.CANVAS_WIDTH && tileY > -this.TS && tileY < Game.CANVAS_HEIGHT) {
                    // If the NPC ins't already on the stage
                    if (Game.npcs[i * this.tilemap[i].length + j] == undefined && Game.player.npcMapIndex != (i * this.tilemap[i].length + j)) {
                        Game.Npc.pop(this.tilemap[i][j], j, i);
                    }
                }
            }
        }

        if (Game.previousPlayer && Game.previousPlayer.useTileFade && Game.map.overlayAlpha > 0) {
            context.globalAlpha = Game.map.overlayAlpha;
            for (i = ((this.scrollY / this.TS) | 0), j = 0; i < ((this.scrollY / this.TS) | 0) + rows; i++) {
                cols = Game.CANVAS_WIDTH / this.TS + 2;
                for (j = ((this.scrollX / this.TS) | 0); j < cols + ((this.scrollX / this.TS) | 0); j++) {
                    tileX = (j * this.TS - this.scrollX);
                    tileY = (i * this.TS - this.scrollY) - this.yShiftUp;
                    // Drawing tiles
                    if (this.obstacles.indexOf(this.tilemap[i][j]) != -1 && tileX > -this.TS && tileX < Game.CANVAS_WIDTH && tileY > -this.TS && tileY < Game.CANVAS_HEIGHT) {
                        context.drawImage(Game.images[Game.previousPlayer.name].tiles,
                            this.tilemap[i][j] * this.TS, 0, this.TS, this.TS + this.yShiftUp + this.yShiftDown, 
                            tileX, tileY, this.TS, this.TS + this.yShiftUp + this.yShiftDown);
                    }
                }
            }
            context.globalAlpha = 1;
            Game.map.overlayAlpha -= 0.05;
        }
    };

    /**
     * Draws the background
     * @param  {Canvas2DContext} context The context of the canvas to draw in
     */
    Map.prototype.drawBackground = function(context) {
        // context.drawImage(Game.images[Game.player.name].bg, this.scrollX, this.scrollY, Game.CANVAS_WIDTH, Game.CANVAS_HEIGHT, 0, 0, Game.CANVAS_WIDTH, Game.CANVAS_HEIGHT);
        // if (Game.previousPlayer && Game.previousPlayer.useTileFade && Game.map.overlayAlpha > 0) {
        //     context.globalAlpha = Game.map.overlayAlpha;
        //     context.drawImage(Game.images[Game.previousPlayer.name].bg, this.scrollX, this.scrollY, Game.CANVAS_WIDTH, Game.CANVAS_HEIGHT, 0, 0, Game.CANVAS_WIDTH, Game.CANVAS_HEIGHT);
        //     context.globalAlpha = 1;
        // }
        var bgXIndex = ((this.scrollX / Game.CANVAS_WIDTH) | 0),
            bgYIndex = ((this.scrollY / Game.CANVAS_HEIGHT) | 0),
            yMin = (bgYIndex > 0 ? bgYIndex - 1 : bgYIndex),
            yMax = (this.scrollY < this.limitY ? bgYIndex + 1 : (bgYIndex)),
            xMin = (bgXIndex > 0 ? bgXIndex - 1 : bgXIndex),
            xMax = (this.scrollX < this.limitX ? bgXIndex + 1 : (bgXIndex));

        for (var i = yMin; i <= yMax; i++) {
            for (var j = xMin; j <= xMax; j++) {
                var realX = j * Game.CANVAS_WIDTH - this.scrollX;
                var realY = i * Game.CANVAS_HEIGHT - this.scrollY;
                context.drawImage(Game.images[Game.player.name]['bg_' + (i * (6400 / Game.CANVAS_WIDTH) + j + 1)],
                    0, 0, Game.CANVAS_WIDTH, Game.CANVAS_HEIGHT,
                    realX, realY, Game.CANVAS_WIDTH, Game.CANVAS_HEIGHT);
            }
        }
        if (Game.previousPlayer && Game.previousPlayer.useTileFade && Game.map.overlayAlpha > 0) {
            context.globalAlpha = Game.map.overlayAlpha;
            for (var i = yMin; i <= yMax; i++) {
                for (var j = xMin; j <= xMax; j++) {
                    var realX = j * Game.CANVAS_WIDTH - this.scrollX;
                    var realY = i * Game.CANVAS_HEIGHT - this.scrollY;
                    context.drawImage(Game.images[Game.previousPlayer.name]['bg_' + (i * (6400 / Game.CANVAS_WIDTH) + j + 1)],
                        0, 0, Game.CANVAS_WIDTH, Game.CANVAS_HEIGHT,
                        realX, realY, Game.CANVAS_WIDTH, Game.CANVAS_HEIGHT);
                }
            }
            // context.drawImage(contextBuffer,sourceX,sourceY,)
            context.globalAlpha = 1;
        }
    };

    /**
     * Moves the map scrolling with the player's character
     * @param  {Number} dX The distance the player is moving on the X-axis
     * @param  {Number} dY The distance the player is moving on the Y-axis
     */
    Map.prototype.scroll = function(dX, dY) {
        // X-axis scrolling
        if (this.scrollX != this.limitX && dX > 0 && (Game.player.x + Game.player.body.width) > this.scrollXMax) {
            Game.player.x = this.scrollXMax - Game.player.body.width;
            this.scrollX += dX;
        } else if (this.scrollX != 0 && dX < 0 && Game.player.x < this.scrollXMin) {
            Game.player.x = this.scrollXMin;
            this.scrollX += dX;
        }

        // Y-axis scrolling
        if (this.scrollY != this.limitY && dY > 0 && Game.player.y + Game.player.body.height > this.scrollYMax) {
            Game.player.y = this.scrollYMax - Game.player.body.height;
            this.scrollY += dY;
        } else if (this.scrollY != 0 && dY < 0 && Game.player.y < this.scrollYMin) {
            Game.player.y = this.scrollYMin;
            this.scrollY += dY;
        }

        if (this.scrollX < 0) {
            this.scrollX = 0;
        } else if (this.scrollX > this.limitX) {
            this.scrollX = this.limitX;
        }
        
        if (this.scrollY < 0) {
            this.scrollY = 0;
        } else if (this.scrollY > this.limitY) {
            this.scrollY = this.limitY;
        }
    };

    /**
     * Automaticaly fix the scrolling
     */
    Map.prototype.autoScroll = function() {
        // If the scroll is already OK, don't do anything
        if (Game.player.x >= this.scrollXMin && Game.player.x <= this.scrollXMax && Game.player.y >= this.scrollYMin && Game.player.y <= this.scrollYMax) {
            return;
        }

        var dX = 0, dY = 0;
        var self = this;

        // X-axis scrolling
        if (Game.player.x < this.scrollXMin) {
            dX = this.scrollXMin - Game.player.x;
        } else if(Game.player.x + Game.player.body.width > this.scrollXMax) {
            dX = this.scrollXMax - (Game.player.x + Game.player.body.width);
        }

        var xInterval = 0, yInterval = 0;

        if (dX != 0) {
            xInterval = (Game.Npc.STUN_TIME / Math.abs(dX)) | 0;
            self.scrollX += dX < 0 ? 2 : -2;
            var xTimer = setInterval(function() {
                if (!self.scrollable || self.scrollX == self.limitX || self.scrollX == 0 || (Game.player.x >= self.scrollXMin && Game.player.x + Game.player.body.width <= self.scrollXMax)) {
                    clearInterval(xTimer);
                    return;
                }
                self.scrollX += dX < 0 ? 2 : -2;
            }, xInterval);
        }

        // Y-axis scrolling
        if (Game.player.y < this.scrollYMin) {
            dY = this.scrollYMin - Game.player.y;
        } else if(Game.player.y + Game.player.body.height > this.scrollYMax) {
            dY = this.scrollYMax - (Game.player.y + Game.player.body.height);
        }

        if (dY != 0) {
            yInterval = (Game.Npc.STUN_TIME / Math.abs(dY)) | 0;
            self.scrollY += dY < 0 ? 1 : -1;
            var yTimer = setInterval(function() {
                if (!self.scrollable || self.scrollY == self.limitY || self.scrollY == 0 || (Game.player.y >= self.scrollYMin && Game.player.y + Game.player.body.height <= self.scrollYMax)) {
                    clearInterval(yTimer);
                    return;
                }
                self.scrollY += dY < 0 ? 1 : -1;
            }, yInterval);
        }
    };

    Game.Map = Map;
})();