var x = 50;
var y = 100;
var globalSpeed = 2;
//var obstacles = [];
var obsts = [];
var dead = false;
var bg = "#161628"
let v = 0;
let b = 0;
let score = 0;
let hit = false;
let life = 3;
let hitTimer = 0;

let vlokken = [];
let aantal = 10;

//PRELOAD
var tree;
var player;
var rendier;
var chimney;
var present;
var ball;
var hoho;
var hohoDead;
var oof;
var jingle;
var jingleLoop;
function preload() {
	tree = loadImage('pixelBoom.png');
	player = loadImage('man.png');
	rendier = loadImage('rendier02.png');
	chimney = loadImage('chimney.png');
	present = loadImage('present.png');
	soundFormats('mp3');
	ball = loadImage('ball.png');
	hoho = loadSound('hoho.mp3');
	oof = loadSound('oof.mp3');
	hohoDead = loadSound('dead.mp3');
	jingle = loadSound('jingleSad.mp3');
	jingleLoop = loadSound('jingleLoop.mp3');
}

//CLASSES
const Player = class {
	constructor(x, y) {
		this.x = 30;
		this.y = 100;
	}
	get draw() {
		image(player, this.x, this.y - 64)
		//noStroke();
		//fill(255,150);
		//rect(this.x, this.y - 32, 118, 64);
		this.y += (mouseY - this.y) / 30;
	}
}

const Rendier01 = class {
	constructor(x, y) {
		this.x = 160;
		this.y = 100;
	}
	get draw() {
		image(rendier, this.x, this.y - 32)
		//noStroke();
		//fill(255, 100);
		//rect(this.x, this.y - 32, 64, 64);
		this.y += (mouseY - this.y) / 20;
		stroke(255, 255, 50, 150);
		strokeWeight(2);
		line(santa.x + 100, santa.y, this.x + 32, this.y - 10);
	}
}

const Rendier02 = class {
	constructor(x, y) {
		this.x = 230;
		this.y = 100;
	}
	get draw() {
		image(rendier, this.x, this.y - 32)
		//noStroke();
		//fill(255, 100);
		//rect(this.x, this.y - 32, 64, 64);

		this.y += (mouseY - this.y) / 15;

		stroke(255, 255, 50, 150);
		strokeWeight(2);
		line(santa.x + 100, santa.y, this.x + 36, this.y - 4);
	}
}

const Obst = class {
	constructor() {
		this.x = width + 128;
		this.y = random(height);
		this.speed = width / 500 + random(3);
		this.wiggle = 0;
	}
	get draw() {
		image(ball, this.x, this.y);
		this.x -= this.speed;
		this.wiggle += (random(3) - 1.5)/ 18;
		this.y += this.wiggle;
		if (this.x < -128) {
			this.x = width + 128;
			this.y = random(height);
			this.speed = width / 500 + random(3);
			this.wiggle = 0;
		}
		//Collision
		if (ren02.x - 32 < this.x && this.x < ren02.x + 56 && ren02.y - 96 < this.y && this.y < ren02.y + 28) {
			//text('detected ren02', 100, 100);
			hit = true;
		}
		if (ren01.x - 32 < this.x && this.x < ren01.x + 60 && ren01.y - 96 < this.y && this.y < ren01.y + 28) {
			//text('detected ren01', 100, 60);
			hit = true;
		}
		if (santa.x - 32 < this.x && this.x < santa.x + 128 && santa.y - 96 < this.y && this.y < santa.y + 28) {
			//text('detected santa', 100, 120);
			hit = true;
		}
	}
}

const Present = class {
	constructor() {
		this.x = width + 512;
		this.y = random(height);
		this.speed = width / 500 + random(4);
	}
	get draw() {
		image(present, this.x, this.y);
		this.x -= this.speed;
		if (this.x < -128) {
			this.x = width + 512;
			this.y = random(height);
			this.speed = width / 500 + random(3);
		}
		//Collision
		if (ren02.x - 32 < this.x && this.x < ren02.x + 56 && ren02.y - 96 < this.y && this.y < ren02.y + 28) {
			score++;
			this.x = width + 512;
			this.y = random(height);
			this.speed = width / 500 + random(3);
			obsts.push(new Obst());
			hoho.play();
		}
		if (ren01.x - 32 < this.x && this.x < ren01.x + 60 && ren01.y - 96 < this.y && this.y < ren01.y + 28) {
			score++
			this.x = width + 512;
			this.y = random(height);
			this.speed = width / 500 + random(3);
			obsts.push(new Obst());
			hoho.play();
		}
		if (santa.x - 32 < this.x && this.x < santa.x + 128 && santa.y - 96 < this.y && this.y < santa.y + 28) {
			this.x = width + 512;
			this.y = random(height);
			this.speed = width / 500 + random(3);
			score++;
			obsts.push(new Obst());
			hoho.play();
		}
	}
}

var pres;
var santa = new Player();
var ren01 = new Rendier01();
var ren02 = new Rendier02();

//
//SETUP
//
function setup() {
	createCanvas(windowWidth,windowHeight);
	background(bg);
	for (let i = 0; i < aantal; i++) {
		vlokken[i] = new Vlok();
	}
	for (let i = 0; i < 5; i++) {
		obsts[i] = new Obst();
	}
	pres = new Present();
	jingle.play();
	jingle.setLoop(true);
	noCursor();
}

//DRAW
function draw() {
	if (dead == false) {
		jingle.setVolume(0.8);
		background(bg);
		textSize(20);
		//text(mouseX, 10, 20);
		//text(mouseY, 10, 40);
		fill(255);
		text('life:  ' + life, width -64, 32);
		text('score:  '+ score, 16, 32);
		
		for (let i=0; i < obsts.length; i++) {
			obsts[i].draw;
		}
		
		if (hit && hitTimer < 1) {
			hitTimer = 100;
			life -= 1;
			oof.play();
		}
		
		if (hitTimer > 0) {
			hitTimer -= 1;
			hit = false;
		}
	
		if (life < 1) {
			dead = true;
			hohoDead.play();
		}
		
		//DRAWING
		
		for (let i = v; i < vlokken.length; i++) {
			vlokken[i].draw();
		}
		v++;
		
		if (hitTimer % 10 < 5) {
			santa.draw();
			ren01.draw();
			ren02.draw();
		}
		pres.draw;
		
		vlokken.push(new Vlok());
		vlokken.push(new Vlok());
	}
	
	//DEAD
	else {
		jingle.stop();
		background('#f33');
		textSize(50);
		noStroke();
		fill(0);
		text("YOU DIED", width / 2 - 120, height / 2 - 50);
		textSize(28);
		text("click to restart", width / 2 - 90, height / 2)
		text("your score was:  " + score, width / 2 - 120, height / 2 + 50)
	}
}

function mousePressed() {
	if (dead) {
		window.location.reload(false);
	}
	
	//Nodig voor audio
	if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}

//SOME MORE CLASSES
function Vlok() {
	let x = random(width);
	let y = 0;
	let dy = random(8)
	let dx = random(4)
	let d = random(3);
	return {
		draw() {
			stroke(255);
			strokeWeight(d);
			point(x,y);
			y += dy;
			x += dx;
			dx = dx + random(4) - 2;
			dy = Math.abs(dy + random(4) - 2);
		}, y
	}
}