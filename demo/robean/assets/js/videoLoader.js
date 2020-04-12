// video loader changes video based on screen width

let mobileBreakPoint = 600; // point to switch to mobile version

let hero = document.getElementById('hero');

if (window.innerWidth > mobileBreakPoint) {

    //hero.innerHTML = `<img src="assets/images/Robean_Visschers_Straatbeeld_VoorModel2_Madeleine-Sars_OPT.jpg">`;
    hero.innerHTML = createVideoElem(
        ['assets/video/final_video_large.m4v', 'assets/video/final_video_large_720p.mp4'],
        1920, 1080
    );
    console.log('big video');

} else {

    hero.innerHTML = createVideoElem(
        ['assets/video/final_video_mobile.m4v', 'assets/video/final_video_mobile.mp4'],
        600, 800
    );
    console.log('small video');

}

function createVideoElem(src, width, height) {
    let str = `<video autoplay muted loop playsinline> `;
    for (let s of src) {
        str += `<source src="${s}" type="video/mp4" height="${height}" width="${width}"> `;
    }
    str += `failed to load video </video>`;

    return str;
}