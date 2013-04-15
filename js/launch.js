Game.init();

window.onload = function() {
	document.body.appendChild(Game.canvas);

	// Launching the main loop
	onEachFrame(Game.update);
};
