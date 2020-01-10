// touch piano button

class Button {
    constructor(x, y, note) {
        this.x = x;
        this.y = y;
        this.rad = buttonSize;
        //
        this.note = note;
        this.name = noteNames[note % 12];
        this.black = this.name.includes('#');
        console.log('note name: ' + this.name + ' black: ' + this.black);
        //
        this.active = false;
        this.osc = new p5.TriOsc(midiToFreq(this.note));
        this.osc.amp(0);
        this.osc.start();
    }

    draw() {
        // draw ellipse and text
        this.detect();
        this.play();

        let col = this.active ? colors.active : colors.fg;
        if (this.black) {

            noFill();
            stroke(col);
            strokeWeight(2);

            ellipse(this.x, this.y, this.rad);
            //
            noStroke();
            fill(col);

            text(this.name, this.x, this.y);

        } else {

            noStroke();
            fill(col);

            ellipse(this.x, this.y, this.rad);
            //
            fill(colors.bg);

            text(this.name, this.x, this.y);

        }
    }

    play() {
        if (this.active) {
            this.osc.amp(0.05, 0.01);
        } else {
            this.osc.amp(0, 0.01);
        }
    }

    detect() {
        this.active = false;
        // check touches
        for (let touch of touches) {
            this.active = collidePointCircle(touch.x, touch.y, this.x, this.y, this.rad * 1.5) ? true : this.active;
        }
        // and mouse hover
        if (mouseIsPressed) {
            this.active = collidePointCircle(mouseX, mouseY, this.x, this.y, this.rad) ? true : this.active;
        }

        fill(colors.fg);
        for (let i in touches) {
            text(i + ": x: " + touches[i].x + ",y: " + touches[i].y,100, 20*i + 20);
        }
    }
}