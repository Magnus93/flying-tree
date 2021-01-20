var canvas;
var canvasContext;
var gravitySlider;
var bounceSlider;
var bgColor = "#313547";

var gravity;
var speedX;
var speedY;
var ballX;
var ballY;
var ballSize;


function reset_values() {
	gravity = 0.2;
	speedX = 14;
	speedY = 5;
	ballX = 13;
	ballY = 13;
	ballSize = 40;
}


window.onload = function() {
	console.log("onloaded!");
	canvas = document.getElementById("myCanvas");
	canvasContext = canvas.getContext("2d");
	reset_values();
	gravitySlider = document.getElementById("gravityControl");
	gravitySlider.value = 0.2;
	bounceSlider = document.getElementById("bounceControl");
	bounceSlider.value = 1;
	canvasContext.fillStyle = bgColor;
	canvasContext.fillRect(0,0,canvas.width, canvas.height);

	setInterval(main, 20);
}

function main() {
	cleanBackground();
	moveBall();
	drawBall();
	setTextOutput();
}

function cleanBackground() {
	canvasContext.fillStyle = bgColor;
	canvasContext.fillRect(0,0,canvas.width, canvas.height);
}

function moveBall() {
	speedY += parseFloat(gravitySlider.value);
	ballX += speedX;
	ballY += speedY;
	if (ballX < ballSize || ballX > canvas.width-ballSize) {
		speedX *= -bounceSlider.value;
		if (ballX > canvas.width-ballSize) { ballX = canvas.width-ballSize;}
		if (ballX < ballSize) { ballX = ballSize;}
	}

	if (ballY < ballSize || ballY > canvas.height-ballSize) {
		speedY *= -bounceSlider.value;
		if (ballY > canvas.height-ballSize) {ballY = canvas.height-ballSize;}
		if (ballY < ballSize) {ballY = ballSize;}
	}
	if (Math.abs(ballX)+Math.abs(ballY) > 1600) {
		console.log("outOfBounds!")
		ballX = 300;
		ballY = 300;
		speedX = 0;
		speedY = 0;
	}
}

function drawBall() {
	drawCircle(ballX, ballY, ballSize,'lightblue');
}

function jump(x) {
	console.log("jumped");
	speedX += x;
	speedY += -8;
}

function setTextOutput() {
	document.getElementById("gravityText").innerHTML = "gravity: " + gravitySlider.value;
	document.getElementById("bounceText").innerHTML = "bounce: " + bounceSlider.value;
}



function drawRect(x, y, w, h, color) {
	canvasContext.fillStyle = color;
	canvasContext.fillRect(x,y,w,h);		
}

function drawCircle(x, y, r, color) {
	canvasContext.beginPath();
	canvasContext.arc(x, y, r, 0, 2*Math.PI);
	canvasContext.fillStyle = color;
	canvasContext.fill();
	canvasContext.lineWidth = 2;
	canvasContext.strokeStyle = 'black';
	canvasContext.stroke();
}