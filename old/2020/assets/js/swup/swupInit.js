// Swup Initialiser
// by Bas de Bruin

const swup = new Swup({
    plugins: [new SwupScrollPlugin({
        doScrollingRightAway: true
    })]
});

swup.scrollTo(0);

swup.on('contentReplaced', init);

function init() {
    // initialise hero image
    initHero();
    slideshowInit();
    console.log(location.pathname);
}