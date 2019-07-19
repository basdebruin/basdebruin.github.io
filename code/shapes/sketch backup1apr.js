let a = 0.6; // 1.4 circleness
let b = 1; // 1.56 organicness
let c = 0.5; // 1.4
let d = -2; // -6.56 wonkiness
//
let xt = 0 , yt = 0;
// x = d * sin(a*xt) - sin(b*yt)
// y = c * cos(a*xt) + cos(b*yt)
let looping = true;

function setup() {
	createCanvas(windowHeight, windowHeight);
	background(0);
	noFill();
	stroke(200,200,200,100);
	strokeWeight(0.5);
	frameRate(120);
	text(`a: ${a} b: ${b} c: ${c} d: ${d}`, 60, 20);
}

function draw() {
	for (let i = 0; i < 200; i++) {
		let x = d * sin(a*xt) - sin(b*yt)
		let y = c * cos(a*xt) + cos(b*yt)
		point(map(x, -5, 5, 0, width), map(y, -5, 5, 0, height));
		xt = x;
		yt = y;
	}
	a += 0.00003;
	c += 0.0005;
	
}

function mouseClicked() {
	if (looping) {noLoop(); looping = false} else {loop(); looping = true}
}