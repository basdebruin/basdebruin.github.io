// the touch objects
// class

class Ring {
    
    constructor(x, y, maxRad) {
        this.x = x;
        this.y = y;
        //
        this.col = colors.fg;
        //
        this.maxRad = maxRad;
        this.rad = 5;
        this.timer = 0;
        this.spd = 1;
        this.maxSpd = 2;
        this.changing = true;
        //
        this.points = [];
        this.pointsAmt = 60;
        //
        //make
        //
        this.makeShape();
        this.play(this.x);
    }

    makeShape() {
        for (let i = 0; i <= this.pointsAmt; i++) {
            let l = this.rad + noise(i / this.pointsAmt * 20, this.x) * 100;
            let x = cos(i / this.pointsAmt * TWO_PI) * l;
            let y = sin(i / this.pointsAmt * TWO_PI) * l;
            //
            this.points[i] = {
                x: x,
                y: y
            }
        }
        this.points[0] = this.points[this.points.length-1];
    }

    changeShape() {
        // enlargen shape if neccisary
        if (this.changing) {
            if (this.rad < this.maxRad * 0.99) {
                this.rad += this.spd;
                this.spd = (1 - (this.rad / this.maxRad)) * this.maxSpd;
                this.makeShape();
            } else {
                this.changing = false;
            }
        }
    }

    style() {
        // change stroke color
        noFill();
        let tp = 0.5 - (this.rad / this.maxRad) + 0.7;
        stroke(colors.fg[0], colors.fg[1], colors.fg[2], tp * 255);
    }

    draw() {
        this.style();
        beginShape();
        for (let i in this.points) {

            let p = this.points[i];
            //
            curveVertex(this.x + p.x, this.y + p.y);
            if (i == 0 || i == this.points.length - 1) {
                curveVertex(this.x + p.x, this.y + p.y);
            }

        }
        endShape();
    }

    drawGlitch() {
        this.style();
        beginShape();
        for (let i in this.points) {

            let p = this.points[i];
            //
            curveVertex(this.x + p.x + random(-20, 20), this.y + p.y);
            if (i == 0 || i == this.points.length - 1) {
                curveVertex(this.x + p.x, this.y + p.y);
            }

        }
        endShape();
        // trigger glitch sound
        if (Math.random() > 0.85) {
            this.playGlitch(this.x);
        }
    }

    play(x) {
        let sn = int(x / width * notes.length);
        notes[sn].play();
    }

    playGlitch(x) {
        let r = Math.random();
        if (r > 0.95) {
            this.play(x);
        } else if (r < 0.4) {
            glitches[int(random(0, glitches.length))].play();
        }
    }

}