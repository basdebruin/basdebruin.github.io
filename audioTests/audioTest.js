function setup() {
  createCanvas(windowWidth,windowHeight);
  background(0);
}

function draw() {
	//Rotation Data
	background(0);
	fill("fff");
	textSize(20);
	text("rotationX: " + rotationX.toFixed(2), 10, 20);
	text("rotationY: " + rotationY.toFixed(2), 10, 40);
	text("rotationZ: " + rotationZ.toFixed(2), 10, 60);
	text("pRotationX: " + pRotationX.toFixed(2), 10, 80);
	text("accX: " + accelerationX.toFixed(2), 10, 100);
	text("accY: " + accelerationY.toFixed(2), 10, 120);
	text("accZ: " + accelerationZ.toFixed(2), 10, 140);
}