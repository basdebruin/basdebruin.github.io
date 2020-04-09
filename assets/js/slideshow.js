// hero slideshow script
// by Bas de Bruin

let slideTime = 3000;

let hero;
let isRoot = true;
let currentSlide = 0;

slideshowInit();
function slideshowInit() {
    hero = document.getElementById("hero").children;
    console.log(hero);
    isRoot = location.pathname == "/";
    console.log("is root: " + isRoot);

    if (isRoot) {
        slide();
    }
}

function slide() {

    isRoot = location.pathname == "/";
    if (isRoot) {
        for (let i = 0; i < hero.length; i++) {
            let img = hero[i];
            if (i == currentSlide) {

                img.classList.remove("hidden");

            } else if (!img.classList.contains("hidden")) {

                img.classList.add("hidden");

            }
        }

        
        if (currentSlide < hero.length - 1) {
            currentSlide++;
        } else {
            currentSlide = 0;
        }

        setTimeout(slide, slideTime);
    }

}