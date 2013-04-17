// The Sound class
(function() {
    var Sound = {};

    /**
     * Starts the BGM corresponding to a character
     * @param  {Character} player The character
     */
    Sound.startBGM = function(name) {

            buzz.all().stop();
            console.log(name);
            Game.sounds[name].bgm.play();

    };

    Game.Sound = Sound;
})();