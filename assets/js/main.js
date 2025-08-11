/*
    Massively by HTML5 UP
    html5up.net | @ajlkn
    Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

    var $window = $(window),
        $body = $('body'),
        $wrapper = $('#wrapper'),
        $header = $('#header'), // This is the template's main header, not necessarily your nav-header
        $nav = $('#nav'),
        $main = $('#main'),
        $navPanelToggle, $navPanel, $navPanelInner;

    // Breakpoints.
        breakpoints({
            default:   ['1681px',   null       ],
            xlarge:    ['1281px',   '1680px'   ],
            large:     ['981px',    '1280px'   ],
            medium:    ['737px',    '980px'    ],
            small:     ['481px',    '736px'    ],
            xsmall:    ['361px',    '480px'    ],
            xxsmall:   [null,       '360px'    ]
        });

    /**
     * Applies parallax scrolling to an element's background image.
     * @return {jQuery} jQuery object.
     */
    $.fn._parallax = function(intensity) {

        var $window = $(window),
            $this = $(this);

        if (this.length == 0 || intensity === 0)
            return $this;

        if (this.length > 1) {

            for (var i=0; i < this.length; i++)
                $(this[i])._parallax(intensity);

            return $this;

        }

        if (!intensity)
            intensity = 0.25;

        $this.each(function() {

            var $t = $(this),
                $bg = $('<div class="bg"></div>').appendTo($t),
                on, off;

            on = function() {

                $bg
                    .removeClass('fixed')
                    .css('transform', 'matrix(1,0,0,1,0,0)');

                $window
                    .on('scroll._parallax', function() {

                        var pos = parseInt($window.scrollTop()) - parseInt($t.position().top);

                        $bg.css('transform', 'matrix(1,0,0,1,0,' + (pos * intensity) + ')');

                    });

            };

            off = function() {

                $bg
                    .addClass('fixed')
                    .css('transform', 'none');

                $window
                    .off('scroll._parallax');

            };

            // Disable parallax on ..
                if (browser.name == 'ie'            // IE
                ||  browser.name == 'edge'          // Edge
                ||  window.devicePixelRatio > 1     // Retina/HiDPI (= poor performance)
                ||  browser.mobile)                 // Mobile devices
                    off();

            // Enable everywhere else.
                else {

                    breakpoints.on('>large', on);
                    breakpoints.on('<=large', off);

                }

        });

        $window
            .off('load._parallax resize._parallax')
            .on('load._parallax resize._parallax', function() {
                $window.trigger('scroll');
            });

        return $(this);

    };

    // Play initial animations on page load.
        $window.on('load', function() {
            window.setTimeout(function() {
                $body.removeClass('is-preload');
            }, 100);
        });

    // Scrolly.

    // 1. Get the dynamic height of the navigation bar.
    var navHeight = $('.nav-header').innerHeight(); // Use the height function you confirmed works best.

    // 2. Get the root font size of the document to convert rem to pixels.
    // This makes the calculation dynamic and robust.
    var rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);

    // 3. Define the section's top padding in rem units.
    var sectionPaddingInRem = 2; //Sometimes it 4rem but this seems to work!!!!!

    // 4. Calculate what that rem value is in pixels.
    var sectionPaddingInPixels = sectionPaddingInRem * rootFontSize;

    // 5. Calculate the final offset by subtracting the padding from the nav height.
    var finalOffset = navHeight - sectionPaddingInPixels;


    // --- CONSOLE LOGS FOR TESTING ---
    // console.log('Nav Bar Height:', navHeight);
    // console.log('Root Font Size:', rootFontSize + 'px');
    // console.log('Section Padding (' + sectionPaddingInRem + 'rem) in Pixels:', sectionPaddingInPixels);
    // console.log('Final Scroll Offset (Nav Height - Padding):', finalOffset);


    // 6. Initialize scrolly with the new, precisely calculated offset.
    $('.scrolly').scrolly({
        offset: finalOffset
    });

    // Background.
        $wrapper._parallax(0.925);

    // // Nav Panel.

    //  // Toggle.
    //      $navPanelToggle = $(
    //          '<a href="#navPanel" id="navPanelToggle">Menu</a>'
    //      )
    //          .appendTo($wrapper);

    //      // Change toggle styling once we've scrolled past the header.
    //          $header.scrollex({
    //              bottom: '5vh',
    //              enter: function() {
    //                  $navPanelToggle.removeClass('alt');
    //              },
    //              leave: function() {
    //                  $navPanelToggle.addClass('alt');
    //              }
    //          });

    //  // Panel.
    //      $navPanel = $(
    //          '<div id="navPanel">' +
    //              '<nav>' +
    //              '</nav>' +
    //              '<a href="#navPanel" class="close"></a>' +
    //          '</div>'
    //      )
    //          .appendTo($body)
    //          .panel({
    //              delay: 500,
    //              hideOnClick: true,
    //              hideOnSwipe: true,
    //              resetScroll: true,
    //              resetForms: true,
    //              side: 'right',
    //              target: $body,
    //              visibleClass: 'is-navPanel-visible'
    //          });

    //      // Get inner.
    //          $navPanelInner = $navPanel.children('nav');

    //      // Move nav content on breakpoint change.
    //          var $navContent = $nav.children();

    //          breakpoints.on('>medium', function() {

    //              // NavPanel -> Nav.
    //                  $navContent.appendTo($nav);

    //              // Flip icon classes.
    //                  $nav.find('.icons, .icon')
    //                      .removeClass('alt');

    //          });

    //          breakpoints.on('<=medium', function() {

    //              // Nav -> NavPanel.
    //                  $navContent.appendTo($navPanelInner);

    //              // Flip icon classes.
    //                  $navPanelInner.find('.icons, .icon')
    //                      .addClass('alt');

    //          });

    //      // Hack: Disable transitions on WP.
    //          if (browser.os == 'wp'
    //          &&  browser.osVersion < 10)
    //              $navPanel
    //                  .css('transition', 'none');

    // Nav Header

    // --- Responsive Logic for your ".nav-header" ---

// Configuration: Define the elements we're working with based on your HTML.
// var $sourceNavContainer = $('nav.menu'); // This is your <nav class="menu"> which holds the links.
// var $toggleAppendTarget = $('.nav-header'); // We will add the "Menu" button inside your main header.

// // --- Main Setup (No need to edit below this line) ---

// if ($sourceNavContainer.length > 0 && $toggleAppendTarget.length > 0) {

//     var $window = $(window),
//         $body = $('body');

//     // 1. Create the "Menu" toggle button and add it to your header.
//     var $navPanelToggle = $('<a href="#navPanel" id="navPanelToggle">Menu</a>')
//                             .appendTo($toggleAppendTarget);

//     // 2. Create the hidden slide-out panel.
//     var $navPanel = $(
//         '<div id="navPanel">' +
//             '<nav></nav>' + // This <nav> is the destination for our links on mobile.
//             '<a href="#navPanel" class="close"></a>' +
//         '</div>'
//     )
//     .appendTo($body)
//     .panel({
//         delay: 500,
//         hideOnClick: true,
//         hideOnSwipe: true,
//         resetScroll: true,
//         resetForms: true,
//         side: 'right',
//         target: $body,
//         visibleClass: 'is-navPanel-visible'
//     });

//     // 3. Get references to the new panel's inner nav and the content (the <ul>) of our source nav.
//     var $navPanelInner = $navPanel.children('nav');
//     var $navContent = $sourceNavContainer.children();

//     // 4. Set up the breakpoint logic to move the content.
//     breakpoints.on('>medium', function() {
//         // When the screen is larger than 'medium'...
//         // Move the content (your <ul>) back to its original desktop location.
//         $navContent.appendTo($sourceNavContainer);
//     });

//     breakpoints.on('<=medium', function() {
//         // When the screen is 'medium' or smaller...
//         // Move the content (your <ul>) into the hidden slide-out panel.
//         $navContent.appendTo($navPanelInner);
//     });
// }

// --- FINAL DYNAMIC NAVIGATION SCRIPT ---

// --- Configuration ---
var $desktopNavList = $('nav.menu > ul'); // The <ul> list of links.
var $desktopNavContainer = $('nav.menu');   // The original <nav> container for the list.
var $toggleAppendTarget = $('.nav-header'); // Where the "Menu" button will be placed.
var mobileBreakpoint = 768; // The screen width to always force mobile view.

// --- Main Setup ---

if ($desktopNavList.length > 0 && $toggleAppendTarget.length > 0) {

    var $window = $(window),
        $body = $('body');

    // Create the button and panel from your original code.
    var $navPanelToggle = $('<a href="#navPanel" id="navPanelToggle">Menu</a>')
                            .hide()
                            .appendTo($toggleAppendTarget);

    var $navPanel = 
    $('<div id="navPanel"><nav></nav><a href="#navPanel" class="close"></a></div>')
        .appendTo($body)
        .panel({
            delay: 500, hideOnClick: true, hideOnSwipe: true, resetScroll: true, resetForms: true,
            side: 'right', target: $body, visibleClass: 'is-navPanel-visible'
        });

    var $navPanelInner = $navPanel.children('nav');

    // ============================================================================
    //  THE ROBUST MEASUREMENT TECHNIQUE
    // ============================================================================
    // 1. Create an invisible clone to get the true single-line height.
    var $clone = $desktopNavList.clone()
        .css({
            // Position it off-screen so it's invisible
            'position': 'absolute',
            'top': '-9999px',
            'left': '-9999px',
            'z-index': '-100',

            // Force all the correct layout styles
            'display': 'flex',
            'flex-direction': 'row',
            'flex-wrap': 'nowrap',
            'list-style-type': 'none',
            'margin': '0',
            'padding': '0',
            'width': 'auto',
            'height': 'auto'
        })
        .appendTo('body');

    // 2. Measure the clone to get our reliable baseline height.
    var initialListHeight = $clone.height();
    

    // 3. Immediately remove the clone. This is instantaneous.
    $clone.remove();
    // ============================================================================

    // The function that decides whether to show the desktop or mobile menu.
    function checkNavLayout() {
        // The Condition: Has the list wrapped OR is the window too narrow?
        if (($desktopNavList.height() > initialListHeight + 5) || ($window.width() < mobileBreakpoint)) {
            // --- Switch to Mobile Menu ---
            $desktopNavContainer.hide();
            $navPanelToggle.show();
            $desktopNavList.appendTo($navPanelInner);
        } else {
            // --- Switch to Desktop Menu ---
            $navPanelToggle.hide();
            $desktopNavContainer.show();
            $desktopNavList.appendTo($desktopNavContainer);
        }
    }

    // Run the check on load and on every window resize.
    $window.on('resize', checkNavLayout);
    checkNavLayout();
}

    // Intro.
        var $intro = $('#intro');

        if ($intro.length > 0) {

            // Hack: Fix flex min-height on IE.
                if (browser.name == 'ie') {
                    $window.on('resize.ie-intro-fix', function() {

                        var h = $intro.height();

                        if (h > $window.height())
                            $intro.css('height', 'auto');
                        else
                            $intro.css('height', h);

                    }).trigger('resize.ie-intro-fix');
                }

            // Hide intro on scroll (> small).
                breakpoints.on('>small', function() {

                    $main.unscrollex();

                    $main.scrollex({
                        mode: 'bottom',
                        top: '25vh',
                        bottom: '-50vh',
                        enter: function() {
                            $intro.addClass('hidden');
                        },
                        leave: function() {
                            $intro.removeClass('hidden');
                        }
                    });

                });

            // Hide intro on scroll (<= small).
                breakpoints.on('<=small', function() {

                    $main.unscrollex();

                    $main.scrollex({
                        mode: 'middle',
                        top: '15vh',
                        bottom: '-15vh',
                        enter: function() {
                            $intro.addClass('hidden');
                        },
                        leave: function() {
                            $intro.removeClass('hidden');
                        }
                    });

            });

        }

    // Nav Menu
    window.addEventListener('scroll', function() {
        // Use a unique variable name to avoid any potential conflict.
        // This should target the <header class="nav-header"> we created.
        const headerElementForScrollEffect = document.querySelector('.nav-header');

        if (!headerElementForScrollEffect) {
            // If the specific nav-header isn't found, do nothing further for this function.
            return;
        }

        if (window.scrollY > 1) {
            headerElementForScrollEffect.classList.add('scrolled');
        } else {
            headerElementForScrollEffect.classList.remove('scrolled');
        }
    });
    

})(jQuery);
