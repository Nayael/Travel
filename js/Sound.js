// The Sound class
(function() {
    var Sound = {};

    /**
     * Starts the BGM corresponding to a character
     * @param  {Character} player The character
     */
    Sound.startBGM = function(name) {
        buzz.all().stop();
        //Game.sounds[name].bgm.play();
    };

    Sound.startFx = function (name) {
        buzz.all.stop();
        Game.sounds[name].fx.play();
    }
    Game.Sound = Sound;
})();