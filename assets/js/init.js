// Initialiser
// Author: Bas de Bruin

// trigger init()
if (document.readyState === "complete" || document.readyState === "interactive")
    init()
else
    document.addEventListener("DOMContentLoaded", init);

function init() {
    console.log('init');
    // swup
    const swup = new Swup({
        plugins: [new SwupScrollPlugin()]
    });
    // scroll up on page change
    swup.on('willReplaceContent', () => {
        swup.scrollTo(0)
    });

    // fix vh
    fixFullHeight();
    swup.on('contentReplaced', fixFullHeight);
    //window.addEventListener('resize', fixFullHeight);

    // create sounds
    setupSounds();
    // attach sounds
    attachSounds();
    swup.on('contentReplaced', attachSounds);
}
 
// make sure height is actually 100vh
function fixFullHeight() {
    const calcHeight = window.innerHeight;
    // apply
    document.querySelectorAll('.full-height').forEach( function(elem) { elem.style.height = calcHeight + 'px' } );
}

// global sounds variable and setup function
var sounds = {};
function setupSounds() {
    // setup sounds using Howler.js
    sounds = {
        "click": [
            new Howl({ src: '/assets/sounds/ui-click1.mp3', volume: 0.2 }),
            new Howl({ src: '/assets/sounds/ui-click2.mp3', volume: 0.2 }),
            new Howl({ src: '/assets/sounds/ui-click3.mp3', volume: 0.2 }),
        ],
        "slide-left": new Howl({ src: '/assets/sounds/ui-slide-left.mp3',   volume: 0.05 }),
        "slide-right": new Howl({ src: '/assets/sounds/ui-slide-right.mp3', volume: 0.05 }),
        "click-down": new Howl({ src: '/assets/sounds/ui-click-down.mp3',   volume: 0.15 }),
        "hover": [
            new Howl({ src: '/assets/sounds/ui-hover1.mp3', volume: 0.02 }),
            new Howl({ src: '/assets/sounds/ui-hover2.mp3', volume: 0.02 }),
            new Howl({ src: '/assets/sounds/ui-hover3.mp3', volume: 0.02 }),
        ]
    };
}
// attach sounds to buttons
function attachSounds() {
    document.querySelectorAll('a[data-sound], button[data-sound]').forEach(function(elem) {

        const attr = elem.getAttribute('data-sound');

        // if no sound is attached, attr isn't empty and the sound exists
        if (!elem.getAttribute('data-sound-attached') && attr !== "") {
            elem.setAttribute('data-sound-attached', true);
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

function playSoundOnSelection() {
    const selection = window.getSelection().toString();
    if (selection && selection !== window.lastSelection) {

        window.lastSelection = selection;
        console.log('selecting');
        playSound('hover');

    }
}

// plays sound, selects random if Array
function playSound(s) {
    const sound = sounds[String(s)];

    if (sound instanceof Howl) {
        sound.play();
    } else if (sound instanceof Array) {
        sound[Math.floor(Math.random()*sound.length)].play();
    } else {
        console.error(`Can't find sound: ${s}`)
    }
}