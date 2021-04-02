// Script for fading out hero image
// by Bas de Bruin

var fadeHeight = window.innerHeight * 1.5;

//get hero
var el, full;
function initHero() {
    el = document.getElementById("hero");
    full = window.getComputedStyle(el).opacity;
    console.log(full);
}
initHero();


window.addEventListener("scroll", function (event) {
    let scroll = this.scrollY;

    // fade in on scroll
    if (scroll < fadeHeight) {

        let op = Math.pow(1 - (scroll / fadeHeight), 4) * full;
        el.style.opacity = op;

    } else {
        el.style.opacity = 0;
    }
});