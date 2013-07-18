define(['json!../../data/maps/fx.json', 'json!../../data/maps/common.json', 'json!../../data/maps/woodsman.json', 'json!../../data/maps/oldwoman.json', 'Engine/Map', 'invert', 'pixastic'],

function(mapsFx, common, woodsman, oldwoman, Map, invert, Pixastic) {

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
     * @param {Object} assets   The game's assets list
     */
    World.prototype.setEnvironment = function(env, assets) {
        this.environment = env;

        // If there is a specific background for the given environment
        if (assets.images.backgrounds[env] != undefined) {
            Map.setBackground(assets.images.backgrounds[env]);
        } else {
            Map.setBackground(assets.images.backgrounds.common);
        }
        
        if (this.tilemaps[env] != undefined) {
            Map.tilemap = this.tilemaps[env];
        } else {
            Map.tilemap = this.tilemaps.common;
        }

        if (assets.images.tiles[env] != undefined) {
            Map.tilesheet = assets.images.tiles[env]
        } else {
            Map.tilesheet = assets.images.tiles.common;
        }
        
        // If there is a specific fx to apply to the map for the given environment
        if (mapsFx[env] != undefined) {
            // Map.setBackground(Pixastic.process(Map.background, mapsFx[env][0], mapsFx[env][1] || {}));
        }
    };

    return World;
});