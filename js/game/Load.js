define(['json!../../data/assets/assets.json', 'PxLoader', 'PxLoaderImage', 'buzz'], function(assets, PxLoader, PxLoaderImage, buzz) {
    var Loader = {};

    /**
     * Loads the images for the game
     */
    Loader.addImages = function(game) {
        // Declaring all the assets in PxLoader
        game.Assets.images = {
            loading : game.loader.addImage(game.Assets.IMAGE_PATH + '/menu/loading.png', 'loading'),
            menus: {
                splashscreen: game.loader.addImage(game.Assets.IMAGE_PATH + '/menu/splashscreen.png', 'menu')
            },
            backgrounds: {
                normal: game.loader.addImage(game.Assets.IMAGE_PATH + '/bg/normal.jpg', 'game')
            },
            tiles: {
                normal: game.loader.addImage(game.Assets.IMAGE_PATH + '/tiles/normal.png', 'game'),
                ghost: game.loader.addImage(game.Assets.IMAGE_PATH + '/tiles/ghost.png', 'game'),
                cat: game.loader.addImage(game.Assets.IMAGE_PATH + '/tiles/cat.png', 'game'),
                bat: game.loader.addImage(game.Assets.IMAGE_PATH + '/tiles/bat.png', 'game'),
                oldwoman: game.loader.addImage(game.Assets.IMAGE_PATH + '/tiles/oldwoman.png', 'game')
            },
            characters: {
                ghost: {
                    idleSprite: game.loader.addImage(game.Assets.IMAGE_PATH + '/sprites/ghost/right.png', 'game'),
                    walkRSprite: game.loader.addImage(game.Assets.IMAGE_PATH + '/sprites/ghost/right.png', 'game'),
                    walkLSprite: game.loader.addImage(game.Assets.IMAGE_PATH + '/sprites/ghost/left.png', 'game'),
                    possLSprite: game.loader.addImage(game.Assets.IMAGE_PATH + '/sprites/ghost/poss_l.png', 'game'),
                    possRSprite: game.loader.addImage(game.Assets.IMAGE_PATH + '/sprites/ghost/poss_r.png', 'game')
                },
                cat: {
                    idleRSprite: game.loader.addImage(game.Assets.IMAGE_PATH + '/sprites/cat/idle_right.png', 'game'),
                    idleLSprite: game.loader.addImage(game.Assets.IMAGE_PATH + '/sprites/cat/idle_left.png', 'game'),
                    walkRSprite: game.loader.addImage(game.Assets.IMAGE_PATH + '/sprites/cat/right.png', 'game'),
                    walkLSprite: game.loader.addImage(game.Assets.IMAGE_PATH + '/sprites/cat/left.png', 'game'),
                    jumpRSprite: game.loader.addImage(game.Assets.IMAGE_PATH + '/sprites/cat/jump_r.png', 'game'),
                    jumpLSprite: game.loader.addImage(game.Assets.IMAGE_PATH + '/sprites/cat/jump_l.png', 'game')
                },
                oldwoman: {
                    idleRSprite: game.loader.addImage(game.Assets.IMAGE_PATH + '/sprites/oldwoman/idle_right.png', 'game'),
                    idleLSprite: game.loader.addImage(game.Assets.IMAGE_PATH + '/sprites/oldwoman/idle_left.png', 'game'),
                    walkRSprite: game.loader.addImage(game.Assets.IMAGE_PATH + '/sprites/oldwoman/right.png', 'game'),
                    walkLSprite: game.loader.addImage(game.Assets.IMAGE_PATH + '/sprites/oldwoman/left.png', 'game')
                },
                woodsman: {
                    idleRSprite: game.loader.addImage(game.Assets.IMAGE_PATH + '/sprites/woodsman/idle_right.png', 'game'),
                    idleLSprite: game.loader.addImage(game.Assets.IMAGE_PATH + '/sprites/woodsman/idle_left.png', 'game'),
                    walkRSprite: game.loader.addImage(game.Assets.IMAGE_PATH + '/sprites/woodsman/right.png', 'game'),
                    walkLSprite: game.loader.addImage(game.Assets.IMAGE_PATH + '/sprites/woodsman/left.png', 'game'),
                    jumpRSprite: game.loader.addImage(game.Assets.IMAGE_PATH + '/sprites/woodsman/jump_r.png', 'game'),
                    jumpLSprite: game.loader.addImage(game.Assets.IMAGE_PATH + '/sprites/woodsman/jump_l.png', 'game')
                },
                bat: {
                    walkRSprite: game.loader.addImage(game.Assets.IMAGE_PATH + '/sprites/bat/right.png', 'game'),
                    walkLSprite: game.loader.addImage(game.Assets.IMAGE_PATH + '/sprites/bat/left.png', 'game')
                },
                dove: {
                    walkRSprite: game.loader.addImage(game.Assets.IMAGE_PATH + '/sprites/dove/right.png', 'game'),
                    walkLSprite: game.loader.addImage(game.Assets.IMAGE_PATH + '/sprites/dove/left.png', 'game'),
                    idleRSprite: game.loader.addImage(game.Assets.IMAGE_PATH + '/sprites/dove/idle_right.png', 'game'),
                    idleLSprite: game.loader.addImage(game.Assets.IMAGE_PATH + '/sprites/dove/idle_left.png', 'game')
                },
            },
            items: {
                papers: {
                    1: game.loader.addImage(game.Assets.IMAGE_PATH + '/papers/1.png', 'game'),
                    2: game.loader.addImage(game.Assets.IMAGE_PATH + '/papers/2.png', 'game'),
                    3: game.loader.addImage(game.Assets.IMAGE_PATH + '/papers/3.png', 'game'),
                    4: game.loader.addImage(game.Assets.IMAGE_PATH + '/papers/4.png', 'game'),
                    5: game.loader.addImage(game.Assets.IMAGE_PATH + '/papers/5.png', 'game'),
                    6: game.loader.addImage(game.Assets.IMAGE_PATH + '/papers/6.png', 'game'),
                    7: game.loader.addImage(game.Assets.IMAGE_PATH + '/papers/7.png', 'game'),
                    8: game.loader.addImage(game.Assets.IMAGE_PATH + '/papers/8.png', 'game'),
                    9: game.loader.addImage(game.Assets.IMAGE_PATH + '/papers/9.png', 'game'),
                    10: game.loader.addImage(game.Assets.IMAGE_PATH + '/papers/10.png', 'game')
                }
            }
        };
///////////////////////////////
//           DEBUG           //
// Test for more slow images //
///////////////////////////////
// for (var i = 0; i < 40; i++) {
//     game.Assets[i] = game.loader.addImage('http://thinkpixellab.com/pxloader' + '/slowImage.php?delay=1&i=' + i, 'menu');
// }
    };

    /**
     * Loads the sounds for the game
     */
    Loader.addSounds = function(game) {
        game.Assets.sounds = {};

        var sound, propChild;
        for (var prop in assets.audio) {
            for (propChild in assets.audio[prop]) {
                if (game.Assets.sounds[prop] == undefined) {
                    game.Assets.sounds[prop] = {}
                }
                sound = assets.audio[prop];
                game.Assets.sounds[prop][propChild] = new buzz.sound(game.Assets.AUDIO_PATH + sound.path, {
                    formats: sound.formats,
                    preload: sound.preload,
                    loop: sound.loop,
                });
            }
        }
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
            self.showLoadingText(e, game.context, game.CANVAS_WIDTH, game.CANVAS_HEIGHT);
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
            self.showLoadingText(e, game.context, game.CANVAS_WIDTH, game.CANVAS_HEIGHT);
        }, 'game');

        // Once the loading of the game assets is done, draw the canvas buffers go to the Game state
        game.loader.addCompletionListener(function(e) {
            game.canvasBuffers = {};
            var canvas, context;
            for (var bgName in game.Assets.images.backgrounds) {
                canvas = game.canvasBuffers[bgName] = document.createElement('canvas');
                canvas.width = 6400;
                canvas.height = 2400;
                context = canvas.getContext('2d');
                context.drawImage(game.Assets.images.backgrounds[bgName],
                    0, 0, canvas.width, canvas.height,
                    0, 0, canvas.width, canvas.height);
            }
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
     * @param  {integer} CANVAS_WIDTH    The canvas' width
     * @param  {integer} CANVAS_HEIGHT   The canvas' height
     */
    Loader.showLoadingText = function(e, context, CANVAS_WIDTH, CANVAS_HEIGHT) {
        context.font = 'bold 30px sans-serif';

        var loadingText = 'Loading ' + ( (e.completedCount * 100 / e.totalCount) | 0 ) + '%',
            metrics     = context.measureText(loadingText),
            textWidth   = metrics.width,
            textHeight  = 30;

        // Clearing the canvas
        context.fillStyle = 'rgb(0, 0, 0)';
        context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Writing the loading text
        context.fillStyle = '#89BC94';
        context.fillText(loadingText, (CANVAS_WIDTH >> 1) - (textWidth >> 1), (CANVAS_HEIGHT >> 1) - (textHeight >> 1));
    };

    return Loader;
});