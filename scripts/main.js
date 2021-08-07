import Swup from 'swup';
import SwupScrollPlugin from '@swup/scroll-plugin';
import { setupSounds, attachSounds } from "./sounds";

// trigger init()
if (document.readyState === "complete" || document.readyState === "interactive")
    init()
else
    document.addEventListener("DOMContentLoaded", init);

function init() {
    console.log("%cHey, there!", "color: yellow; font-size: 2rem; font-family: Space Grotesk; line-height: 2");
    // swup
    const swup = new Swup({
        //@ts-ignore
        plugins: [new SwupScrollPlugin()]
    });
    // scroll up on page change
    swup.on('willReplaceContent', () => {
        //@ts-ignore
        swup.scrollTo(0)
    });

    // fix vh
    fixFullHeight();

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
    //@ts-ignore
    document.querySelectorAll('.full-height').forEach( function(elem) { elem.style.height = calcHeight + 'px' } );
}