// Strange attractor

var a = 0.6; // 1.4 circleness
var b = 1; // 1.56 organicness
var c = 0.5; // 1.4
var d = -2; // -6.56 wonkiness
//
let da = 0;
let dc = 0;
//
let xt = 0 , yt = 0;
var iterations = 1000;
//
var opacity = 4;
// x = d * sin(a*xt) - sin(b*yt)
// y = c * cos(a*xt) + cos(b*yt)
let looping = true;

var gui;

function setup() {
	createCanvas(windowHeight, windowHeight);
	background(0);
	noFill();
	stroke(200,200,200,100);
	strokeWeight(0.5);
	frameRate(120);
	//
	gui = createGui('Parameters');
	sliderRange(-10, 10, 0.0001);
	gui.addGlobals('a', 'b', 'c', 'd');
	sliderRange(1, 5000, 1);
	gui.addGlobals('iterations');
	sliderRange(0, 255, 1);
	gui.addGlobals('opacity');
}

function draw() {
	stroke(200,200,200,opacity);
	//
	for (let i = 0; i < iterations; i++) {
		let x = d * sin((a+da)*xt) - sin(b*yt)
		let y = (c+dc) * cos(a*xt) + cos(b*yt)
		//
		point(map(x, -9, 9, 0, width), map(y, -5, 5, 0, height));
		//
		xt = x;
		yt = y;
	}
	da += 0.0001; // 0.00003
	dc += 0.001;  // 0.0005
	text(`a: ${a} b: ${b} c: ${c} d: ${d}`, 60, 20);
}

function keyPressed() {
	if (keyCode == 32) {
		background(0);
	}
	else if (keyCode == ENTER) {
		if (looping) {noLoop(); looping = false} else {loop(); looping = true}
	}
	else if (keyCode == LEFT_ARROW) {
		da = 0;
		dc = 0;
		background(0);
	}
}