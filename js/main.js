require.config({
    baseUrl: 'js',
    paths: {
        'Keyboard': 'lib/Keyboard',
        'StateMachine': 'lib/state-machine.min',
        'PxLoader': 'lib/PxLoader/PxLoader',
        'PxLoaderImage': 'lib/PxLoader/PxLoaderImage',
        'buzz': 'lib/buzz',
        'onEachFrame': 'lib/onEachFrame',
        'pixastic': 'lib/pixastic/pixastic.core',
        'invert': 'lib/pixastic/actions/invert'
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
        'PxLoaderImage': {
            deps: ['PxLoader']
        },
        'buzz': {
            exports: 'buzz'
        },
        'onEachFrame': {
            exports: 'onEachFrame'
        },
        'invert': {
            deps: ['pixastic']
        },
        'pixastic': {
            exports: 'Pixastic'
        }
    }
});

require(['game'], function(game) {
    game.init();    // We launch the game' initialisation
});