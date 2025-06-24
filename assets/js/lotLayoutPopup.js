$(document).ready(function() {
    // This part for your main gallery is correct and can stay as is.
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

    // --- CORRECTED CODE FOR YOUR TWO-IMAGE CONTAINERS ---
    // Loop through each container that holds a two-image gallery.
    $('.image-container').each(function() {
        // Initialize Magnific Popup on *this specific container*.
        // This creates a separate gallery for each one.
        $(this).magnificPopup({
            delegate: 'a', // The items are the 'a' tags within THIS container
            type: 'image',
            gallery: {
                enabled: true // The gallery is enabled, but only for items within THIS container
            },
            image: {
                titleSrc: 'title'
            }
        });
    });
});