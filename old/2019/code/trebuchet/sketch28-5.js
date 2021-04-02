let size = 10;

// IMAGES
let line;
let diagonal;
let arc;
let dot;
let between;
let tri;
let halftri;
let halfline;
let halfdia;
//
let thinline;
let thindia;
let thinarc;

function preload() {
	line = loadImage("line.png");
	diagonal = loadImage("diagonal.png");
	arc = loadImage("arc.png");
	dot = loadImage("dot.png");
	between = loadImage("penis.png");
	tri = loadImage("equaltri.png");
	halftri = loadImage("halftri.png");
	halfline = loadImage("halfline.png");
	halfdia = loadImage("halfdiagonal.png");
	//
	thinline = loadImage("thinLine.png");
	thindia = loadImage("thinDiagonal.png");
	thinarc = loadImage("thinArc.png");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(200);
	angleMode(DEGREES);
	imageMode(CENTER);
	frameRate(2);
}

function draw() {
	background(220);
	for (let y = size; y < height - size; y += size) {
		for (let x = size; x < width - size; x += size) {
			push();
			//
			translate(x + size/4, y + size/4);
			let rnd = randomInt(3) * 90;
			//rotate(rnd);
			randomInt(3) > 0 ? rotate(rnd) : rotate(0);
			scale(size / 100);
			
			image(randomImg(), 0, 0);
			//
			pop();
		}
	}
	filter(INVERT);
	noLoop();
}

function mouseClicked() {
	loop();
}

function randomImg() {
	let rnd = randomInt(0);
	switch (rnd) {
		case 0:
			return thindia;
		case 1:
			return dot;
		case 2: 
			return dot;
	}
}

function randomInt(n) {
	return Math.round(Math.random() * n);
}