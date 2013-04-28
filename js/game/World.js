define(['json!../../data/maps/common.json', 'json!../../data/maps/woodsman.json', 'json!../../data/maps/oldwoman.json', 'invert', 'pixastic'],
function(commonMap, woodsmanMap, oldwomanMap, invert, Pixastic) {
    var World = function() {
        this.tilemaps = {
            common: commonMap.map,
            woodsman: woodsmanMap.map,
            oldwoman: oldwomanMap.map
        }
        this.environment = 'common';
    };

    /**
     * Changes the world environment by applying an effect to the map, etc.
     * @param {String} env The name of the environment
     */
    World.prototype.setEnvironment = function(env) {
        this.environment = env;
    };

    return World;
});