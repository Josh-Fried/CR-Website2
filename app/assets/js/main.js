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

    // Scrolly    
    // --- Custom Smooth Scroll Solution with Logs ---

$(function() {

    var $header = $('#header-outer');
    var largeHeaderHeight = $header.outerHeight();
    var shrinkNum = $header.data('shrink-num');
    var padding = $header.data('padding');
    var heightDifference = parseInt(shrinkNum) + 2 * (padding - padding / 1.8);
    var smallHeaderHeight = largeHeaderHeight - heightDifference;

    // This is the click handler for all links with class="scrolly"
    $('.scrolly').on('click', function(event) {
        
        event.preventDefault();
        var target = $(this.hash);

        if (target.length) {
            var rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
            var sectionPaddingInRem = 2; 
            var sectionPaddingInPixels = sectionPaddingInRem * rootFontSize;
            var finalOffset = smallHeaderHeight - sectionPaddingInPixels;
            var targetPosition = target.offset().top - finalOffset;

            $('html, body').animate({
                scrollTop: targetPosition
            }, 1000); 
        }
    });

});

    // Background.
        $wrapper._parallax(0.925);

    // --- FINAL DYNAMIC NAVIGATION SCRIPT ---
    var $desktopNavList = $('nav.menu > ul'); 
    var $desktopNavContainer = $('nav.menu');
    var $toggleAppendTarget = $('.nav-header');
    var mobileBreakpoint = 768;

    if ($desktopNavList.length > 0 && $toggleAppendTarget.length > 0) {

        var $window = $(window),
            $body = $('body');

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

        var $clone = $desktopNavList.clone()
            .css({
                'position': 'absolute', 'top': '-9999px', 'left': '-9999px', 'z-index': '-100',
                'display': 'flex', 'flex-direction': 'row', 'flex-wrap': 'nowrap',
                'list-style-type': 'none', 'margin': '0', 'padding': '0',
                'width': 'auto', 'height': 'auto'
            })
            .appendTo('body');

        var initialListHeight = $clone.height();
        $clone.remove();

        function checkNavLayout() {
            if (($desktopNavList.height() > initialListHeight + 5) || ($window.width() < mobileBreakpoint)) {
                $desktopNavContainer.hide();
                $navPanelToggle.show();
                $desktopNavList.appendTo($navPanelInner);
            } else {
                $navPanelToggle.hide();
                $desktopNavContainer.show();
                $desktopNavList.appendTo($desktopNavContainer);
            }
        }

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
    // window.addEventListener('scroll', function() {
    //     const headerElementForScrollEffect = document.querySelector('.nav-header');

    //     if (!headerElementForScrollEffect) {
    //         return;
    //     }

    //     if (window.scrollY > 1) {
    //         headerElementForScrollEffect.classList.add('scrolled');
    //     } else {
    //         headerElementForScrollEffect.classList.remove('scrolled');
    //     }
    // });


/* --- Mobile Accordion Menu Logic (Final Version) --- */
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.querySelector('#slide-out-widget-area');
    console.log("main.js: accordian");
    if (mobileMenu) {
        const parentMenuItems = mobileMenu.querySelectorAll('.menu-item-has-children');

        parentMenuItems.forEach(item => {
            // Create a clickable arrow button
            const toggle = document.createElement('span');
            toggle.classList.add('submenu-toggle');
            toggle.innerHTML = '<i class="arrow"></i>';

            // Insert the arrow AFTER the link, but still inside the list item
            item.querySelector('a').insertAdjacentElement('afterend', toggle);

            // Add a click listener ONLY to the arrow
            toggle.addEventListener('click', function(e) {
                e.preventDefault(); // Stop any other actions
                e.stopPropagation(); // Stop the event from bubbling up
                item.classList.toggle('open'); // Open/close the dropdown
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const menu = document.querySelector('#slide-out-widget-area .menu');
    console.log("main.js: submenu start");
    if (!menu) return;

    const toggles = menu.querySelectorAll('.submenu-toggle');
    const backButtons = menu.querySelectorAll('.sub-menu .back');
    console.log("main.js: submenu inside");


    // --- 1. Handle Opening the Sub-menu ---
    toggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault(); // Stop the link from navigating anywhere
            const parentLi = toggle.closest('.menu-item-has-children');
            
            // Add classes to create the "new page" effect
            menu.classList.add('submenu-is-active');
            parentLi.classList.add('active-submenu-parent');
    console.log("main.js: submenu active");

        });
    });

    // --- 2. Handle the "Back" Button to Close the Sub-menu ---
    backButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // Stop the link from navigating
            
            // Remove classes to go back to the main menu
            menu.classList.remove('submenu-is-active');
    console.log("main.js: submenu close");

            
            const activeParent = menu.querySelector('.active-submenu-parent');
            if (activeParent) {
                activeParent.classList.remove('active-submenu-parent');
            }
        });
    });
});
    
})(jQuery);