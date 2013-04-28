(function(Game) {
    var context;

    /**
     * Loads the images for the game
     */
    Game.addImages = function() {
        // var xhr = AjaxRequest();

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
            loading : this.loader.addImage(this.Assets.IMAGE_PATH + '/menu/loading.png', 'loading'),
            menus: {
                splashscreen: this.loader.addImage(this.Assets.IMAGE_PATH + '/menu/splashscreen.png', 'menu')
            },
            backgrounds: {
                normal: this.loader.addImage(this.Assets.IMAGE_PATH + '/bg/normal.jpg', 'game')
            },
            tiles: {
                ghost: this.loader.addImage(this.Assets.IMAGE_PATH + '/tiles/ghost.png', 'game'),
                cat: this.loader.addImage(this.Assets.IMAGE_PATH + '/tiles/cat.png', 'game'),
                bat: this.loader.addImage(this.Assets.IMAGE_PATH + '/tiles/bat.png', 'game'),
                woodsman: this.loader.addImage(this.Assets.IMAGE_PATH + '/tiles/woodsman.png', 'game'),
                oldwoman: this.loader.addImage(this.Assets.IMAGE_PATH + '/tiles/oldwoman.png', 'game'),
                dove: this.loader.addImage(this.Assets.IMAGE_PATH + '/tiles/dove.png', 'game')
            },
            characters: {
                ghost: {
                    idleSprite: this.loader.addImage(this.Assets.IMAGE_PATH + '/sprites/ghost/right.png', 'game'),
                    walkRSprite: this.loader.addImage(this.Assets.IMAGE_PATH + '/sprites/ghost/right.png', 'game'),
                    walkLSprite: this.loader.addImage(this.Assets.IMAGE_PATH + '/sprites/ghost/left.png', 'game'),
                    possLSprite: this.loader.addImage(this.Assets.IMAGE_PATH + '/sprites/ghost/poss_l.png', 'game'),
                    possRSprite: this.loader.addImage(this.Assets.IMAGE_PATH + '/sprites/ghost/poss_r.png', 'game')
                },
                cat: {
                    idleRSprite: this.loader.addImage(this.Assets.IMAGE_PATH + '/sprites/cat/idle_right.png', 'game'),
                    idleLSprite: this.loader.addImage(this.Assets.IMAGE_PATH + '/sprites/cat/idle_left.png', 'game'),
                    walkRSprite: this.loader.addImage(this.Assets.IMAGE_PATH + '/sprites/cat/right.png', 'game'),
                    walkLSprite: this.loader.addImage(this.Assets.IMAGE_PATH + '/sprites/cat/left.png', 'game'),
                    jumpRSprite: this.loader.addImage(this.Assets.IMAGE_PATH + '/sprites/cat/jump_r.png', 'game'),
                    jumpLSprite: this.loader.addImage(this.Assets.IMAGE_PATH + '/sprites/cat/jump_l.png', 'game')
                },
                oldwoman: {
                    idleRSprite: this.loader.addImage(this.Assets.IMAGE_PATH + '/sprites/oldwoman/idle_right.png', 'game'),
                    idleLSprite: this.loader.addImage(this.Assets.IMAGE_PATH + '/sprites/oldwoman/idle_left.png', 'game'),
                    walkRSprite: this.loader.addImage(this.Assets.IMAGE_PATH + '/sprites/oldwoman/right.png', 'game'),
                    walkLSprite: this.loader.addImage(this.Assets.IMAGE_PATH + '/sprites/oldwoman/left.png', 'game')
                },
                woodsman: {
                    idleRSprite: this.loader.addImage(this.Assets.IMAGE_PATH + '/sprites/woodsman/idle_right.png', 'game'),
                    idleLSprite: this.loader.addImage(this.Assets.IMAGE_PATH + '/sprites/woodsman/idle_left.png', 'game'),
                    walkRSprite: this.loader.addImage(this.Assets.IMAGE_PATH + '/sprites/woodsman/right.png', 'game'),
                    walkLSprite: this.loader.addImage(this.Assets.IMAGE_PATH + '/sprites/woodsman/left.png', 'game'),
                    jumpRSprite: this.loader.addImage(this.Assets.IMAGE_PATH + '/sprites/woodsman/jump_r.png', 'game'),
                    jumpLSprite: this.loader.addImage(this.Assets.IMAGE_PATH + '/sprites/woodsman/jump_l.png', 'game')
                },
                bat: {
                    walkRSprite: this.loader.addImage(this.Assets.IMAGE_PATH + '/sprites/bat/right.png', 'game'),
                    walkLSprite: this.loader.addImage(this.Assets.IMAGE_PATH + '/sprites/bat/left.png', 'game')
                },
                dove: {
                    walkRSprite: this.loader.addImage(this.Assets.IMAGE_PATH + '/sprites/dove/right.png', 'game'),
                    walkLSprite: this.loader.addImage(this.Assets.IMAGE_PATH + '/sprites/dove/left.png', 'game'),
                    idleRSprite: this.loader.addImage(this.Assets.IMAGE_PATH + '/sprites/dove/idle_right.png', 'game'),
                    idleLSprite: this.loader.addImage(this.Assets.IMAGE_PATH + '/sprites/dove/idle_left.png', 'game')
                },
            },
            items: {
                papers: {
                    1: this.loader.addImage(this.Assets.IMAGE_PATH + '/papers/1.png', 'game'),
                    2: this.loader.addImage(this.Assets.IMAGE_PATH + '/papers/2.png', 'game'),
                    3: this.loader.addImage(this.Assets.IMAGE_PATH + '/papers/3.png', 'game'),
                    4: this.loader.addImage(this.Assets.IMAGE_PATH + '/papers/4.png', 'game'),
                    5: this.loader.addImage(this.Assets.IMAGE_PATH + '/papers/5.png', 'game'),
                    6: this.loader.addImage(this.Assets.IMAGE_PATH + '/papers/6.png', 'game'),
                    7: this.loader.addImage(this.Assets.IMAGE_PATH + '/papers/7.png', 'game'),
                    8: this.loader.addImage(this.Assets.IMAGE_PATH + '/papers/8.png', 'game'),
                    9: this.loader.addImage(this.Assets.IMAGE_PATH + '/papers/9.png', 'game'),
                    10: this.loader.addImage(this.Assets.IMAGE_PATH + '/papers/10.png', 'game')
                }
            }
        };
///////////////////////////////
//           DEBUG           //
// Test for more slow images //
///////////////////////////////
for (var i = 0; i < 40; i++) {
    Game.Assets[i] = this.loader.addImage('http://thinkpixellab.com/pxloader' + '/slowImage.php?delay=1&time=' + new Date + '&i=' + i, 'game');
}
    };    

    /**
     * Loads the sounds for the game
     */
    Game.addSounds = function() {
        // var xhr = AjaxRequest();

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
     * Adds all the assets list to the loader
     */
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
    };

    /**
     * Loads the first menu data
     * @param  {Canvas2DContext} gameContext The game's main canvas' context
     * @param  {StateMachine}    fsm         The game's FSM
     */
    Game.loadInit = function(gameContext, fsm) {
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
        this.loader.start(['loading', 'menu'], true);
    };

    /**
     * Loads the game data
     */
    Game.loadGame = function() {
        var self = this;

        // Loader progression
        this.loader.addProgressListener(function(e) {
            if (!self.fsm.is('loading')) {
                return;
            }
            self.showLoadingText(e);
        }, 'game');

        // Once the loading of the game assets is done, draw the canvas buffers go to the Game state
        this.loader.addCompletionListener(function(e) {
            self.canvasBuffers = {};
            var canvas, context;
            for (var bgName in self.Assets.images.backgrounds) {
                canvas = self.canvasBuffers[bgName] = document.createElement('canvas');
                canvas.width = 800;
                canvas.height = 600;
                context = canvas.getContext('2d');
                context.drawImage(self.Assets.images.backgrounds[bgName],
                    0, 0, canvas.width, canvas.height,
                    0, 0, canvas.width, canvas.height);
            }
            self.fsm.play();
        }, 'game');

        // Starting the loading
        this.fsm.load();
        this.loader.start('game', true);
    };
})(Game);