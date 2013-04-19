// The Item class
(function() {
    var Item = {};

    Item.papers = [
        [21, 55]
    ];

    /**
     * Picks up an item
     * @param  {integer} x The X coordinate of the item
     * @param  {integer} y The Y coordinate of the item
     */
    Item.pickUp = function(x, y) {
        var paper = 0;
        for (var i = 0; i < Item.papers.length; i++) {
            if (Item.papers[i][0] == x && Item.papers[i][1] == y) {
                paper = i + 1;
            }
        }
        if (paper == 0) {
            return;
        }
        Game.map.tilemap[y][x] = 0;
        Game.pause();
        Item.showPaper(paper);
    }

    /**
     * Shows the paper on the screen
     * @param  {integer} index The paper to show
     */
    Item.showPaper = function(index) {
        clearInterval(Game.player.sfxTimer);
        Game.Sound.startBGM('paper');
        Game.Sound.startFx('paper');
        Game.context.drawImage(Game.images.papers[index], 0, 0, Game.CANVAS_WIDTH, Game.CANVAS_HEIGHT, 0, 0, Game.CANVAS_WIDTH, Game.CANVAS_HEIGHT);
    }

    Game.Item = Item;
})();