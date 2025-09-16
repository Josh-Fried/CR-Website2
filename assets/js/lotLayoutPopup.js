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

      // Add this new block to your magnific popup script
    $('.image-contain-view').magnificPopup({
        delegate: 'a',
        type: 'image',
        image: {
            titleSrc: 'title'
        }
    });

    // Add this for your single-image popups
    $('.single-image-view').magnificPopup({
        delegate: 'a', // Looks for link tags to delegate the popup to
        type: 'image',
        image: {
            titleSrc: 'title' // Uses the a-tag's title attribute as the caption
        }
    });

     $('.condo-layout-container').each(function() {
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

    // Two-image containers
    $('.two-image-view').each(function() {
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

    // Three-image containers
    $('.three-image-view').each(function() {
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