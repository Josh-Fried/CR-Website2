// This file is assets/js/alexCarousel.js

$(document).ready(function() {

    var $carousel = $('.center-mode-slider');
    var $slickCounter = $('.slick-counter');
    
    // This function will be called to update the counter text
    function updateCounter(slick) {
        // slick.currentSlide is the index (0, 1, 2, etc.)
        // We add 1 to make it human-readable (1, 2, 3, etc.)
        var currentSlide = slick.currentSlide + 1;
        var totalSlides = slick.slideCount;
        $slickCounter.text(currentSlide + ' / ' + totalSlides);
    }

    // This is the key part:
    // We attach our function to two events: 'init' and 'afterChange'
    // 'init' fires ONCE, right when the carousel is first created.
    // 'afterChange' fires every time a slide is changed.
    $carousel.on('init afterChange', function(event, slick) {
        // The slick object is passed to our function, which has all the info we need.
        updateCounter(slick);
    });

    // Now, we initialize the Slick Carousel.
    // The 'init' event above will fire as soon as this next block of code is finished.
    $carousel.slick({
        centerMode: true,
        centerPadding: '150px', // Adjust for how much of the prev/next slides you want to show
        slidesToShow: 3,       // Number of slides to show at once (odd number is best for center mode)
        infinite: true,        // Loop the slides
        dots: false,            // Show navigation dots
        arrows: true,          // Show navigation arrows
        focusOnSelect: true,   // Center the slide when it's clicked
        infinite: true,        // Loop the slides
        speed: 600,
        adaptiveHeight: true,
        responsive: [
            {
                // --- NEW! STANDARD LAPTOP (1440px and below) ---
                breakpoint: 1440,
                settings: {
                    slidesToShow: 3,
                    centerPadding: '100px', // A good, balanced "peek" for most laptops
                }
            },
            {
                // --- SMALLER LAPTOP (1280px and below) ---
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                    centerPadding: '100px', // Reduces the peek a bit more
                }
            },
            {
                // --- TABLET VIEW (980px and below) ---
                // Here we switch to showing only one slide
                breakpoint: 1025,
                settings: {
                    slidesToShow: 3,
                    centerPadding: '120px'
                }
            },
            {
                // --- MOBILE VIEW (736px and below) ---
                breakpoint: 736,
                settings: {
                    slidesToShow: 1,
                    centerPadding: '50px'
                }
            }
        ]
    });


});