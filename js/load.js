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

    /**
     * Preloads the assets
     */
    Game.load = function(gameContext) {
        var updateLoader;

        context = gameContext;
        this.addImages();
        this.addSounds();

        var menuLoaded = false;

        this.loader.addProgressListener(function(e) {
            // console.log((e.completedCount * 100 / e.totalCount) + '%');

            // If the menu is completely loaded, we stop displaying the loader, and display the menu
            if (menuLoaded) {
                cancelOnEachFrame('loading');
                return;
            }

            var loadingText = 'Loading ' + ( (e.completedCount * 100 / e.totalCount) | 0 ) + '%',
                metrics = context.measureText(loadingText),
                textWidth = metrics.width,
                textHeight = metrics.height;
            
            context.fillStyle = 'rgb(0, 0, 0)';
            context.fillRect(0, 0, Game.CANVAS_WIDTH, Game.CANVAS_HEIGHT);

            context.fillStyle = '#89BC94';
            context.font = 'bold 30px sans-serif';
            context.fillText(loadingText, (Game.CANVAS_WIDTH >> 1) - (textWidth >> 1), (Game.CANVAS_HEIGHT >> 1) - (textHeight >> 1));
        });

        // Listeners

        // We show the loader animation
        this.loader.addCompletionListener(function(e) {
            updateLoader = Game.showLoader(e);
        }, 'loading');

        this.loader.addCompletionListener(function(e) {
            menuLoaded = true;
            context.drawImage(Game.Assets.images.menus.splashscreen.img, 0, 0);
            // console.log('Menu OK');
        }, 'menu');

        // this.loader.addCompletionListener(function(e) {
        //     console.log('Game OK');
        // }, 'game');

        // Starting the loading
        this.loader.start(['loading', 'menu', 'game']);
    };

    /**
     * Shows the loader animation
     * @param  {event} e The loader completion event
     */
    Game.showLoader = function(e) {
        var loader = new Game.View(null, {
            sprite: Game.Assets.images.loading.img,
            x: (Game.CANVAS_WIDTH >> 1) - (71 >> 1),
            y: (Game.CANVAS_HEIGHT >> 2) - (72 >> 1),
            width: 71,
            height: 72,
            totalFrames: 8,
            frameRate: 150
        });

        return onEachFrame(function() {
            context.fillStyle = 'rgb(0, 0, 0)';
            context.fillRect(loader.localX, loader.localY, loader.width, loader.height);
            loader.draw(context);
        }, 'loading');
    };
})();