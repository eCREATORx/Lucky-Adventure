var canvasContext = null;

var game = {
    fps: 1000/60,
    width: 500,
    height: 645,
    score: 0,
    chance: 3,
    background: new Image(),
    gameover: new Image(),
    paused: false
}

var star = {
	x: getRandomInt(1, 500),
	y: 0,
	width: 30,
	height: 30,
	speed: 5,
	background: new Image()
}

var ship = {
    x: 200,
    y: 500,
    width: 60,
    height: 60,
    background: new Image()
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function init() {
    var canvas = document.getElementById("canvas");
    canvasContext = canvas.getContext("2d");

    game.background.src = "img/bg.png";
    ship.background.src = "img/ship.png";
    star.background.src = "img/star.png";
    game.gameover.src = "img/gameover.png";

    canvas.addEventListener("mousemove", onCanvasMouseMove);
    document.addEventListener("mousedown", onDocumentMouseDown);

    game.background.onload = function() {};
    ship.background.onload = function() {};
    star.background.onload = function () {};
    game.gameover.onload = function() {
    	setInterval(play, game.fps);	
    }       
} 

function play() {
    draw();
    touch();
    update();
    if (game.chance == 0) {
    	reload();
    }
}

function update() {
    if (star.y + star.height > game.height) {
    	game.chance -= 1;
        star.y = 0;
        star.x = getRandomInt(1, game.width - star.width);
    }
    star.y += star.speed;
}

function draw() {
    if (game.paused == true) {
		canvasContext.drawImage(game.gameover, 0, 0, game.width, game.height);
	    canvasContext.shadowBlur = 1;
		canvasContext.fillText("Press Right Click To Retry", 105, 505);
    } else {
	    canvasContext.clearRect(0, 0, game.width, game.height);
	    canvasContext.drawImage(game.background, 0, 0, game.width, game.height);
	    canvasContext.shadowColor = "white"; //рисуем текст
	    canvasContext.shadowOffsetX = 3;
	    canvasContext.shadowOffsetY = 3;
	    canvasContext.shadowBlur = 3;
	    canvasContext.fillStyle = "white";
	    canvasContext.font = "30pt Palatino";
	    canvasContext.fillText("Score " + game.score, 175, 50);
	    canvasContext.font = "20pt Palatino";
	    canvasContext.fillText("Speed " + (star.speed - 4), 375, 50);
	    canvasContext.fillText("Chances " + game.chance, 20, 50);
	    canvasContext.shadowOffsetX = 0;
	    canvasContext.shadowOffsetY = 0; //закончили рисовать текст
	    canvasContext.drawImage(ship.background, ship.x, ship.y, ship.width, ship.height); 
	    canvasContext.drawImage(star.background, star.x, star.y, star.width, star.height); 
    }
}

function touch() {
	if (((star.x >= ship.x - star.width) && (star.x <= ship.x + ship.width + star.width)) && ((star.y >= ship.y - star.height) && (star.y <= ship.y + ship.height + star.height))) {
		star.y = 0;
        star.x = getRandomInt(1, game.width - star.width);
        game.score += 1;
        if ((game.score != 0) && (game.score % 7 == 0)) {
        star.speed += 1;
     	}	
	}
}

function reload() {
	game.paused = true;
	draw();
	star.y = 0,
    star.x = getRandomInt(1, game.width - star.width);
    game.chance = 3;
    game.score = 0;
    star.speed = 5;
}

function onDocumentMouseDown(event) {
    if ((event.button == "0") && (game.paused == true)) {
        game.paused = false;
    }
}

function onCanvasMouseMove(event) {
    ship.x = event.layerX - 25;
    ship.y = event.layerY - 25;
}