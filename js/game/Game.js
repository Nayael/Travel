// The main Game file
define(['onEachFrame', 'Engine', 'StateMachine', 'Keyboard', 'game/Globals', 'game/Load', 'game/World', 'game/characters/CharacterManager', 'game/characters/Ghost', 'game/characters/Cat', 'game/characters/Woodsman'],

function (onEachFrame, Engine, StateMachine, Keyboard, Globals, Loader, World, CharacterManager, Ghost, Cat, Woodsman) {
    var Game = function() {
        this.assets = {};

        // State machine
        this.initFsm();

        this.canvas            = document.createElement('canvas');
        this.context           = this.canvas.getContext('2d');
        this.canvas.id         = 'main';
        this.canvas.width      = Globals.CANVAS_WIDTH;
        this.canvas.height     = Globals.CANVAS_HEIGHT;
        this.context.fillStyle = 'rgb(0, 0, 0)';
        this.context.fillRect(0, 0, Globals.CANVAS_WIDTH, Globals.CANVAS_HEIGHT);
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
        this.fsm = StateMachine.create({
            events: [{
                name: 'load',
                from: ['none', 'menu'],
                to: 'loading'
            }, {
                name: 'showMenu',
                from: 'loading',
                to: 'menu'
            }, {
                name: 'play',
                from: 'loading',
                to: 'game'
            }],
            callbacks: {
                /**
                 * On Loading state
                 */
                onload: function(e) {
                    var game = this.subject,
                        loaderAnim = new Engine.View(null, {
                            spritesheet: game.assets.images.loading,
                            localX     : (Globals.CANVAS_WIDTH >> 1) - (71 >> 1),
                            localY     : (Globals.CANVAS_HEIGHT >> 2) - (72 >> 1),
                            width      : 71,
                            height     : 72,
                            totalFrames: 8,
                            frameRate  : 150
                        });

                    onEachFrame(function() {
                        // console.log('loading');
                        if (!game.fsm.is('loading')) {
                            return;
                        }
                        game.context.fillStyle = 'rgb(0, 0, 0)';
                        game.context.fillRect(loaderAnim.localX, loaderAnim.localY, loaderAnim.width, loaderAnim.height);
                        loaderAnim.draw(game.context);
                    }, 'loading');
                },

                /**
                 * On Stop loading state
                 */
                onleaveloading: function(e) {
                    onEachFrame.cancel('loading');
                },

                /**
                 * On Menu state
                 */
                onshowMenu: function(e) {
                    var game = this.subject,
                        onKeyDownMenu = function(e) {
                            Keyboard.remove(Keyboard.Event_KEY_DOWN, Keyboard.SPACE, onKeyDownMenu);
                            Loader.loadGame(game); // Start the loading of the game assets
                        };
                    game.context.drawImage(game.assets.images.menus.splashscreen, 0, 0);
                    Keyboard.on(Keyboard.Event_KEY_DOWN, Keyboard.SPACE, onKeyDownMenu);
                },

                /**
                 * On Stop menu state
                 */
                onleavemenu: function(e) {
                    this.subject.context.fillStyle = 'rgb(0, 0, 0)';
                    this.subject.context.fillRect(0, 0, Globals.CANVAS_WIDTH, Globals.CANVAS_HEIGHT);
                },

                /**
                 * On Play state (starts the game)
                 */
                onplay: function(e) {
                    this.subject.startGame();
                }
            }
        });
        this.fsm.subject = this;

    }

    /**
     * Starts a new game
     */
    Game.prototype.startGame = function() {
        this.entities = [];
        this.player = null;

        this.map = Engine.Map;
        this.map.init(this.canvas);
        this.world = new World();
        this.world.setEnvironment('ghost', this.assets);

        this.player = new CharacterManager.DEFAULT_CHARACTER(500, 10, this.assets.images.characters.ghost);
        this.player.onPossess();

        // We launch the main game loop
        this.launchGameLoop();
    };

    /**
     * Launches the main game loop
     */
    Game.prototype.launchGameLoop = function() {
        Keyboard.remove(Keyboard.Event_KEY_DOWN, Keyboard.P, this.launchGameLoop, this);
        onEachFrame(this.update, 'game', this);
        Keyboard.on(Keyboard.Event_KEY_DOWN, Keyboard.P, this.pauseGame, this);
    };

    /**
     * Pauses the main game loop
     */
    Game.prototype.pauseGame = function() {
        Keyboard.remove(Keyboard.Event_KEY_DOWN, Keyboard.P, this.pauseGame);
        onEachFrame.cancel('game');
        Keyboard.on(Keyboard.Event_KEY_DOWN, Keyboard.P, this.launchGameLoop, this);
    };

    /**
     * The main game loop
     */
    Game.prototype.update = function() {
        // Clearing the canvas
        // this.context.fillStyle = 'rgb(0, 0, 0)';
        // this.context.fillRect(0, 0, Globals.CANVAS_WIDTH, Globals.CANVAS_HEIGHT);

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
        //         if (npc.x < -npc.body.width || npc.x > Globals.CANVAS_WIDTH || npc.y < -npc.body.height || npc.y > Globals.CANVAS_HEIGHT) {
        //             delete this.npcs[entity];
        //             continue;
        //         }
        //         npc.render(context);
        //     }
        // }


        // Updating and rendering the player's character
        this.player.update(this.map, Globals.CANVAS_WIDTH, Globals.CANVAS_HEIGHT);
        this.player.render(this.context);
        this.player.control();

        // TODO render world FX
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