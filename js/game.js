define(['Engine', 'StateMachine', 'Keyboard', 'load', 'onEachFrame', 'invert', 'pixastic'],
function (Engine, StateMachine, Keyboard, Loader, onEachFrame, invert, Pixastic) {
    var Game = function() {
        this.CANVAS_WIDTH  = 800;
        this.CANVAS_HEIGHT = 576;

        this.Assets = {};
        this.Assets.IMAGE_PATH = 'data/images';
        this.Assets.AUDIO_PATH = 'data/audio';

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
                    sprite: game.Assets.images.loading,
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
            game.context.drawImage(game.Assets.images.menus.splashscreen, 0, 0);
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
        this.map = new Engine.Map(this.canvas);
        this.context.drawImage(this.canvasBuffers.normal, 0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT, 0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);

        // Launching the main loop
        onEachFrame(this.update);
    };

    /**
     * The main game loop
     */
    Game.prototype.update = function() {

        // var canvas  = Game.canvas,
        //     context = Game.context;

        // // Clearing the canvas
        // context.fillStyle = 'rgb(127, 127, 127)';
        // context.fillRect(0, 0, Game.CANVAS_WIDTH, Game.CANVAS_HEIGHT);
        // Game.map.drawBackground(context);

        // // We draw the map after the character
        // Game.map.draw(context);

        // // Updating all the entities
        // // The index of a NPC corresponds to the position of it in the tilemap
        // for (entity in Game.npcs) {
        //     if (Game.npcs.hasOwnProperty(entity)) {
        //         npc = Game.npcs[entity];
        //         npc.update();
        //         // If the character steps out of the view, we destroy it
        //         if (npc.x < -npc.body.width || npc.x > Game.CANVAS_WIDTH || npc.y < -npc.body.height || npc.y > Game.CANVAS_HEIGHT) {
        //             delete Game.npcs[entity];
        //             continue;
        //         }
        //         npc.render(context);
        //     }
        // }


        // // Updating and rendering the player's character
        // Game.player.update();
        // if (!Game.paused) {
        //     Game.player.render(context);
        //     Game.player.control();
        //     if (Game.player.renderFX) {
        //         Game.player.renderFX();
        //     }
        // }

        // if (Game.intensity > 0){
        //     Game.context.fillStyle = 'rgba(0, 0, 0, '+ Game.intensity + ')';
        //     Game.context.fillRect(0, 0, Game.canvas.width, Game.canvas.height);
        //     Game.intensity -= 0.005;
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

    return new Game();
});