import {Howl, Howler} from "howler";

// global sounds variable and setup function
var sounds = {};
export function setupSounds() : void {
    // setup sounds using Howler.js
    sounds = {
        "click": [
            new Howl({ src: '/assets/sounds/ui-click1.mp3', volume: 0.2 }),
            new Howl({ src: '/assets/sounds/ui-click2.mp3', volume: 0.2 }),
            new Howl({ src: '/assets/sounds/ui-click3.mp3', volume: 0.2 }),
        ],
        "slide-left":  new Howl({ src: '/assets/sounds/ui-slide-left.mp3',  volume: 0.05 }),
        "slide-right": new Howl({ src: '/assets/sounds/ui-slide-right.mp3', volume: 0.05 }),
        "click-down":  new Howl({ src: '/assets/sounds/ui-click-down.mp3',  volume: 0.15 }),
        "hover": [
            new Howl({ src: '/assets/sounds/ui-hover1.mp3', volume: 0.02 }),
            new Howl({ src: '/assets/sounds/ui-hover2.mp3', volume: 0.02 }),
            new Howl({ src: '/assets/sounds/ui-hover3.mp3', volume: 0.02 }),
        ]
    };
}

// add lastSelection to window scope
declare global {
    interface Window { lastSelection: string }
}

// attach sounds to buttons
export function attachSounds() : void{
    document.querySelectorAll('a[data-sound], button[data-sound]').forEach(function(elem) {

        const attr : string = elem.getAttribute('data-sound');

        // if no sound is attached, attr isn't empty and the sound exists
        if (!elem.getAttribute('data-sound-attached') && attr !== "") {
            elem.setAttribute('data-sound-attached', 'true');
            elem.addEventListener('click', function() {
                playSound(attr);
            })
        }

    });
    // on selecting play sound
    window.lastSelection = "";
    document.onmousedown = function() { document.addEventListener   ('mousemove', playSoundOnSelection) }
    document.onmouseup = function()   { document.removeEventListener('mousemove', playSoundOnSelection) }
}

function playSoundOnSelection() : void {
    const selection : string = window.getSelection().toString();
    if (selection && selection !== window.lastSelection) {

        window.lastSelection = selection;
        console.log('selecting');
        playSound('hover');

    }
}

// plays sound, selects random if Array
function playSound(s) : void {
    const sound : Howl | Array<Howl> = sounds[String(s)];

    if (sound instanceof Howl) {
        sound.play();
    } else if (sound instanceof Array) {
        sound[Math.floor(Math.random()*sound.length)].play();
    } else {
        console.error(`Can't find sound: ${s}`)
    }
}