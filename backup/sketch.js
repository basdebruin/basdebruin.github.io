let nx = 0;
let ny = 0;
let d = 40;
let D = 40;
let t = 0;
let dt = 1;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background("#222");
	nx = Math.round(windowWidth / d);
	ny = Math.round(windowHeight / d);
	D = windowWidth / nx;
}

function dot(x, y) {
	rect(x, y, 4, 4);
}

function draw() {
	setup();
	fill("#555");
	noStroke();
	for(let i = 1; i < ny ; i++) {
		for(let j = 1; j < nx ; j++) {
			let x = j*D;
			let y = i*D;
			let dx = mouseX - x;
			let dy = mouseY - y;
			let dotX = (x+y)/1.5 + 1/(t/dx);
			let dotY = y - 1/(dx/dy/t);
			dotX = Math.abs(dotX % windowWidth);
			dotY = Math.abs(dotY % windowHeight);
			dot(dotX, dotY);
		}
	}
	if (t == 1000 || t == -1000) {
		dt *= -1;
	}
	t += dt;
}