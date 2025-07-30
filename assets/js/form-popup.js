// In your form-popup.js file

document.addEventListener('DOMContentLoaded', function() {
    
    const priceRequestForm = document.getElementById('price-request-form'); 
    const requestButtons = document.querySelectorAll('.price-request-button');
    const closeButton = document.querySelector('.modal-close');

    function openForm() {
        priceRequestForm.style.display = 'flex';
        // ADD THIS LINE: Stops the body from scrolling
        document.body.classList.add('form-is-open');
    }

    function closeForm() {
        priceRequestForm.style.display = 'none';
        // ADD THIS LINE: Allows the body to scroll again
        document.body.classList.remove('form-is-open');
    }

    // Attach the event listeners
    requestButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            openForm();
        });
    });

    closeButton.addEventListener('click', closeForm);

    priceRequestForm.addEventListener('click', function(event) {
        if (event.target === priceRequestForm) {
            closeForm();
        }
    });
});