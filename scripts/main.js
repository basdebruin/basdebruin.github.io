import { setupSounds, attachSounds } from "./sounds";
import setupAnimationElements from './scrollAnimation';

// trigger init()
if (document.readyState === "complete" || document.readyState === "interactive")
    init()
else
    document.addEventListener("DOMContentLoaded", init);

function init() {
    console.log("%cHey, there!", "color: yellow; font-size: 2rem; font-family: Space Grotesk; line-height: 2");

    // handle scroll animations
    setupAnimationElements();

    // create sounds
    setupSounds();
    // attach sounds
    attachSounds();

    setupCards();
}

function setupCards() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card =>
        card.addEventListener('click', () => 
            card.classList.toggle('flipped'))
    );
}