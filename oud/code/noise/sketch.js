var factor = 0.1; // 0.1 + 0.004, 0.2 + 0.003, 0.6 + 0.0009, 0.4 + 0.001
var timeScale = 0.002;
var pointAmount = 0.5;

function setup() {
    windowWidth * 0.75 < windowHeight ?
        createCanvas(windowWidth, windowHeight)
        :
        createCanvas(windowHeight * 1.3, windowHeight);
    background(0);
    angleMode(DEGREES);
    //frameRate(5);
    
    //
    //DRAW
    //
    
    strokeWeight(5);
    noFill();
    stroke(200, 200, 200, 200);
}

function draw() {
    background(0, 0, 0, 50);
    let time = frameCount * timeScale; // 0.004
    //
    let lastX = 0;
    let lastY = height / 2;
    //
    beginShape();
    for (let x = 0; x < width * pointAmount; x++) {
        let y = (height / 2) + noise(cos(x * factor) + time) * 500 - 250;
        stroke(220, 220, 220, sin(x * y * 0.01) * 200 + 50);
        strokeWeight(sin(x * 0.03 * y) * 30 + 50);
        point(
            (sin(x + lastY)) * width * 0.5 + width * .5, 
            cos(y + lastX * 0.1) * height * 0.5 + height * 0.5);
        lastX = x;
        lastY = y;
    }
    endShape();
    
    // change over time
    factor += 0.0002;
    //console.log(`factor: ${factor}`);
}

let looping = true;
function mousePressed() {
    if (looping) {
        noLoop();
        looping = false;
    } else {
        loop();
        looping = true;
    }
}