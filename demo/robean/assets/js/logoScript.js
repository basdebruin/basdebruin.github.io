// logo shrink script 
// for: Robean website
// author: Bas de Bruin

var logo = document.getElementById("logo");
var nav = document.getElementById("nav");
const breakPoint = 300;

window.addEventListener("scroll", function(e) {
    let h = window.scrollY;

    // check breakpoint and add and remove classes
    if (h < breakPoint) {

        if (logo.classList.contains("small")) {
            logo.classList.remove("small");
        }
        if (nav.classList.contains("hidden")) {
            nav.classList.remove("hidden");
        }
        
    } else {

        if (!logo.classList.contains("small")) {
            logo.classList.add("small");
        }
        if (!nav.classList.contains("hidden")) {
            nav.classList.add("hidden");
        }
        
    }

});