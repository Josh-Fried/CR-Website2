$(document).ready(function() {
    // Initialize Magnific Popup for the "Gallery" section
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

    $('.image-container.two-image-view').magnificPopup({
        delegate: 'a', // Use delegate since the links are inside this container
        type: 'image',
        gallery: {
            enabled: true
        },
        image: {
            titleSrc: 'title'
        }
    });
});