// touch piano layout selector script
// bas de bruin

var loc = window.location.href;
loc = loc.split('?')[1];
// default: "piano"
if (loc === "") {
    loc = "piano"
}
console.log("selected layout: " + loc);