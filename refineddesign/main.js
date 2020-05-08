var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 512;

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/map.png";

// superMan image
var smReady = false;
var smImage = new Image();
smImage.onload = function () {
	smReady = true;
};
smImage.src = "images/superman.png";

// internetExplorer image
var ieReady = false;
var ieImage = new Image();
ieImage.onload = function () {
	ieReady = true;
};
ieImage.src = "images/iered.png";

// Game objects
var superMan = {
	speed: 256 // movement in pixels per second
};
var internetExplorer = {};
var internetExplorersCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a internetExplorer
var reset = function () {
	superMan.x = canvas.width / 2;
	superMan.y = canvas.height / 2;

	// Throw the internetExplorer somewhere on the screen randomly
	internetExplorer.x = 32 + (Math.random() * (canvas.width - 64));
	internetExplorer.y = 32 + (Math.random() * (canvas.height - 64));
};

//Reset game is user presses reset button
var resetButton = function () {
	internetExplorersCaught =0
	superMan.x = canvas.width / 2;
	superMan.y = canvas.height / 2;
	document.getElementById("seconds").innerHTML = "00";
	sec = 0;
	
	
};
// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		superMan.y -= superMan.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		superMan.y += superMan.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		superMan.x -= superMan.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		superMan.x += superMan.speed * modifier;
	}

	// Are superMan and internetExplorer touching?
	if (
		superMan.x <= (internetExplorer.x + 32)
		&& internetExplorer.x <= (superMan.x + 32)
		&& superMan.y <= (internetExplorer.y + 32)
		&& internetExplorer.y <= (superMan.y + 72)
	) {
		++internetExplorersCaught;
		reset();
	}
};

// Draw game objects
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (smReady) {
		ctx.drawImage(smImage, superMan.x, superMan.y);
	}

	if (ieReady) {
		ctx.drawImage(ieImage, internetExplorer.x, internetExplorer.y);
	}

	// Score
	ctx.fillStyle = "rgb(225, 64, 64)";
	ctx.font = "24px LatoLight";
	ctx.textAlign = "left";
	ctx.textBaseline = "bottom";
	ctx.fillText("Web browsers converted: " + internetExplorersCaught, 3, 512);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();


// Configure 1 minite timer
var sec = 0;

function pad(val) {
    return val > 9 ? val : "0" + val;
}
var timer = setInterval(function () {
    document.getElementById("seconds").innerHTML = pad(++sec % 60);
}, 1000);

setTimeout(function () {
    clearInterval(timer);
}, 99999999);




//Prevent users from scrolling with arrow keys, to allow game to work properly on demo page
var arrow_keys_handler = function(e) {
    switch(e.keyCode){
        case 37: case 39: case 38:  case 40: // Arrow keys
        case 32: e.preventDefault(); break; // Space
        default: break; // do not block other keys
    }
};
window.addEventListener("keydown", arrow_keys_handler, false);