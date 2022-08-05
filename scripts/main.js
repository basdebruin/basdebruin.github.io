import { setupSounds, attachSounds } from "./sounds";
import setupAnimationElements from './scrollAnimation';
import anime from 'animejs/lib/anime.es';

// trigger init()
if (document.readyState === "complete" || document.readyState === "interactive")
    init()
else
    document.addEventListener("DOMContentLoaded", init);

function init() {
    console.log("%cHey, there!", "color: yellow; font-size: 2rem; font-family: Space Grotesk; line-height: 2");

    enterAnimation();
    
    setupCards();

    // create sounds
    setupSounds();
    // attach sounds
    attachSounds();

}

function setupCards() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card =>
        card.addEventListener('click', () => 
            card.classList.toggle('flipped'))
    );
}

function enterAnimation() {
    // @ts-ignore
    //document.querySelectorAll('.card .front').forEach(card => card.style.opacity = 0);
    anime({
        targets: '.card .front',
        opacity: [0, 1],
        rotateY: () => [Math.random()>.5 ? -90 : 90 , 0],
        easing: 'easeOutElastic',
        delay: 100,
        duration: anime.stagger(1500, {start: 1500})
    });
}