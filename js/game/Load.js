define(['json!../../data/assets/assets.json', 'PxLoader', 'PxLoaderImage', 'buzz', 'game/Globals'],

function(assets, PxLoader, PxLoaderImage, buzz, Globals) {

    var Loader = {};

    /**
     * Parses the images data from the json file and add the images to PxLoader
     * @param  {Game} game The game instance
     * @param  {object} data The file data
     * @return {object}      The new object with assets added to PxLoader
     */
    var parseImageData = function(game, data) {
        var obj = data, prop, current;
        for (prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                current = obj[prop];
                if (typeof current === 'object' && current.length == undefined) {
                    parseImageData(game, current)
                } else {
                    obj[prop] = game.loader.addImage(Globals.IMAGE_PATH + current[0], current[1]);
                }
            }
        }
        return obj;
    };


    /**
     * Parses the sounds data from the json file and add the sounds to Buzz
     * @param  {Game} game The game instance
     * @param  {object} data The file data
     * @return {object}      The new object with assets added to Buzz
     */
    var parseSoundData = function(game, data) {
        var obj = data, prop, current;
        for (prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                current = obj[prop];
                if (typeof current === 'object' && current.length == undefined) {
                    if (current.path && current.formats && current.preload && current.loop) {
                        obj[prop] = new buzz.sound(Globals.AUDIO_PATH + current.path, {
                            formats: current.formats,
                            preload: current.preload,
                            loop: current.loop,
                        });
                    } else {
                        parseSoundData(game, current);
                    }
                }
            }
        }
        return obj;
    };

    /**
     * Loads the images for the game
     */
    Loader.addImages = function(game) {
        // Declaring all the assets in PxLoader
        game.assets.images = parseImageData(game, assets.images);
        ///////////////////////////////
        //           DEBUG           //
        // Test for more slow images //
        ///////////////////////////////
        // for (var i = 0; i < 40; i++) {
        //     game.assets[i] = game.loader.addImage('http://thinkpixellab.com/pxloader' + '/slowImage.php?delay=1&i=' + i, 'menu');
        // }
    };

    /**
     * Loads the sounds for the game
     */
    Loader.addSounds = function(game) {
        game.assets.sounds = parseSoundData(game, assets.audio);
    };

    /**
     * Adds all the assets list to the loader
     */
    Loader.addAssets = function(game) {
        game.loader = new PxLoader();
        this.addImages(game);
        this.addSounds(game);
    }

    /**
     * Loads the first menu data
     */
    Loader.loadInit = function(game) {
        var self = this;

        // Loader progression
        game.loader.addProgressListener(function(e) {
            if (!game.fsm.is('loading')) {
                return;
            }
            self.showLoadingText(e, game.context);
        }, ['loading', 'menu']);

        // Once the loading of the loader assets is done, go to the Loading state
        game.loader.addCompletionListener(function(e) {
            game.fsm.load();
        }, 'loading');

        // Once the loading of the menu assets is done, go to the Menu state
        game.loader.addCompletionListener(function(e) {
            game.fsm.showMenu();
        }, 'menu');

        // Starting the loading
        game.loader.start(['loading', 'menu'], true);
    };

    /**
     * Loads the game data
     */
    Loader.loadGame = function(game) {
        var self = this;

        // Loader progression
        game.loader.addProgressListener(function(e) {
            if (!game.fsm.is('loading')) {
                return;
            }
            self.showLoadingText(e, game.context);
        }, 'game');

        // Once the loading of the game assets is done, draw the canvas buffers go to the Game state
        game.loader.addCompletionListener(function(e) {
            // game.canvasBuffers = {};
            // var canvas, context;
            // for (var bgName in game.assets.images.backgrounds) {
            //     canvas = game.canvasBuffers[bgName] = document.createElement('canvas');
            //     canvas.width = 6400;
            //     canvas.height = 2400;
            //     context = canvas.getContext('2d');
            //     context.drawImage(game.assets.images.backgrounds[bgName],
            //         0, 0, canvas.width, canvas.height,
            //         0, 0, canvas.width, canvas.height);
            // }
            game.fsm.play();
        }, 'game');

        // Starting the loading
        game.fsm.load();
        game.loader.start('game', true);
    };

    /**
     * Shows the text "Loading" with the loaded percent
     * @param  {event} e The PxLoader event
     * @param  {Canvas2DContext} context The context to write in
     */
    Loader.showLoadingText = function(e, context) {
        context.font = 'bold 30px sans-serif';

        var loadingText = 'Loading ' + ((e.completedCount * 100 / e.totalCount) | 0) + '%',
            metrics = context.measureText(loadingText),
            textWidth = metrics.width,
            textHeight = 30;

        // Clearing the canvas
        context.fillStyle = 'rgb(0, 0, 0)';
        context.fillRect(0, 0, Globals.CANVAS_WIDTH, Globals.CANVAS_HEIGHT);

        // Writing the loading text
        context.fillStyle = '#89BC94';
        context.fillText(loadingText, (Globals.CANVAS_WIDTH >> 1) - (textWidth >> 1), (Globals.CANVAS_HEIGHT >> 1) - (textHeight >> 1));
    };

    return Loader;
});