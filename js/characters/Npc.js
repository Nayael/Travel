// The Npc class
(function() {
    var Npc = {};

    /**
     * Takes possession of a NPC
     * @param  {Character} i The index of the NPC to possess
     */
    Npc.possessNpc = function(i) {
        Game.player = Game.npcs[i];
        Game.map.scrollable = true;
        Game.npcs.splice(i, 1);
    }

    /**
     * Stops the possession of a NPC
     * @param  {Character} npc The NPC to leave
     */
    Npc.leaveNpc = function(npc) {
        Game.useGhost();
        Game.npcs.push(npc);
        Game.player.x = npc.x;
        Game.player.y = npc.y - Game.map.TS;
    }

    Game.Npc = Npc;
})();