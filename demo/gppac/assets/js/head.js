// Header js file for GPPAC microsite
// by Bas de Bruin

var header, menuButton;
var activeClass = 'active';

function init() {
    // init AOS
    AOS.init({
        duration: 800,
        ease: 'ease-in-out'
    });

    // get HEADER
    header = document.getElementById('header');
    // get menuButton
    menuButton = document.getElementById('menu-button');
    
    // on button click
    menuButton.addEventListener('click', toggleMenu);

    // ACCORDION
    initAccordion();
}

function toggleMenu() {
    if (header.classList.contains(activeClass)) {
        header.classList.remove(activeClass)
    } else {
        header.classList.add(activeClass);
    }
}



var accordions;
// ACCORDION
function initAccordion() {
    // get
    accordions = document.getElementsByClassName('accordion');

    // add eventlisteners to all buttons
    for (accordion of accordions) {
        let button = accordion.querySelector('button');
        button.addEventListener('click', event => {
            let acc = event.target.parentElement;
            if (acc.classList.contains(activeClass)) acc.classList.remove(activeClass);
            else acc.classList.add(activeClass);
        })
    }
}