// Header js file for GPPAC microsite
// by Bas de Bruin

var header, menuButton;

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
    if (header.classList.contains('active')) {
        header.classList.remove('active')
    } else {
        header.classList.add('active');
    }
}