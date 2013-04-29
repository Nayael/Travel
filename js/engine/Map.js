// The Map class file
define(function() {
    /**
     * @constructor
     * @param {Canvas2D} canvas The map's canvas
     */
    var Map = function(canvas) {
        this.canvas = canvas;
        this.CANVAS_WIDTH  = this.canvas.width;
        this.CANVAS_HEIGHT = this.canvas.height;
        this.background    = null;
        this.overlayAlpha  = 1;


        this.buffer = document.createElement('canvas');
        this.buffer.width = this.canvas.width;
        this.buffer.height = this.canvas.height;
        this.bufferCtx = this.buffer.getContext('2d');
        
        this.yShiftUp   = 0;    // The y position of the square tiles in the tiles spritesheet
        this.yShiftDown = 4;    // The height of extra graphics on the bottom of the tile
        this.TS         = 32;   // The size of a tile in pixels
        this.obstacles  = [1, 2, 3, 4, 5, 6, 7, 8, 18, 19, 20, 50];   // Indexes in the tilemap that correspond to physical obstacles
        this.npcs       = [200, 300, 400, 500, 600];
        this.items      = [21, 22, 9, 10, 11, 12, 13, 14, 15, 16, 17, 1000];
        this.tilemap    = [];        // Getting the map from the global object
        this.tilesheet  = null;

        this.scrollable = true;
        this.scrollX    = 512;
        this.scrollY    = 1792;
        this.scrollXMin = this.CANVAS_WIDTH >> 2;
        this.scrollXMax = this.CANVAS_WIDTH - this.scrollXMin;
        this.scrollYMin = this.CANVAS_HEIGHT >> 2;
        this.scrollYMax = this.CANVAS_HEIGHT - this.scrollYMin;
        
        this.limitX     = 6400 - this.CANVAS_WIDTH;
        this.limitY     = 2400 - this.CANVAS_HEIGHT;
    };

    /**
     * Draws the map
     */
    Map.prototype.draw = function() {
        var context = this.canvas.getContext('2d');
        var rows = this.CANVAS_HEIGHT / this.TS + 2,
            cols, tileX, tileY;

        this.bufferCtx.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        for (var i = ((this.scrollY / this.TS) | 0), j = 0; i < ((this.scrollY / this.TS) | 0) + rows; i++) {
            cols = this.CANVAS_WIDTH / this.TS + 2;
            for (j = ((this.scrollX / this.TS) | 0); j < cols + ((this.scrollX / this.TS) | 0); j++) {
                tileX = ((j * this.TS - this.scrollX)) | 0;
                tileY = ((i * this.TS - this.scrollY) - this.yShiftUp) | 0;

                // Drawing tiles
                if (((this.obstacles.indexOf(this.tilemap[i][j]) != -1 && this.tilemap[i][j] != 50) || this.items.indexOf(this.tilemap[i][j]) != -1) && tileX > -this.TS && tileX < this.CANVAS_WIDTH && tileY > -this.TS && tileY < this.CANVAS_HEIGHT) {
                    this.bufferCtx.drawImage(this.tilesheet,
                        this.tilemap[i][j] * this.TS, 0, this.TS, this.TS + this.yShiftUp + this.yShiftDown,
                        tileX, tileY, this.TS, this.TS + this.yShiftUp + this.yShiftDown);

                // Creating NPCs that will be drawn
                } else if (this.npcs.indexOf(this.tilemap[i][j]) != -1 && tileX > -this.TS && tileX < this.CANVAS_WIDTH && tileY > -this.TS && tileY < this.CANVAS_HEIGHT) {
                    // If the NPC ins't already on the stage
                    // if (Game.npcs[i * this.tilemap[i].length + j] == undefined && entity.npcMapIndex != (i * this.tilemap[i].length + j)) {
                    //     Game.Npc.pop(this.tilemap[i][j], j, i);
                    // }
                }
            }
        }
        context.drawImage(this.buffer, 0, 0);

        // if (Game.previousPlayer && Game.previousPlayer.useTileFade && this.overlayAlpha > 0) {
        //     context.globalAlpha = this.overlayAlpha;
        //     for (i = ((this.scrollY / this.TS) | 0), j = 0; i < ((this.scrollY / this.TS) | 0) + rows; i++) {
        //         cols = this.CANVAS_WIDTH / this.TS + 2;
        //         for (j = ((this.scrollX / this.TS) | 0); j < cols + ((this.scrollX / this.TS) | 0); j++) {
        //             tileX = (j * this.TS - this.scrollX);
        //             tileY = (i * this.TS - this.scrollY) - this.yShiftUp;
        //             // Drawing tiles
        //             if ((this.obstacles.indexOf(this.tilemap[i][j]) != -1 && this.tilemap[i][j] != 50) && tileX > -this.TS && tileX < this.CANVAS_WIDTH && tileY > -this.TS && tileY < this.CANVAS_HEIGHT) {
        //                 context.drawImage(Game.images[Game.previousPlayer.name].tiles,
        //                     this.tilemap[i][j] * this.TS, 0, this.TS, this.TS + this.yShiftUp + this.yShiftDown, 
        //                     tileX, tileY, this.TS, this.TS + this.yShiftUp + this.yShiftDown);
        //             }
        //         }
        //     }
        //     context.globalAlpha = 1;
        //     this.overlayAlpha -= 0.05;
        // }
    };

    /**
     * Draws the background
     */
    Map.prototype.drawBackground = function() {
        var context = this.canvas.getContext('2d');
        context.drawImage(this.background,
            this.scrollX, this.scrollY, this.CANVAS_WIDTH, this.CANVAS_HEIGHT,
            0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        
        // if (Game.previousPlayer && Game.previousPlayer.useTileFade && this.overlayAlpha > 0) {
        //     context.globalAlpha = this.overlayAlpha;
        //     context.drawImage(Game.contextBuffers[Game.previousPlayer.name].canvas, this.scrollX, this.scrollY);
        //     context.globalAlpha = 1;
        // }

        // context.drawImage(Game.images[entity.name].bg, this.scrollX, this.scrollY, this.CANVAS_WIDTH, this.CANVAS_HEIGHT, 0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        // if (Game.previousPlayer && Game.previousPlayer.useTileFade && this.overlayAlpha > 0) {
        //     context.globalAlpha = this.overlayAlpha;
        //     context.drawImage(Game.images[Game.previousPlayer.name].bg, this.scrollX, this.scrollY, this.CANVAS_WIDTH, this.CANVAS_HEIGHT, 0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        //     context.globalAlpha = 1;
        // }

        /*var bgXIndex = ((this.scrollX / this.CANVAS_WIDTH) | 0),
            bgYIndex = ((this.scrollY / this.CANVAS_HEIGHT) | 0),
            yMin = (bgYIndex > 0 ? bgYIndex - 1 : bgYIndex),
            yMax = (this.scrollY < this.limitY ? bgYIndex + 1 : (bgYIndex)),
            xMin = (bgXIndex > 0 ? bgXIndex - 1 : bgXIndex),
            xMax = (this.scrollX < this.limitX ? bgXIndex + 1 : (bgXIndex));
        for (var i = yMin; i <= yMax; i++) {
            for (var j = xMin; j <= xMax; j++) {
                var realX = (j * this.CANVAS_WIDTH - this.scrollX) | 0;
                var realY = (i * this.CANVAS_HEIGHT - this.scrollY) | 0;
                // context.drawImage(Game.images[entity.name]['bg_' + (i * (6400 / this.CANVAS_WIDTH) + j + 1)],
                    // 0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT,
                    // realX, realY, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
            }
        }*/

        // if (Game.previousPlayer && Game.previousPlayer.useTileFade && this.overlayAlpha > 0) {
        //     context.globalAlpha = this.overlayAlpha;
        //     for (i = yMin; i <= yMax; i++) {
        //         for (j = xMin; j <= xMax; j++) {
        //             realX = (j * this.CANVAS_WIDTH - this.scrollX) | 0;
        //             realY = (i * this.CANVAS_HEIGHT - this.scrollY) | 0;
        //             context.drawImage(Game.images[Game.previousPlayer.name]['bg_' + (i * (6400 / this.CANVAS_WIDTH) + j + 1)],
        //                 0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT,
        //                 realX, realY, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        //         }
        //     }
        //     context.globalAlpha = 1;
        // }
    };

    /**
     * Moves the map scrolling with the player's character
     * @param  {Entity} entity The entity that triggered the scrolling
     * @param  {Number} dX The distance the player is moving on the X-axis
     * @param  {Number} dY The distance the player is moving on the Y-axis
     */
    Map.prototype.scroll = function(entity, dX, dY) {
        // X-axis scrolling
        if (this.scrollX != this.limitX && dX > 0 && (entity.x + entity.body.width) > this.scrollXMax) {
            entity.x = this.scrollXMax - entity.body.width;
            this.scrollX += dX;
        } else if (this.scrollX != 0 && dX < 0 && entity.x < this.scrollXMin) {
            entity.x = this.scrollXMin;
            this.scrollX += dX;
        }

        // Y-axis scrolling
        if (this.scrollY != this.limitY && dY > 0 && entity.y + entity.body.height > this.scrollYMax) {
            entity.y = this.scrollYMax - entity.body.height;
            this.scrollY += dY;
        } else if (this.scrollY != 0 && dY < 0 && entity.y < this.scrollYMin) {
            entity.y = this.scrollYMin;
            this.scrollY += dY;
        }
        console.log(this.scrollY);

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
     * @param {Entity} entity The entity that triggered the scrolling
     */
    Map.prototype.autoScroll = function(entity) {
        // If the scroll is already OK, don't do anything
        if (entity.x >= this.scrollXMin && entity.x <= this.scrollXMax && entity.y >= this.scrollYMin && entity.y <= this.scrollYMax) {
            return;
        }

        var dX = 0, dY = 0;
        var self = this;

        var xInterval = 0, yInterval = 0;

        // Y-axis scrolling
        if (entity.y < this.scrollYMin) {
            dY = this.scrollYMin - entity.y;
        } else if(entity.y + entity.body.height > this.scrollYMax) {
            dY = this.scrollYMax - (entity.y + entity.body.height);
        }

        if (dY != 0) {
            // yInterval = (Game.Npc.STUN_TIME / Math.abs(dY)) | 0;
            self.scrollY += dY < 0 ? 3 : -3;
            var yTimer = setInterval(function() {
                if (!self.scrollable || self.scrollY == self.limitY || self.scrollY == 0 || (entity.y >= self.scrollYMin && entity.y + entity.body.height <= self.scrollYMax)) {
                    clearInterval(yTimer);
                    return;
                }
                self.scrollY += dY < 0 ? 3 : -3;
            }, yInterval);
        }

        // X-axis scrolling
        if (entity.x < this.scrollXMin) {
            dX = this.scrollXMin - entity.x;
        } else if(entity.x + entity.body.width > this.scrollXMax) {
            dX = this.scrollXMax - (entity.x + entity.body.width);
        }

        if (dX != 0) {
            // xInterval = (Game.Npc.STUN_TIME / Math.abs(dX)) | 0;
            self.scrollX += dX < 0 ? 3 : -3;
            var xTimer = setInterval(function() {
                if (!self.scrollable || self.scrollX == self.limitX || self.scrollX == 0 || (entity.x >= self.scrollXMin && entity.x + entity.body.width <= self.scrollXMax)) {
                    clearInterval(xTimer);
                    return;
                }
                self.scrollX += dX < 0 ? 3 : -3;
            }, xInterval);
        }
    };

    Map.prototype.setBackground = function(background) {
        this.background = background;
        this.limitX     = this.background.width - this.CANVAS_WIDTH;
        this.limitY     = this.background.height - this.CANVAS_HEIGHT;
    };

    return Map;
});