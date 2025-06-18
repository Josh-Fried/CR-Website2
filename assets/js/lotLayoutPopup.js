$(document).ready(function() {
    // Initialize Magnific Popup for the "Gallery" section (if not already done elsewhere)
    // If you already have this in alexCarousel.js or main.js, no need to duplicate
    $('.gallery-grid-3x3').magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: {
            enabled: true
        },
        image: {
            titleSrc: 'title'
        }
    });

    // Initialize Magnific Popup for the "Lot 5-1 Layout" section
    $('#lot-layout .image.fit a').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true // Allows navigation between the two images in this section
        },
        image: {
            titleSrc: 'title'
        }
    });
});