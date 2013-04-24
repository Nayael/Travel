(function() {
    var context;

    /**
     * Loads the images for the game
     */
    Game.addImages = function() {
        // var xhr = new AjaxRequest();

        // xhr.onreadystatechange = function() {
        //     if (xhr.readyState != 4) {
        //         return;
        //     }
        //     if (xhr.status != 200) {
        //         alert('Erreur lors du chargement des fichiers.');
        //         return;
        //     }
        //     var data = eval('(' + xhr.responseText + ')');
        //     console.log('data: ', data);
        // }

        // xhr.open('GET', 'data/config/images.json', true);
        // xhr.send();

        // Declaring all the assets in PxLoader
        this.Assets.images = {
            loading : new PxLoaderImage(this.Assets.IMAGE_PATH + '/menu/loading.png', 'loading'),
            menus: {
                splashscreen: new PxLoaderImage(this.Assets.IMAGE_PATH + '/menu/splashscreen.png', 'menu'),
                bg1: new PxLoaderImage(this.Assets.IMAGE_PATH + '/bg/bgMenu1.png', 'menu'),
                bg2: new PxLoaderImage(this.Assets.IMAGE_PATH + '/bg/bgMenu2.png', 'menu'),
                bg3: new PxLoaderImage(this.Assets.IMAGE_PATH + '/bg/bgMenu3.png', 'menu'),
                bg4: new PxLoaderImage(this.Assets.IMAGE_PATH + '/bg/bgMenu4.png', 'menu'),
                bg5: new PxLoaderImage(this.Assets.IMAGE_PATH + '/bg/bgMenu5.png', 'menu'),
                bg6: new PxLoaderImage(this.Assets.IMAGE_PATH + '/bg/bgMenu6.png', 'menu'),
                bg7: new PxLoaderImage(this.Assets.IMAGE_PATH + '/bg/bgMenu7.png', 'menu'),
                bg8: new PxLoaderImage(this.Assets.IMAGE_PATH + '/bg/bgMenu8.png', 'menu')
            },
            backgrounds: {
                bg1: new PxLoaderImage(this.Assets.IMAGE_PATH + '/bg/bg1.png', 'game'),
                bg2: new PxLoaderImage(this.Assets.IMAGE_PATH + '/bg/bg2.png', 'game'),
                bg3: new PxLoaderImage(this.Assets.IMAGE_PATH + '/bg/bg3.png', 'game'),
                bg4: new PxLoaderImage(this.Assets.IMAGE_PATH + '/bg/bg4.png', 'game')
            },
            tiles: {
                ghost: new PxLoaderImage(this.Assets.IMAGE_PATH + '/tiles/ghost.png', 'game'),
                cat: new PxLoaderImage(this.Assets.IMAGE_PATH + '/tiles/cat.png', 'game'),
                bat: new PxLoaderImage(this.Assets.IMAGE_PATH + '/tiles/bat.png', 'game'),
                woodsman: new PxLoaderImage(this.Assets.IMAGE_PATH + '/tiles/woodsman.png', 'game'),
                oldwoman: new PxLoaderImage(this.Assets.IMAGE_PATH + '/tiles/oldwoman.png', 'game'),
                dove: new PxLoaderImage(this.Assets.IMAGE_PATH + '/tiles/dove.png', 'game')
            },
            characters: {
                ghost: {
                    idleImage : new PxLoaderImage(this.Assets.IMAGE_PATH + '/sprites/ghost/right.png'),
                    walkRImage: new PxLoaderImage(this.Assets.IMAGE_PATH + '/sprites/ghost/right.png'),
                    walkLImage: new PxLoaderImage(this.Assets.IMAGE_PATH + '/sprites/ghost/left.png'),
                    tiles: new PxLoaderImage(this.Assets.IMAGE_PATH + '/sprites/ghost/tiles.png'),
                    possL: new PxLoaderImage(this.Assets.IMAGE_PATH + '/sprites/ghost/poss_l.png'),
                    possR: new PxLoaderImage(this.Assets.IMAGE_PATH + '/sprites/ghost/poss_r.png')
                },
                cat: {
                    idleRImage : new PxLoaderImage(this.Assets.IMAGE_PATH + '/sprites/cat/idle_right.png'),
                    idleLImage : new PxLoaderImage(this.Assets.IMAGE_PATH + '/sprites/cat/idle_left.png'),
                    walkRImage: new PxLoaderImage(this.Assets.IMAGE_PATH + '/sprites/cat/right.png'),
                    walkLImage: new PxLoaderImage(this.Assets.IMAGE_PATH + '/sprites/cat/left.png'),
                    tiles: new PxLoaderImage(this.Assets.IMAGE_PATH + '/sprites/cat/tiles.png'),
                    jumpRImage: new PxLoaderImage(this.Assets.IMAGE_PATH + '/sprites/cat/jump_r.png'),
                    jumpLImage: new PxLoaderImage(this.Assets.IMAGE_PATH + '/sprites/cat/jump_l.png')
                },
                oldwoman: {
                    idleRImage : new PxLoaderImage(this.Assets.IMAGE_PATH + '/sprites/oldwoman/idle_right.png'),
                    idleLImage : new PxLoaderImage(this.Assets.IMAGE_PATH + '/sprites/oldwoman/idle_left.png'),
                    walkRImage: new PxLoaderImage(this.Assets.IMAGE_PATH + '/sprites/oldwoman/right.png'),
                    walkLImage: new PxLoaderImage(this.Assets.IMAGE_PATH + '/sprites/oldwoman/left.png'),
                    tiles: new PxLoaderImage(this.Assets.IMAGE_PATH + '/sprites/oldwoman/tiles.png')
                },
                woodsman: {
                    idleRImage : new PxLoaderImage(this.Assets.IMAGE_PATH + '/sprites/woodsman/idle_right.png'),
                    idleLImage : new PxLoaderImage(this.Assets.IMAGE_PATH + '/sprites/woodsman/idle_left.png'),
                    walkRImage: new PxLoaderImage(this.Assets.IMAGE_PATH + '/sprites/woodsman/right.png'),
                    walkLImage: new PxLoaderImage(this.Assets.IMAGE_PATH + '/sprites/woodsman/left.png'),
                    jumpRImage: new PxLoaderImage(this.Assets.IMAGE_PATH + '/sprites/woodsman/jump_r.png'),
                    jumpLImage: new PxLoaderImage(this.Assets.IMAGE_PATH + '/sprites/woodsman/jump_l.png'),
                    tiles: new PxLoaderImage(this.Assets.IMAGE_PATH + '/sprites/woodsman/tiles.png')
                },
                bat: {
                    walkRImage: new PxLoaderImage(this.Assets.IMAGE_PATH + '/sprites/bat/right.png'),
                    walkLImage: new PxLoaderImage(this.Assets.IMAGE_PATH + '/sprites/bat/left.png'),
                    tiles: new PxLoaderImage(this.Assets.IMAGE_PATH + '/sprites/bat/tiles.png')
                },
                dove: {
                    walkRImage: new PxLoaderImage(this.Assets.IMAGE_PATH + '/sprites/dove/right.png'),
                    walkLImage: new PxLoaderImage(this.Assets.IMAGE_PATH + '/sprites/dove/left.png'),
                    idleRImage: new PxLoaderImage(this.Assets.IMAGE_PATH + '/sprites/dove/idle_right.png'),
                    idleLImage: new PxLoaderImage(this.Assets.IMAGE_PATH + '/sprites/dove/idle_left.png'),
                    tiles: new PxLoaderImage(this.Assets.IMAGE_PATH + '/sprites/dove/tiles.png')
                },
            },
            items: {
                papers: {
                    1: new PxLoaderImage(this.Assets.IMAGE_PATH + '/papers/1.png'),
                    2: new PxLoaderImage(this.Assets.IMAGE_PATH + '/papers/2.png'),
                    3: new PxLoaderImage(this.Assets.IMAGE_PATH + '/papers/3.png'),
                    4: new PxLoaderImage(this.Assets.IMAGE_PATH + '/papers/4.png'),
                    5: new PxLoaderImage(this.Assets.IMAGE_PATH + '/papers/5.png'),
                    6: new PxLoaderImage(this.Assets.IMAGE_PATH + '/papers/6.png'),
                    7: new PxLoaderImage(this.Assets.IMAGE_PATH + '/papers/7.png'),
                    8: new PxLoaderImage(this.Assets.IMAGE_PATH + '/papers/8.png'),
                    9: new PxLoaderImage(this.Assets.IMAGE_PATH + '/papers/9.png'),
                    10: new PxLoaderImage(this.Assets.IMAGE_PATH + '/papers/10.png')
                }
            }
        };

        /**
         * Adding menus images
         */
        this.loader.add(this.Assets.images.loading);
        this.loader.add(this.Assets.images.menus.splashscreen);

        /**
         * Adding all the backgrounds to the loader
         */
        for (var prop in this.Assets.images.backgrounds) {
            if (this.Assets.images.backgrounds.hasOwnProperty(prop)) {
                this.loader.add(this.Assets.images.backgrounds[prop]);
            }
        }

/** DEBUG
 * Adding all the backgrounds to the loader
 */
for (var prop in this.Assets.images.menus) {
    if (this.Assets.images.menus.hasOwnProperty(prop)) {
        this.loader.add(this.Assets.images.menus[prop]);
    }
}
    };    

    /**
     * Loads the sounds for the game
     */
    Game.addSounds = function() {
        // var xhr = new AjaxRequest();

        // xhr.onreadystatechange = function() {
        //     if (xhr.readyState != 4) {
        //         return;
        //     }
        //     if (xhr.status != 200) {
        //         alert('Erreur lors du chargement des fichiers.');
        //         return;
        //     }
        //     var data = eval('(' + xhr.responseText + ')');
        //     console.log('data: ', data);
        // }

        // xhr.open('GET', 'data/config/audio.json', true);
        // xhr.send();
        this.Assets.sounds = {
            bgm: {
                ghost: new buzz.sound(this.Assets.AUDIO_PATH + '/bgm/ghost/main', {
                    formats: ['mp3', 'ogg'],
                    preload: true,
                    loop: true
                }),
                oldwoman: new buzz.sound(this.Assets.AUDIO_PATH + '/bgm/oldwoman/main', {
                    formats: ['mp3', 'ogg'],
                    preload: true,
                    loop: true
                }),
                woodsman: new buzz.sound(this.Assets.AUDIO_PATH + '/bgm/woodsman/main', {
                    formats: ['mp3', 'ogg'],
                    preload: true,
                    loop: true
                }),
                bat: new buzz.sound(this.Assets.AUDIO_PATH + '/bgm/bat/main', {
                    formats: ['mp3', 'ogg'],
                    preload: true,
                    loop: true
                }),
                cat: new buzz.sound(this.Assets.AUDIO_PATH + '/bgm/cat/main', {
                    formats: ['mp3', 'ogg'],
                    preload: true,
                    loop: true
                }),
                dove: new buzz.sound(this.Assets.AUDIO_PATH + '/bgm/dove/main', {
                    formats: ['mp3', 'ogg'],
                    preload: true,
                    loop: true
                }),
                paper: new buzz.sound(this.Assets.AUDIO_PATH + '/bgm/paper/main', {
                    formats: ['mp3', 'ogg'],
                    preload: true,
                    loop: true
                }),
            },
            sfx: {
                ghost: {
                    take: new buzz.sound(this.Assets.AUDIO_PATH + '/sfx/ghost/take', {
                        formats: ['mp3', 'ogg'],
                        preload: true,
                        loop: false
                    }),
                    leave: new buzz.sound(this.Assets.AUDIO_PATH + '/sfx/ghost/leave', {
                        formats: ['mp3', 'ogg'],
                        preload: true,
                        loop: false
                    })
                },
                woodsman: {
                    talk: new buzz.sound(this.Assets.AUDIO_PATH + '/sfx/woodsman/talk', {
                        formats: ['mp3', 'ogg'],
                        preload: true,
                        loop: false
                    })
                },
                bat: {
                    talk: new buzz.sound(this.Assets.AUDIO_PATH + '/sfx/bat/talk', {
                        formats: ['mp3', 'ogg'],
                        preload: true,
                        loop: false
                    })
                },
                cat: {
                    talk: new buzz.sound(this.Assets.AUDIO_PATH + '/sfx/cat/talk', {
                        formats: ['mp3', 'ogg'],
                        preload: true,
                        loop: false
                    })
                },
                dove: {
                    talk: new buzz.sound(this.Assets.AUDIO_PATH + '/sfx/dove/talk', {
                        formats: ['mp3', 'ogg'],
                        preload: true,
                        loop: false
                    })
                },
                paper: {
                    fx: new buzz.sound(this.Assets.AUDIO_PATH + '/sfx/paper/fx', {
                        formats: ['mp3', 'ogg'],
                        preload: true,
                        loop: false
                    })
                },
                world: {
                    wind: new buzz.sound(this.Assets.AUDIO_PATH + '/sfx/world/wind', {
                        formats: ['mp3', 'ogg'],
                        preload: true,
                        loop: true
                    })
                }
            }
        };
    };

    Game.addAssets = function() {
        this.addImages();
        this.addSounds();
    }

    /**
     * Shows the text "Loading" with the loaded percent
     * @param  {event} e The PxLoader event
     */
    Game.showLoadingText = function(e) {
        context.font = 'bold 30px sans-serif';

        var loadingText = 'Loading ' + ( (e.completedCount * 100 / e.totalCount) | 0 ) + '%',
            metrics     = context.measureText(loadingText),
            textWidth   = metrics.width,
            textHeight  = 30;

        // Clearing the canvas
        context.fillStyle = 'rgb(0, 0, 0)';
        context.fillRect(0, 0, Game.CANVAS_WIDTH, Game.CANVAS_HEIGHT);
        
        // Writing the loading text
        context.fillStyle = '#89BC94';
        context.fillText(loadingText, (Game.CANVAS_WIDTH >> 1) - (textWidth >> 1), (Game.CANVAS_HEIGHT >> 1) - (textHeight >> 1));
    }

    /**
     * Preloads the assets
     */
    Game.loadMenu = function(gameContext, fsm) {
        Game.addAssets();
        context = gameContext;

        // Loader progression
        this.loader.addProgressListener(function(e) {
            if (!fsm.is('loading')) {
                return;
            }
            Game.showLoadingText(e);
        }, ['loading', 'menu']);

        // Once the loading of the loader assets is done, go to the Loading state
        this.loader.addCompletionListener(function(e) {
            fsm.load();
        }, 'loading');

        // Once the loading of the menu assets is done, go to the Menu state
        this.loader.addCompletionListener(function(e) {
            fsm.showMenu();
        }, 'menu');

        // Starting the loading
        this.loader.start(['loading', 'menu']);
    };
})();