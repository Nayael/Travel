(function() {
    
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
            menus: {
                splashscreen: new PxLoaderImage(this.Assets.IMAGE_PATH + '/menu/splashscreen.png', 'menu')
            },
            backgrounds: {
                bg1: new PxLoaderImage(this.Assets.IMAGE_PATH + '/bg/bg1.png', 'game'),
                bg2: new PxLoaderImage(this.Assets.IMAGE_PATH + '/bg/bg2.png', 'game'),
                bg3: new PxLoaderImage(this.Assets.IMAGE_PATH + '/bg/bg3.png', 'game'),
                bg4: new PxLoaderImage(this.Assets.IMAGE_PATH + '/bg/bg4.png', 'game')
            }
        };

        this.loader.add(this.Assets.images.menus.splashscreen);

        /**
         * Adding all the backgrounds to the loader
         */
        for (var prop in this.Assets.images.backgrounds) {
            if (this.Assets.images.backgrounds.hasOwnProperty(prop)) {
                this.loader.add(this.Assets.images.backgrounds[prop]);
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
    Game.load = function() {
        this.addImages();
        this.addSounds();

        // Progression bar
        // var loadText = document.createElement('div');
        // loadText.style.position = 'absolute';
        // loadText.style.left = window.innerWidth / 2 + 'px';
        // loadText.style.top = '0px';
        // loadText.style.zIndex = '100';
        // loadText.style.color = '#FFFFFF';
        // loadText.style.fontWeight = 'bold';
        // loadText.style.fontSize = '24px';
        // loadText.innerHTML = 'Loading <span id="loaded">0</span>%';
        // document.body.appendChild(loadText);

        this.loader.addProgressListener(function(e) {
            // document.getElementById('loaded').innerHTML = (e.completedCount * 100 / e.totalCount);
            console.log((e.completedCount * 100 / e.totalCount) + '%');
        });

        // Listeners
        this.loader.addCompletionListener(function(e) {
            Game.context.drawImage(Game.Assets.images.menus.splashscreen.img, 0, 0);
            console.log('Menu OK');
        }, 'menu');

        this.loader.addCompletionListener(function(e) {
            console.log('Game OK');
        }, 'game');

        // Starting the loading
        this.loader.start(['menu', 'game']);
    };
})();