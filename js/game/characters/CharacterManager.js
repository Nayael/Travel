// The CharacterManager class
define(['Engine', 'Engine/Map', 'game/characters/Character', 'game/characters/Ghost', 'game/characters/Cat', 'game/characters/Woodsman'],

function(Engine, Map, Character, Ghost, Cat, Woodsman) {

    /**
     * @constructor
     */
    var CharacterManager = function() { };

    /**
     * Constants
     */
    
    /**
     * The list of all the NPCs available in the game, and their values in the tilemap
     * @type {Object}
     */
    CharacterManager.INDEXES = {
        200: 'Cat',
        300: 'Oldwoman',
        400: 'Woodsman',
        500: 'Bat',
        600: 'Dove'
    };

    /**
     * Initializes all the characters in the scene
     * @param  {Array} tilemap The tilemap containing the characters
     */
    CharacterManager.prototype.init = function(tilemap) {
        
    };

    CharacterManager.prototype.update = function() {
        
    };

    /**
     * Takes possession of a NPC
     * @param  {Character} index The index of the NPC to possess
     */
    CharacterManager.prototype.possessCharacter = function(index) {
        // Game.previousPlayer = Game.player;
        // Game.map.overlayAlpha = 1;

        // Game.player = Game.npcs[index];
        // Game.map.scrollable = true;
        // delete Game.npcs[index];    // We delete the NPC from the game's NPCs

        // // We delete the NPC from it's position on the tilemap; we will re-add it when the possession stops, at the new position
        // var mapI = (index / Game.map.tilemap[0].length) | 0;
        // var mapJ = index - mapI * Game.map.tilemap[0].length;
        // window.maps.basic[mapI][mapJ] = 0;
        // window.maps.woodsman[mapI][mapJ] = 0;
        // window.maps.oldwoman[mapI][mapJ] = 0;
        // Game.map.tilemap[mapI][mapJ] = 0;

        // Game.player.onPossess();
        // Game.Sound.startBGM(Game.player.name);
        // Game.Sound.startTake();
    }

    /**
     * Stops the possession of a NPC
     * @param  {Character} npc The NPC to leave
     */
    CharacterManager.prototype.leaveCharacter  = function(npc) {
        // Can't leave a npc when colliding with another npc
        // for (var i in Game.npcs) {
        //     if (Game.npcs.hasOwnProperty(i) && npc.body.collide(Game.npcs[i])) {
        //         return;
        //     }
        // }
        // Game.previousPlayer = npc;
        // Game.map.overlayAlpha = 1;

        // var newIndex = ( (npc.realY / Game.map.TS) * Game.map.tilemap[0].length + (npc.realX / Game.map.TS) ) | 0;
        // Game.useGhost();
        // Game.npcs[newIndex] = npc;

        // // We recreate the NPC inside the tilemap at his new position
        // var mapI = (newIndex / Game.map.tilemap[0].length) | 0;
        // var mapJ = newIndex - mapI * Game.map.tilemap[0].length;
        // Game.map.tilemap = window.maps.basic;     // Getting the map from the global object
        // Game.map.tilemap[mapI][mapJ] = npc.npcValue;
        // window.maps.basic[mapI][mapJ] = npc.npcValue;
        // window.maps.woodsman[mapI][mapJ] = npc.npcValue;
        // window.maps.oldwoman[mapI][mapJ] = npc.npcValue;

        // Game.player.x = npc.x;
        // Game.player.y = npc.y - Game.map.TS;
        // Game.Sound.startLeave();
        // npc.onLeave();
    }

    /**
     * Creates a NPC on the map
     * @param  {integer} value The type of npc to create
     * @param  {integer} x
     * @param  {integer} y
     */
    CharacterManager.prototype.pop = function(value, x, y) {
        // If there is no NPC for the given value, return
        // if (!CharacterManager.list[value]) {
        //     return;
        // }

        // // We create the NPC regarding the value given in the tile
        // var npcMapIndex = y * Game.map.tilemap[0].length + x;
        // Game.npcs[npcMapIndex] = new Character.list[value](x * Game.map.TS - Game.map.scrollX, y * Game.map.TS - Game.map.scrollY);
        // Game.npcs[npcMapIndex].npcMapIndex = npcMapIndex;
        // Game.npcs[npcMapIndex].npcValue = value;
    };

    return new CharacterManager();
});