document.addEventListener('DOMContentLoaded', function() {
    
    // --- Existing Modal Logic (Keep this) ---
    const priceRequestForm = document.getElementById('contact-us-form'); 
    const requestButtons = document.querySelectorAll('.price-request-button, .inquire-button');
    const closeButton = document.querySelector('.modal-close');

    function openForm() {
        if (priceRequestForm) {
            priceRequestForm.style.display = 'flex';
            document.body.classList.add('form-is-open');
        }
    }

    function closeForm() {
        if (priceRequestForm) {
            priceRequestForm.style.display = 'none';
            document.body.classList.remove('form-is-open');
        }
    }

    requestButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            openForm();
        });
    });

    if (closeButton) {
        closeButton.addEventListener('click', closeForm);
    }

    if (priceRequestForm) {
        priceRequestForm.addEventListener('click', function(event) {
            if (event.target === priceRequestForm) {
                closeForm();
            }
        });
    }

    // --- Updated Submission Logic for CRM Tool ---
    const form = document.getElementById('contact-form-in-modal');
    const formStatus = document.getElementById('form-status');
    const hiddenIframe = document.getElementById('hidden_iframe');

    if (form && formStatus && hiddenIframe) {
        const submitButton = form.querySelector('.submit-button');

        // 1. When the user clicks submit...
        form.addEventListener('submit', function(event) {
            // We do NOT preventDefault(). We want the form to submit to the iframe.
            
            // Update UI to show we are working
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
            }
            formStatus.textContent = '';
        });

        // 2. When the invisible iframe finishes loading, we know the CRM received the data.
        hiddenIframe.addEventListener('load', function() {
            // Check if the form was actually submitted (prevents triggering on page load)
            if (submitButton && submitButton.disabled) {
                formStatus.textContent = 'Thank you! Your message has been sent.';
                formStatus.style.color = 'green';
                
                form.reset(); // Clear the inputs

                // Re-enable button
                submitButton.textContent = 'Send Message';
                submitButton.disabled = false;

                // Close the modal after 3 seconds
                setTimeout(closeForm, 3000);
            }
        });
    }
});