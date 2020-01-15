let size = 50;
let pattern = 0;

// IMAGES
let line;
let diagonal;
let arc;
let dot;
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
	frameRate(30);
}

function draw() {
	background(220);
	//
	// switch pattern
	let img = [];
	switch(pattern) {
		case 0:
			img = [diagonal, line];
			break;
		case 1:
			img = [thinline, thindia];
			break;
		case 2:
			img = [diagonal, dot];
			break;
		case 3:
			img = [thinline, dot];
			break;
		case 4:
			img = [line, thinline];
			break;
		case 5:
			img = [diagonal, thindia];
			break;
		default: 
			img = [diagonal, line];
	}
	// pattern loop
	for (let y = size; y < height - size; y += size) {
		for (let x = size; x < width - size; x += size) {
			push();
			//
			translate(x + size/4, y + size/4);
			let rnd = randomInt(3) * 90;
			scale(size / 100);
			//
			// distance from center and image drawing
			let dist = sqrt(pow(x - width / 2, 2) + pow(y - height / 2, 2));

			if (Math.sin(dist * 0.01 + frameCount * 0.05) > 0) {
				rotate(0);
				image(img[0], 0, 0);
			} else {
				image(img[1], 0, 0);
			}
			
			pop();
		}
	}
	filter(INVERT);
	// change size and pattern based on mouse
	size = Math.floor(map(mouseX, 0, width, 20, 150));
	pattern = Math.floor(map(mouseY, 0, height, 0, 6));
}

// function mouseClicked() {
// 	noLoop();
// }

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