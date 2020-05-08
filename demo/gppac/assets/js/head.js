// Header js file for GPPAC microsite
// by Bas de Bruin

var header, menuButton;
var activeClass = 'active';

function init() {
    console.log('init');

    AOS.init({
        duration: 800,
        ease: 'ease-in-out'
    });

    // get header
    header = document.getElementById('header');
    // get menuButton
    menuButton = document.getElementById('menu-button');
    
    // on button click
    menuButton.addEventListener('click', toggleMenu);
}

function toggleMenu() {
    if (header.classList.contains(activeClass)) {
        header.classList.remove(activeClass)
    } else {
        header.classList.add(activeClass);
    }
}