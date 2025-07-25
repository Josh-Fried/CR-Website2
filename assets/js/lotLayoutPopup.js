$(document).ready(function() {
    // Main gallery
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

    // Two-image containers
    $('.image-container.two-image-view').each(function() {
        var $container = $(this);
        
        $container.magnificPopup({
            delegate: 'a',
            type: 'image',
            gallery: {
                enabled: true
            },
            image: {
                titleSrc: 'title',
                verticalFit: false // This prevents forced height adjustment
            },
            callbacks: {
                beforeOpen: function() {
                    // Store original dimensions
                    $container.find('img').each(function() {
                        $(this).data('original-width', $(this).width());
                        $(this).data('original-height', $(this).height());
                    });
                },
                close: function() {
                    // Restore original dimensions
                    $container.find('img').each(function() {
                        $(this).css({
                            'width': $(this).data('original-width') + 'px',
                            'height': $(this).data('original-height') + 'px'
                        });
                    });
                    // Force reflow
                    $container.hide().show();
                }
            }
        });
    });
});