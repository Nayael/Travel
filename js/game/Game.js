define(['Engine', 'StateMachine', 'Keyboard', 'game/Load', 'game/World', 'onEachFrame'],
function (Engine, StateMachine, Keyboard, Loader, World, onEachFrame) {
    var Game = function() {
        this.CANVAS_WIDTH  = 800;
        this.CANVAS_HEIGHT = 576;

        this.assets = {};
        this.assets.IMAGE_PATH = 'data/assets/images';
        this.assets.AUDIO_PATH = 'data/assets/audio';

        // State machine
        this.initFsm();

        this.canvas            = document.createElement('canvas');
        this.context           = this.canvas.getContext('2d');
        this.canvas.id         = 'main';
        this.canvas.width      = this.CANVAS_WIDTH;
        this.canvas.height     = this.CANVAS_HEIGHT;
        this.context.fillStyle = 'rgb(0, 0, 0)';
        this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
    };

    Game.prototype.init = function() {
        // Adding the canvas to the stage
        document.body.appendChild(this.canvas);
        
        // Initializing assets managers
        Loader.addAssets(this);
        Loader.loadInit(this);
    };

    /**
     * Initialises the game's FSM
     */
    Game.prototype.initFsm = function() {
        // Declaring the FSM
        this.fsm = StateMachine.create({
            initial: 'none',
            error: function(eventName, from, to, args, errorCode, errorMessage) {
                console.log('Error on event ' + eventName + '. From [' + from + '] to [' + to + '] : ' + errorMessage);
            },
            events: [
                { name: 'load'    , from: ['none', 'menu'], to: 'loading' },
                { name: 'showMenu', from: 'loading', to: 'menu' },
                { name: 'play'    , from: 'loading', to: 'game' }
            ]
        });
        this.fsm.subject = this;

        /**
         * On Loading state
         */
        this.fsm.onload = function(e) {
            var game = this.subject,
                loaderAnim = new Engine.View(null, {
                    sprite: game.assets.images.loading,
                    localX: (game.CANVAS_WIDTH >> 1) - (71 >> 1),
                    localY: (game.CANVAS_HEIGHT >> 2) - (72 >> 1),
                    width: 71,
                    height: 72,
                    totalFrames: 8,
                    frameRate: 150
                });

            onEachFrame(function() {
                if (!game.fsm.is('loading')) {
                    return;
                }
                game.context.fillStyle = 'rgb(0, 0, 0)';
                game.context.fillRect(loaderAnim.localX, loaderAnim.localY, loaderAnim.width, loaderAnim.height);
                loaderAnim.draw(game.context);
            }, 'loading');
        };

        /**
         * On Stop loading state
         */
        this.fsm.onleaveloading = function(e) {
            onEachFrame.cancel('loading');
        };

        /**
         * On Menu state
         */
        this.fsm.onshowMenu = function(e) {
            var game = this.subject,
                onKeyDownMenu = function(e) {
                    if (e.keyCode == Keyboard.SPACE) {
                        removeEventListener('keydown', onKeyDownMenu);
                        Loader.loadGame(game);    // Start the loading of the game assets
                    }
                };
            game.context.drawImage(game.assets.images.menus.splashscreen, 0, 0);
            addEventListener('keydown', onKeyDownMenu);
        };

        /**
         * On Stop menu state
         */
        this.fsm.onleavemenu = function(e) {
            this.subject.context.fillStyle = 'rgb(0, 0, 0)';
            this.subject.context.fillRect(0, 0, this.subject.CANVAS_WIDTH, this.subject.CANVAS_HEIGHT);
        };

        /**
         * On Play state (starts the game)
         */
        this.fsm.onplay = function(e) {
            this.subject.startGame();
        };
    }

    /**
     * Starts a new game
     */
    Game.prototype.startGame = function() {
        this.entities = [];
        this.player = null;
        
        this.map = new Engine.Map(this.canvas);
        this.world = new World();
        this.world.setEnvironment('ghost', this.map, this.assets);

        // Launching the main loop
        onEachFrame(this.update, 'game', this);
    };

    /**
     * The main game loop
     */
    Game.prototype.update = function() {
        // Clearing the canvas
        this.context.fillStyle = 'rgb(0, 0, 0)';
        this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);

        // We draw the map
        this.map.drawBackground();
        this.map.draw();

        // // Updating all the entities
        // // The index of a NPC corresponds to the position of it in the tilemap
        // for (entity in this.npcs) {
        //     if (this.npcs.hasOwnProperty(entity)) {
        //         npc = this.npcs[entity];
        //         npc.update();
        //         // If the character steps out of the view, we destroy it
        //         if (npc.x < -npc.body.width || npc.x > this.CANVAS_WIDTH || npc.y < -npc.body.height || npc.y > this.CANVAS_HEIGHT) {
        //             delete this.npcs[entity];
        //             continue;
        //         }
        //         npc.render(context);
        //     }
        // }


        // // Updating and rendering the player's character
        // this.player.update();
        // if (!this.paused) {
        //     this.player.render(context);
        //     this.player.control();
        //     if (this.player.renderFX) {
        //         this.player.renderFX();
        //     }
        // }

        // if (this.intensity > 0){
        //     this.context.fillStyle = 'rgba(0, 0, 0, '+ this.intensity + ')';
        //     this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        //     this.intensity -= 0.005;
        // }
    };

    /**
     * Pauses the game
     */
    Game.prototype.pause = function() {
        this.paused = true;
    }

    /**
     * Resumes the game
     */
    Game.prototype.resume = function() {
        this.paused = false;
    }

    var game = new Game();
    return game;
});