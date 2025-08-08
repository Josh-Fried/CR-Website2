$(document).ready(function(){
            // Iterate over each property card to initialize its own carousel
            $('.property-card').each(function() {
                var $card = $(this);
                var $carousel = $card.find('.home-slide-carousel');
                var $slideCount = $card.find('.slide-count');

                // Logic to update slide count for THIS carousel
                var updateCount = function(event, slick, currentSlide) {
                    var i = (currentSlide ? currentSlide : 0) + 1;
                    $slideCount.text(i + ' / ' + slick.slideCount);
                };

                // Listen for events to update the count
                $carousel.on('init reInit afterChange', updateCount);

                // Initialize Slick Carousel for THIS specific carousel
                $carousel.slick({
                    dots: true,
                    arrows: true, // Enable arrows
                    prevArrow: '<button type="button" class="slick-prev-arrow"><i class="fas fa-chevron-left"></i></button>',
                    nextArrow: '<button type="button" class="slick-next-arrow"><i class="fas fa-chevron-right"></i></button>',
                    infinite: true,
                    speed: 500,
                    fade: true,
                    cssEase: 'linear',
                    autoplay: false, // Autoplay is off by default
                    autoplaySpeed: 2000,
                    slidesToShow: 1,
                    slidesToScroll: 1
                });

                // Set a flag to control autoplay
                $card.data('autoplay-enabled', true);

                // Add hover functionality to play/pause the carousel
                $card.hover(function() {
                    // Only play if autoplay hasn't been manually paused
                    if ($(this).data('autoplay-enabled')) {
                        $carousel.slick('slickPlay');
                    }
                }, function() {
                    $carousel.slick('slickPause');
                    // Reset the flag when the mouse leaves, so it autoplays on next hover
                    $(this).data('autoplay-enabled', true);
                });

                // Add a click handler to the arrows and dots to pause autoplay
                $carousel.find('.slick-arrow, .slick-dots button').on('click', function() {
                    $card.data('autoplay-enabled', false);
                    $carousel.slick('slickPause');
                });
            });
        });