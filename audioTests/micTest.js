var mic;
var osc;

function setup() {
	if (getAudioContext().state !== 'running') {
		getAudioContext().resume();
	}
	createCanvas(windowWidth,windowHeight);
	background(0);
	//MIC
	mic = new p5.AudioIn();
	mic.start();
	//OSC
	osc = new p5.Oscillator();
	osc.setType('sawtooth');
	osc.freq(200);
	osc.amp(0);
	osc.start();
}

function draw() {
	background("#222");
	fill("fff");
	textSize(20);
	micLevel = mic.getLevel();
	rect(width/2, 20, 20, micLevel*height);
	text("mic level: " + micLevel.toFixed(2), 20, 40);
	text("freq: " + (80 + rotationX * 5), 20, 80)
	//OSC
	osc.amp(micLevel, 0.2);
	osc.freq(80 + rotationX * 5);
}

function mousePressed() {
	//Nodig voor audio
	if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}