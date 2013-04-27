var Game = {};  // The game main namespace

Game.init = function() {
    Game.CANVAS_WIDTH  = 800;
    Game.CANVAS_HEIGHT = 576;

    Game.Assets = {};
    Game.Assets.IMAGE_PATH = 'data/images';
    Game.Assets.AUDIO_PATH = 'data/audio';

    // State machine
    Game.initFsm();

    Game.canvas        = document.createElement('canvas');
    
    // Adding the canvas to the stage
    document.body.appendChild(Game.canvas);

    Game.context       = Game.canvas.getContext('2d');
    Game.canvas.id     = 'main';
    Game.canvas.width  = Game.CANVAS_WIDTH;
    Game.canvas.height = Game.CANVAS_HEIGHT;
    Game.context.fillStyle = 'rbg(0, 0, 0)';
    Game.context.fillRect(0, 0, Game.CANVAS_WIDTH, Game.CANVAS_HEIGHT);
    
    // Initializing assets managers
    Game.loader = new PxLoader();
    Game.loadMenu(Game.context, Game.fsm);
};

/**
 * Initialises the game's FSM
 */
Game.initFsm = function() {
    this.fsm = StateMachine.create({
        initial: 'none',
        error: function(eventName, from, to, args, errorCode, errorMessage) {
            console.log('Error on event ' + eventName + '. From [' + from + '] to [' + to + '] : ' + errorMessage);
        },
        events: [
        { name: 'load'    , from: 'none'   , to: 'loading' },
        { name: 'showMenu', from: 'loading', to: 'menu' },
        { name: 'play'    , from: 'menu'   , to: 'game' }
    ]});

    this.fsm.onloading = function(e) {
        var loader = new Game.View(null, {
            sprite: Game.Assets.images.loading,
            localX: (Game.CANVAS_WIDTH >> 1) - (71 >> 1),
            localY: (Game.CANVAS_HEIGHT >> 2) - (72 >> 1),
            width: 71,
            height: 72,
            totalFrames: 8,
            frameRate: 150
        });

        onEachFrame(function() {
            if (!Game.fsm.is('loading')) {
                return;
            }
            Game.context.fillStyle = 'rgb(0, 0, 0)';
            Game.context.fillRect(loader.localX, loader.localY, loader.width, loader.height);
            loader.draw(Game.context);
        }, 'loading');
    };

    this.fsm.onleaveloading = function(e) {
        cancelOnEachFrame('loading');
    };

    this.fsm.onshowMenu = function(e) {
        Game.context.drawImage(Game.Assets.images.menus.splashscreen, 0, 0);
    };
}

/**
 * Triggered once the page is loaded
 */
window.onload = Game.init;