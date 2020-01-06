// virtualiteit interactie schets
//
// Bas de Bruin
//

let run = false;
let timeSinceClick = 0;

let colors = {
    bg: [40, 40, 50],
    fg: [200, 200, 210],
}
const center = {x: 0, y: 0};

let rings = [];

//random
let randomChance = 0;
let randomMax = 80;

//sounds
let notes = [];
let glitches = [];

function preload() {
    soundFormats('mp3');
    notes = [
        loadSound('sounds/01.mp3'),
        loadSound('sounds/02.mp3'),
        loadSound('sounds/03.mp3'),
        loadSound('sounds/04.mp3'),
        loadSound('sounds/05.mp3'),
        loadSound('sounds/06.mp3'),
        loadSound('sounds/07.mp3'),
        loadSound('sounds/08.mp3'),
        loadSound('sounds/09.mp3'),
        loadSound('sounds/10.mp3'),
    ]
    glitches = [
        loadSound('sounds/noise1.mp3'),
        loadSound('sounds/noise2.mp3'),
        loadSound('sounds/noise3.mp3'),
        loadSound('sounds/noise4.mp3'),
        loadSound('sounds/noise5.mp3'),
        loadSound('sounds/noise6.mp3'),
    ]
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    center.x = width/2;
    center.y = height/2;
    smooth();
    // styles
    background(colors.bg);
    noFill();
    stroke(colors.fg);
    strokeWeight(3);
}

function draw() {
    if (run) {

        background(colors.bg);
        drawRings();

        if (mouseIsPressed && timeSinceClick > 10) {
            addRing(mouseX, mouseY);
            //
            timeSinceClick = 0;
        }
        timeSinceClick++;

        if (frameCount % 8 == 0) {
            randomChance = (frameCount / randomMax) % randomMax;
        }

    } else {

        textAlign(CENTER, CENTER);
        push();
        fill(colors.fg);
        noStroke();
        textSize(30);
        textFont('-apple-system,BlinkMacSystemFont,Roboto,sans-serif');
        //
        text('TOUCH TO START', center.x, center.y);
        pop();


        if (mouseIsPressed) {
            run = true;
            frameCount = 1;
            // start audio context and stuff
        }

    }
}

function mousePressed() {
    if (getAudioContext().state !== 'running') {
        getAudioContext().resume();
    }
}


function addRing(x, y) {
    rings.push(new Ring(x, y, random(30, 250)));
}


let rs = 0; re = 0;
function drawRings() {
    // random start and end
    if (frameCount % 16 == 0) {
        if (Math.random() < (randomChance / randomMax)) {
            re = random(0, rings.length);
            rs = int(Math.abs(re - 5));
        } else {
            rs = 0;
            re = 0;
        }
    }
    //
    for (let i = rs; i < rings.length - re; i++) {
        console.log(i)
        let ring = rings[i];
        if (Math.random() < (randomChance / randomMax)) {
            ring.drawGlitch();
        } else {
            ring.draw();
        }
        ring.changeShape();
    }
}

function windowResized() {
    createCanvas(windowWidth, windowHeight);
    center.x = width/2;
    center.y = height/2;
}