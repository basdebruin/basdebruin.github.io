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
    //
    addRing(center.x, center.y);
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

        randomChance = frameCount / 100;
        console.log(randomChance);

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
            // start audio context and stuff
        }

    }
}

function mousePressed() {
    fullscreen();
}


function addRing(x, y) {
    rings.push(new Ring(x, y, random(50, 150)));
}

function drawRings() {
    for (let ring of rings) {
        if (random(0, 99) > randomChance) {
            ring.draw();
            ring.changeShape();
        }
    }
}

function windowResized() {
    createCanvas(windowWidth, windowHeight);
    center.x = width/2;
    center.y = height/2;
}