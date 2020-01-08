// touch piano sketch
// bas de bruin


const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const colors = {
    bg: '#333',
    fg: '#ccc',
    active: '#fff'
}

const buttonSize = 80;

const center = {x: 0, y: 0};

let buttons = [];
let running = false;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(colors.bg);
    smooth();
    ellipseMode(CENTER);
    textAlign(CENTER, CENTER);
    textSize(16);
    center.x = width*0.5;
    center.y = height*0.5;
    //
    let yAmt = 6;
    let i = 37;
    for (let y = 0; y < yAmt; y++) {
        let xAmt = 6 + y % 2;
        for (let x = 0; x < xAmt; x++) {

            buttons.push(
                new Button(
                    center.x + (x - xAmt*0.5) * buttonSize * 1.2 + buttonSize*0.5, 
                    center.y + (y - yAmt*0.5) * buttonSize * 1.1 + buttonSize*0.5,
                    i
                )
            )
            i += 2;

        }
        i-=5;
    }
}

function draw() {
    if (running) {

        background(colors.bg);
        for (let b of buttons) {
            b.draw();
        }
        fill(colors.fg);

    } else {

        fill(colors.fg);
        text('touch to start', center.x, center.y);

    }
}


function mousePressed() {
    if (getAudioContext().state !== 'running') {
        getAudioContext().resume();
        console.log('audio context resumed');
    }
    running = true;
}

document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
});