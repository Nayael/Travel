// The Sound class
(function() {
    var Sound = {};

    /**
     * Starts the BGM corresponding to a character
     * @param  {Character} player The character
     */
    Sound.startBGM = function(name) {
        buzz.all().stop();
        Game.sounds[name].bgm.play();
    };

    Sound.startTake = function () {
        Game.sounds.ghost.take.play();
    }

    Sound.startLeave = function () {
        Game.sounds.ghost.leave.play();
    }

    Sound.startFx = function (name) {
        if(Game.sounds[name].fx)
        {
            Game.sounds[name].fx.play();
        }
    }


    Game.Sound = Sound;
})();