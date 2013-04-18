// The Npc class
(function() {
    var Npc = {};

    // The list of all the NPCs available in the game, and their values in the tilemap
    Npc.list = {
        200: Game.Cat,
        300: Game.Oldwoman,
        400: Game.Woodsman
    }

    /**
     * Takes possession of a NPC
     * @param  {Character} index The index of the NPC to possess
     */
    Npc.possessNpc = function(index) {
        Game.player = Game.npcs[index];
        Game.map.scrollable = true;
        delete Game.npcs[index];    // We delete the NPC from the game's NPCs

        // We delete the NPC from it's position on the tilemap; we will re-add it when the possession stops, at the new position
        var mapI = (index / Game.map.tilemap[0].length) | 0;
        var mapJ = index - mapI * Game.map.tilemap[0].length;
        Game.map.tilemap[mapI][mapJ] = 0;

        Game.player.onPossess();
        Game.Sound.startBGM(Game.player.name);
        Game.Sound.startTake();

        Game.player.sfxTimer = setInterval(function() {
            Game.Sound.startFx(Game.player.name);
        }, 15000);
    }

    /**
     * Stops the possession of a NPC
     * @param  {Character} npc The NPC to leave
     */
    Npc.leaveNpc = function(npc) {
        // Can't leave a npc when colliding with another npc
        for (var i in Game.npcs) {
            if (Game.npcs.hasOwnProperty(i) && npc.body.collide(Game.npcs[i])) {
                return;
            }
        }
        clearInterval(Game.player.sfxTimer);
        var newIndex = ( (npc.realY / Game.map.TS) * Game.map.tilemap[0].length + (npc.realX / Game.map.TS) ) | 0;
        Game.useGhost();
        Game.npcs[newIndex] = npc;

        // We recreate the NPC inside the tilemap at his new position
        var mapI = (newIndex / Game.map.tilemap[0].length) | 0;
        var mapJ = newIndex - mapI * Game.map.tilemap[0].length;
        Game.map.tilemap[mapI][mapJ] = npc.npcValue;

        Game.player.x = npc.x;
        Game.player.y = npc.y - Game.map.TS;

        Game.Sound.startBGM(Game.player.name);
        Game.Sound.startLeave();
    }

    /**
     * Creates a NPC on the map
     * @param  {integer} value The type of npc to create
     * @param  {integer} x
     * @param  {integer} y
     */
    Npc.pop = function(value, x, y) {
        // If there is no NPC for the given value, return
        if (!Npc.list[value]) {
            return;
        }

        // We create the NPC regarding the value given in the tile
        var npcMapIndex = y * Game.map.tilemap[0].length + x;
        Game.npcs[npcMapIndex] = new Npc.list[value](x * Game.map.TS - Game.map.scrollX, y * Game.map.TS - Game.map.scrollY);
        Game.npcs[npcMapIndex].npcMapIndex = npcMapIndex;
        Game.npcs[npcMapIndex].npcValue = value;
    };

    Npc.STUN_TIME = 800;    // The time during which a character is not controllable after the possession

    Game.Npc = Npc;
})();