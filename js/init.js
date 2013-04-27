(function() {
    var Game = {};  // The game main namespace

    /**
     * Initialises the game's FSM
     */
    Game.initFsm = function() {
        // Declaring the FSM
        this.fsm = StateMachine.create({
            initial: 'none',
            error: function(eventName, from, to, args, errorCode, errorMessage) {
                console.log('Error on event ' + eventName + '. From [' + from + '] to [' + to + '] : ' + errorMessage);
            },
            events: [
                { name: 'load'    , from: ['none', 'menu']   , to: 'loading' },
                { name: 'showMenu', from: 'loading', to: 'menu' },
                { name: 'play'    , from: 'loading', to: 'game' }
            ]}
        );
        this.fsm.subject = this;

        /**
         * On Loading state
         */
        this.fsm.onload = function(e) {
            var game = this.subject,
                loader = new View(null, {
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
                game.context.fillRect(loader.localX, loader.localY, loader.width, loader.height);
                loader.draw(game.context);
            }, 'loading');
        };

        /**
         * On Stop loading state
         */
        this.fsm.onleaveloading = function(e) {
            cancelOnEachFrame('loading');
        };

        /**
         * On Menu state
         */
        this.fsm.onshowMenu = function(e) {
            var game = this.subject,
                onKeyDownMenu = function(e) {
                    if (e.keyCode == Keyboard.SPACE) {
                        removeEventListener('keydown', onKeyDownMenu);
                        game.loadGame();    // Start the loading of the game assets
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
        this.fsm.onplay = this.startGame;
    }

    Game.init = function() {
        Game.CANVAS_WIDTH  = 800;
        Game.CANVAS_HEIGHT = 576;

        Game.Assets = {};
        Game.Assets.IMAGE_PATH = 'data/images';
        Game.Assets.AUDIO_PATH = 'data/audio';

        // State machine
        Game.initFsm();

        Game.canvas            = document.createElement('canvas');
        Game.context           = Game.canvas.getContext('2d');
        Game.canvas.id         = 'main';
        Game.canvas.width      = Game.CANVAS_WIDTH;
        Game.canvas.height     = Game.CANVAS_HEIGHT;
        Game.context.fillStyle = 'rgb(0, 0, 0)';
        Game.context.fillRect(0, 0, Game.CANVAS_WIDTH, Game.CANVAS_HEIGHT);
        
        // Adding the canvas to the stage
        document.body.appendChild(Game.canvas);
        
        // Initializing assets managers
        Game.loader = new PxLoader();
        Game.addAssets();
        Game.loadInit(Game.context, Game.fsm);
    };

    window.Game = Game;

    /**
     * Triggered once the page is loaded
     */
    window.onload = Game.init;
})();