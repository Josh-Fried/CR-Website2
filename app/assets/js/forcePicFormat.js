$(document).ready(function () {
    // Initialize Magnific Popup
    $('.image-wrapper a').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    // Fix layout shift after popup closes
    $(document).on('mfpClose', function () {
        $('body, html').css({
            'overflow': '',
            'padding-right': '',
            'margin-top': ''
        });
    });
});