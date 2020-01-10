// touch piano sketch
// bas de bruin


const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const colors = {
    bg: '#333',
    fg: '#bbb',
    active: '#fff'
}

let buttonSize = 80; 

const center = {x: 0, y: 0};

let buttons = [];
let running = false;
let reverb;


let layout = {};
function preload() {
    layout = loadJSON("layouts/" + loc + ".json");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(colors.bg);
    smooth();
    ellipseMode(CENTER);
    textAlign(CENTER, CENTER);
    textSize(16);

    center.x = width*0.5;
    center.y = height*0.5;
    //buttonSize = width / 20;

    // sound FX
    lpf = new p5.LowPass();
    lpf.freq(1500);
    reverb = new p5.Reverb();
    reverb.set(3, 3);
    reverb.drywet(0.6);
    lpf.connect(reverb);
    
    let i = 0;
    for (let y = 0; y < layout.y_amount; y++) {
        let x_amount = layout.x_amount + y % 2;
        for (let x = 0; x < x_amount; x++) {

            let note = layout.notes[i];
            if (note !== null) {
                buttons.push(
                    new Button(
                        center.x + (x - x_amount*0.5) * buttonSize * layout.x_mult + buttonSize * 0.5, 
                        center.y + (y - layout.y_amount*0.5) * buttonSize * layout.y_mult + buttonSize * 0.5,
                        note.note,
                        note.name
                    )
                );
            }
            i++;

        }
    }

    

}

function draw() {
    if (running) {

        background(colors.bg);
        for (let b of buttons) {
            b.draw();
        }
        push();
        fill(colors.fg);
        textAlign(LEFT);
        text(layout.name, 20, 30);
        pop();

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