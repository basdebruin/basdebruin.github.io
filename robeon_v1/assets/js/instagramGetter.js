(function () {
    new InstagramFeed({
        'username': 'robean_jewellery_craft',
        'container': document.getElementById("insta"),
        'display_profile': false,
        'display_biography': false,
        'display_gallery': true,
        'callback': null,
        'styling': false,
        'items': 9,
        'items_per_row': 3,
        'margin': 0
    });
})();