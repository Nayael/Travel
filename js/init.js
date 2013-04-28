require.config({
    baseUrl: 'js',
    paths: {
        'Keyboard': 'lib/Keyboard'
    },
    packages: [{
        name: 'Engine',
        location: 'engine',
        main: 'Engine'
    }],
    shim: {
        'Keyboard': {
            exports: 'Keyboard'
        },
        'Engine': {
            deps: ['engine/Body', 'engine/Map', 'engine/Physics', 'engine/View'],
            exports: 'Engine'
        }
    }
});

require(['Engine', 'Keyboard'], function (Engine, Keyboard) {
    console.log('Engine: ', Engine);
});


// (function() {
//     var Game = {};  // The game main namespace

//     /**
//      * Initialises the game's FSM
//      */
//     Game.initFsm = function() {
//         // Declaring the FSM
//         this.fsm = StateMachine.create({
//             initial: 'none',
//             error: function(eventName, from, to, args, errorCode, errorMessage) {
//                 console.log('Error on event ' + eventName + '. From [' + from + '] to [' + to + '] : ' + errorMessage);
//             },
//             events: [
//                 { name: 'load'    , from: ['none', 'menu']   , to: 'loading' },
//                 { name: 'showMenu', from: 'loading', to: 'menu' },
//                 { name: 'play'    , from: 'loading', to: 'game' }
//             ]}
//         );
//         this.fsm.subject = this;

//         /**
//          * On Loading state
//          */
//         this.fsm.onload = function(e) {
//             var game = this.subject,
//                 loader = new View(null, {
//                     sprite: game.Assets.images.loading,
//                     localX: (game.CANVAS_WIDTH >> 1) - (71 >> 1),
//                     localY: (game.CANVAS_HEIGHT >> 2) - (72 >> 1),
//                     width: 71,
//                     height: 72,
//                     totalFrames: 8,
//                     frameRate: 150
//                 });

//             onEachFrame(function() {
//                 if (!game.fsm.is('loading')) {
//                     return;
//                 }
//                 game.context.fillStyle = 'rgb(0, 0, 0)';
//                 game.context.fillRect(loader.localX, loader.localY, loader.width, loader.height);
//                 loader.draw(game.context);
//             }, 'loading');
//         };

//         /**
//          * On Stop loading state
//          */
//         this.fsm.onleaveloading = function(e) {
//             cancelOnEachFrame('loading');
//         };

//         /**
//          * On Menu state
//          */
//         this.fsm.onshowMenu = function(e) {
//             var game = this.subject,
//                 onKeyDownMenu = function(e) {
//                     if (e.keyCode == Keyboard.SPACE) {
//                         removeEventListener('keydown', onKeyDownMenu);
//                         game.loadGame();    // Start the loading of the game assets
//                     }
//                 };
//             game.context.drawImage(game.Assets.images.menus.splashscreen, 0, 0);
//             addEventListener('keydown', onKeyDownMenu);
//         };

//         /**
//          * On Stop menu state
//          */
//         this.fsm.onleavemenu = function(e) {
//             this.subject.context.fillStyle = 'rgb(0, 0, 0)';
//             this.subject.context.fillRect(0, 0, this.subject.CANVAS_WIDTH, this.subject.CANVAS_HEIGHT);
//         };

//         /**
//          * On Play state (starts the game)
//          */
//         this.fsm.onplay = function(e) {
//             this.subject.startGame();
//         };
//     }

//     Game.init = function() {
//         Game.CANVAS_WIDTH  = 800;
//         Game.CANVAS_HEIGHT = 576;

//         Game.Assets = {};
//         Game.Assets.IMAGE_PATH = 'data/images';
//         Game.Assets.AUDIO_PATH = 'data/audio';

//         // State machine
//         Game.initFsm();

//         Game.canvas            = document.createElement('canvas');
//         Game.context           = Game.canvas.getContext('2d');
//         Game.canvas.id         = 'main';
//         Game.canvas.width      = Game.CANVAS_WIDTH;
//         Game.canvas.height     = Game.CANVAS_HEIGHT;
//         Game.context.fillStyle = 'rgb(0, 0, 0)';
//         Game.context.fillRect(0, 0, Game.CANVAS_WIDTH, Game.CANVAS_HEIGHT);

//         // Game.Vec2     = illuminated.Vec2;
//         // Game.Lamp     = illuminated.Lamp;
//         // Game.Lighting = illuminated.Lighting;
//         // Game.DarkMask = illuminated.DarkMask;
//         // Game.light1   = new Game.Lamp({
//         //     position: new Game.Vec2(Game.player.x, Game.player.y),
//         //     distance: 75,
//         //     diffuse: 0.5,
//         //     radius: 0,
//         //     samples: 1,
//         //     angle: 0,
//         //     roughness: 0
//         // });

//         // Game.lighting1 = new Game.Lighting({
//         //     light: Game.light1
//         // });
//         // Game.darkmask = new Game.DarkMask({
//         //     lights: [Game.light1],
//         //     color: 'rgba(0,0,0,1)'
//         // });
//         // Game.lighting1.light.position = new Game.Vec2(Game.player.x + Game.player.body.width / 2, Game.player.y + Game.player.body.height / 2);
//         // Game.darkmask.compute(Game.canvas.width, Game.canvas.height);
//         // Game.darkmask.render(Game.context);
        
//         // Adding the canvas to the stage
//         document.body.appendChild(Game.canvas);
        
//         // Initializing assets managers
//         Game.loader = new PxLoader();
//         Game.addAssets();
//         Game.loadInit(Game.context, Game.fsm);
//     };

//     window.Game = Game;

//     /**
//      * Triggered once the page is loaded
//      */
//     window.onload = Game.init;
// })();