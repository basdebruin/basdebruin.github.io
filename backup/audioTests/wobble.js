var osc1;
var osc2;
var r = 40;
var g = 40;
var b = 40;
var txtStr = "T O U C H";

function setup() {
	createCanvas(windowWidth,windowHeight);
	background(r,g,b);
	//AUDIO
	osc1 = new p5.Pulse();
	osc2 = new p5.Pulse();
	osc1.freq(100);
	osc2.freq(100);
	osc1.amp(0);
	osc2.amp(0);
	osc1.start();
	osc2.start();
}

function draw() {	
	if (mouseIsPressed) {
		osc1.freq(100 + rotationX * 5);
		osc2.freq(random(99, 102) + rotationX * 5);
		osc1.width(constrain(rotationY / 180 - 90, 0, 1));
		r = constrain(rotationX * 4,0,255);
		b = constrain(rotationY * 2 + 180,0,255);
		g = 240;
		txtStr = "W O B B L E";
	}
	else {
		txtStr = "T O U C H"
	}
	background(r,g,b);
	fill(255 - r, 255 - g, 255 - b);
	textSize(28);
	text(txtStr, width/2, height/2);
	textAlign("center");
}

function mousePressed() {
	//Nodig voor audio
	if (getAudioContext().state !== 'running') {
		getAudioContext().resume();
	} 
	osc1.amp(0.5, 0.1);
	osc2.amp(0.5, 0.1);
	
}
function mouseReleased() {
	osc1.amp(0.001, 1);
	osc2.amp(0.001, 1);
	rotate(0);
	r = 40;
	g = 40;
	b = 40;
}