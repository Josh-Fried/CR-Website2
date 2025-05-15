// carousel.js

$(document).ready(function() {
    // Initialize Slick Carousel on the element with the class 'center-mode-carousel'
    $('.center-mode-carousel').slick({
      centerMode: true,        // Enable center mode
      centerPadding: '40px',   // Adjust the padding on the sides of the centered slide (can be '0px')
      slidesToShow: 3,          // The number of slides to show at once (including the centered one)
      arrows: true,             // Show navigation arrows (true/false)
      dots: false,              // Show navigation dots (true/false)
      infinite: true,           // Enable infinite looping (true/false)
      speed: 300,               // Transition speed in milliseconds
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
          }
        }
        // You can add more breakpoints and settings as needed
      ]
    });
  });