/*
    Highlights by HTML5 UP
    html5up.net | @ajlkn
    Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

    var $window = $(window),
        $body = $('body'),
        $html = $('html');

    // Breakpoints.
        breakpoints({
            large:   [ '981px',  '1680px' ],
            medium:  [ '737px',  '980px'  ],
            small:   [ '481px',  '736px'  ],
            xsmall:  [ null,     '480px'  ]
        });

    // Play initial animations on page load.
        $window.on('load', function() {
            window.setTimeout(function() {
                $body.removeClass('is-preload');
            }, 100);
        });

    // Touch mode.
        if (browser.mobile) {

            var $wrapper;

            // Create wrapper.
                $body.wrapInner('<div id="wrapper" />');
                $wrapper = $('#wrapper');

                // Hack: iOS vh bug.
                    if (browser.os == 'ios')
                        $wrapper
                            .css('margin-top', -25)
                            .css('padding-bottom', 25);

                // Pass scroll event to window.
                    $wrapper.on('scroll', function() {
                        $window.trigger('scroll');
                    });

            // Scrolly.
                $window.on('load.hl_scrolly', function() {

                    $('.scrolly').scrolly({
                        speed: 1500,
                        parent: $wrapper,
                        pollOnce: true
                    });

                    $window.off('load.hl_scrolly');

                });

            // Enable touch mode.
                $html.addClass('is-touch');

        }
        else {

            // Scrolly.
                $('.scrolly').scrolly({
                    speed: 1500
                });

        }

    // Header.
        var $header = $('#header'),
            $headerTitle = $header.find('header'), // This is the <header class="major"> inside #header
            $headerContainer = $header.find('.container'); // This finds containers within #header

        // Make title fixed.
            if (!browser.mobile) {

                $window.on('load.hl_headerTitle', function() {

                    breakpoints.on('>medium', function() {
                        // This targets the <header class="major"> for fixed positioning
                        $headerTitle 
                            .css('position', 'fixed')
                            .css('height', 'auto')
                            .css('top', '50%')
                            .css('left', '0')
                            .css('width', '100%')
                            .css('margin-top', ($headerTitle.outerHeight() / -2));
                    });

                    breakpoints.on('<=medium', function() {
                        $headerTitle
                            .css('position', '')
                            .css('height', '')
                            .css('top', '')
                            .css('left', '')
                            .css('width', '')
                            .css('margin-top', '');
                    });

                    $window.off('load.hl_headerTitle');

                });
            }

        // Scrollex for Header Title (fading out the <header class="major">)
            // This might conflict with your new video fading logic if you also implemented that.
            // Or if your header video replaces the title's prominence.
            breakpoints.on('>small', function() {
                $header.scrollex({ // Attaches to the #header section
                    terminate: function() {
                        $headerTitle.css('opacity', '');
                    },
                    scroll: function(progress) {
                        var x;
                        // Fade out title as user scrolls down.
                            if (progress > 0.5)
                                x = 1 - progress;
                            else
                                x = progress;

                            // This $headerTitle is the <header class="major">
                            $headerTitle.css('opacity', Math.max(0, Math.min(1, x * 2)));
                    }
                });
            });

            breakpoints.on('<=small', function() {
                $header.unscrollex();
            });

    // Main sections. (Background image scrollex effect)
        $('.main').each(function() {
            var $this = $(this),
                $primaryImg = $this.find('.image.primary > img'),
                $bg,
                options;

            if ($primaryImg.length == 0)
                return;

            $bg = $('<div class="main-bg" id="' + $this.attr('id') + '-bg"></div>')
                .css('background-image', (
                    'url("assets/css/images/overlay.png"), url("' + $primaryImg.attr('src') + '")'
                ))
                .appendTo($body);

            $this.scrollex({
                mode: 'middle',
                delay: 200,
                top: '-10vh',
                bottom: '-10vh',
                init: function() { $bg.removeClass('active'); },
                enter: function() { $bg.addClass('active'); },
                leave: function() { $bg.removeClass('active'); }
            });
        });

    // NEW: Initialize Bolt Carousel (or CodyHouse Carousel if that's what you're using)
    // This assumes the carousel script itself (carousel.js) either:
    // 1. Exposes a global `Carousel` constructor/function.
    // 2. Automatically initializes carousels found by a specific class (e.g., 'js-carousel')
    //    when its script file is loaded.

    // Option 1: If the carousel.js you copied has an auto-init loop (like the CodyHouse one did at the bottom)
    // then you might not need to add anything here, as long as your HTML has the correct class (e.g., 'js-carousel')
    // and the carousel.js script is included in your HTML.

    // Option 2: If you need to manually initialize it (common pattern):
    if (typeof Carousel === 'function') { // Check if the Carousel class/function from carousel.js is available
        var boltCarousels = document.getElementsByClassName('js-carousel'); // Use the class your carousel HTML uses
        
        if (boltCarousels.length > 0) {
            for (var i = 0; i < boltCarousels.length; i++) {
                // Instantiate the carousel.
                // You might need to pass options based on how the Bolt/CodyHouse carousel is designed.
                // Check the documentation or the original initialization code from the Bolt project's main.js.
                // The CodyHouse example initialized by extracting data-attributes.
                // For a simple start, just passing the element might be enough if it has good defaults.
                
                // Example initialization (adapt based on Bolt's carousel.js requirements):
                var element = boltCarousels[i];
                var options = {
                    element: element
                    // --- Add any data-attributes from your HTML as options ---
                    // e.g., loop: (element.getAttribute('data-loop') && element.getAttribute('data-loop') == 'off') ? false : true,
                    // autoplay: (element.getAttribute('data-autoplay') && element.getAttribute('data-autoplay') == 'on') ? true : false,
                    // nav: (element.getAttribute('data-navigation') && element.getAttribute('data-navigation') == 'on') ? true : false,
                    // drag: (element.getAttribute('data-drag') && element.getAttribute('data-drag') == 'on') ? true : false
                };
                // Extract all relevant data-attributes from the element to build the options object
                // This mirrors the auto-init loop from the CodyHouse example.
                options.autoplay = (element.getAttribute('data-autoplay') && element.getAttribute('data-autoplay') == 'on') ? true : false;
                options.autoplayInterval = (element.getAttribute('data-autoplay-interval')) ? parseInt(element.getAttribute('data-autoplay-interval')) : 5000;
                options.autoplayOnHover = (element.getAttribute('data-autoplay-hover') && element.getAttribute('data-autoplay-hover') == 'on') ? true : false;
                options.autoplayOnFocus = (element.getAttribute('data-autoplay-focus') && element.getAttribute('data-autoplay-focus') == 'on') ? true : false;
                options.drag = (element.getAttribute('data-drag') && element.getAttribute('data-drag') == 'on') ? true : false;
                options.loop = (element.getAttribute('data-loop') && element.getAttribute('data-loop') == 'off') ? false : true;
                options.nav = (element.getAttribute('data-navigation') && element.getAttribute('data-navigation') == 'on') ? true : false;
                options.navigationItemClass = element.getAttribute('data-navigation-item-class') ? element.getAttribute('data-navigation-item-class') : 'carousel__nav-item';
                options.navigationClass = element.getAttribute('data-navigation-class') ? element.getAttribute('data-navigation-class') : 'carousel__navigation';
                options.navigationPagination = (element.getAttribute('data-navigation-pagination') && element.getAttribute('data-navigation-pagination') == 'on') ? true : false;
                options.overflowItems = (element.getAttribute('data-overflow-items') && element.getAttribute('data-overflow-items') == 'on') ? true : false;
                options.alignControls = element.getAttribute('data-align-controls') ? element.getAttribute('data-align-controls') : false;
                options.justifyContent = (element.getAttribute('data-justify-content') && element.getAttribute('data-justify-content') == 'on') ? true : false;
                options.ariaLive = true; // Usually good to enable for accessibility

                new Carousel(options);
            }
        }
    } else {
        // This message will appear if carousel.js hasn't loaded or doesn't define `Carousel` globally.
        // Only a concern if manual initialization like above is needed.
        console.warn('Carousel function/class not found. Automatic initialization in carousel.js might be active, or script is missing.');
    }

    // If you implemented the video playlist logic or the video scroll-fade logic,
    // that would also go within this $(document).ready() or be in its own linked JS file.
    // Example for video fade (if you still want it and it's not part of the carousel script):
    var $headerVideo = $('#header-video');
    if ($headerVideo.length) {
        function updateVideoOpacity() {
            if ($headerVideo.is(':visible')) { // Check if video is not hidden by CSS (e.g., on mobile)
                var scrollTop = $window.scrollTop();
                var headerHeight = $header.outerHeight(); 
                if (headerHeight > 0) {
                    var opacity = 1 - (scrollTop / headerHeight);
                    opacity = Math.max(0, Math.min(1, opacity));
                    $headerVideo.css('opacity', opacity);
                }
            }
        }
        $window.on('scroll', updateVideoOpacity);
        updateVideoOpacity(); // Initial call
    }


})(jQuery);
