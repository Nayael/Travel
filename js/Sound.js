// The Sound class
(function() {
    var Sound = {};

    /**
     * Starts the BGM corresponding to a character
     * @param  {Character} player The character
     */
    Sound.startBGM = function(player) {
        var mySound1 = new buzz.sound("audio/08 - Elizabeth", {
            formats: [ "mp3"],
            preload: true,
            loop: true
        });

        if(player instanceof Game.Ghost) {
            mySound1.play();
        }
    };

    Game.Sound = Sound;
})();