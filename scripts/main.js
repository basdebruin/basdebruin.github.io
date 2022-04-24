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

    // trigger scroll function
    setupScroll();
    swup.on('contentReplaced', setupScroll);

    // create sounds
    setupSounds();
    // attach sounds
    attachSounds();
    swup.on('contentReplaced', attachSounds);
}

function setupScroll() {

    if(window.location.pathname == '/') {
        window.onscroll = handleScroll();
    } else {
        window.onscroll = null;
    }

}

/**
 * Scroll handler, returns function to be called on home page scroll
 * @returns {()=>void}
 */
function handleScroll() {
    const headerElem = document.getElementsByTagName('header')[0];
    const indicatorElem = headerElem.querySelector('.indicator');

    const workHeight = document.getElementById('work').getBoundingClientRect().top;
    const contactHeight = document.getElementById('contact').getBoundingClientRect().top;

    return function() {
        handleHeaderPosition(headerElem);
        handleHeaderIndicator(indicatorElem, workHeight, contactHeight);
    }
}

/**
 * 
 * @param {Element} headerElem 
 * @returns {()=>void}
 */
function handleHeaderPosition(headerElem) {
    if (window.scrollY < 100) {
        headerElem.classList.add('lowered');
        return;
    }
    headerElem.classList.remove('lowered');
}

/**
 * 
 * @param {Element} indicatorElem 
 * @param {number} workHeight 
 * @param {number} contactHeight 
 * @returns {()=>void}
 */
function handleHeaderIndicator(indicatorElem, workHeight, contactHeight) {
    if (window.scrollY + 50 > contactHeight) {
        indicatorElem.classList.add('scrolled-to-contact');
        return;
    }
    if (window.scrollY + 50 > workHeight) {
        indicatorElem.classList.remove('scrolled-to-contact');
        indicatorElem.classList.add('scrolled-to-work');
        return;
    }

    indicatorElem.classList.remove('scrolled-to-contact');
    indicatorElem.classList.remove('scrolled-to-work');
}