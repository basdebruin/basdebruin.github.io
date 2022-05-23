/**
 * Scroll animations using IntersectionObserver
 */

export default function setupAnimationElements(className : string = 'scroller') : void {

    const elements = document.getElementsByClassName(className);

    const observer = new IntersectionObserver(checkElements, {
        threshold: 0.3
    })

    function checkElements(entries, observer) : IntersectionObserverCallback {
        entries.forEach(entry => {
            entry.target.classList.toggle('scroller-in', entry.isIntersecting)
        });
        return;
    }

    setTimeout(() => {
        for (let elem of elements) {
            observer.observe(elem);
        }
    }, 100);
    
}