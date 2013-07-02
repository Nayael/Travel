define(['json!../../data/maps/fx.json', 'json!../../data/maps/common.json', 'json!../../data/maps/woodsman.json', 'json!../../data/maps/oldwoman.json', 'invert', 'pixastic'],
function(mapsFx, common, woodsman, oldwoman, invert, Pixastic) {

    /**
     * @constructor
     */
    var World = function() {
        this.tilemaps = {
            common: common.map,
            woodsman: woodsman.map,
            oldwoman: oldwoman.map
        };
    };

    /**
     * Changes the world environment by applying an effect to the map, etc.
     * @param {String} env      The name of the environment
     * @param {Map}    map      The map to change with the environment
     * @param {Object} assets   The game's assets list
     */
    World.prototype.setEnvironment = function(env, map, assets) {
        this.environment = env;

        // If there is a specific background for the given environment
        if (assets.images.backgrounds[env] != undefined) {
            map.setBackground(assets.images.backgrounds[env]);
        } else {
            map.setBackground(assets.images.backgrounds.common);
        }
        
        if (this.tilemaps[env] != undefined) {
            map.tilemap = this.tilemaps[env];
        } else {
            map.tilemap = this.tilemaps.common;
        }

        if (assets.images.tiles[env] != undefined) {
            map.tilesheet = assets.images.tiles[env]
        } else {
            map.tilesheet = assets.images.tiles.common;
        }
        
        // If there is a specific fx to apply to the map for the given environment
        if (mapsFx[env] != undefined) {
            // map.setBackground(Pixastic.process(map.background, mapsFx[env][0], mapsFx[env][1] || {}));
        }
    };

    return World;
});