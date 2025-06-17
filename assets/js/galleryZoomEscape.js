$(document).ready(function() {
    $('.gallery-grid-3x3').magnificPopup({
        delegate: 'a', // Child selector of the gallery container that will open popup
        type: 'image',
        gallery: {
            enabled: true // Allows navigation between images in the gallery
        },
        image: {
            titleSrc: 'title' // Use the image's title attribute for the caption
        }
    });
});