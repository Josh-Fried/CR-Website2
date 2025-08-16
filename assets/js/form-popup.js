// In your form-popup.js file

// document.addEventListener('DOMContentLoaded', function() {
    
//     const priceRequestForm = document.getElementById('price-request-form'); 
//     const requestButtons = document.querySelectorAll('.price-request-button');
//     const closeButton = document.querySelector('.modal-close');

//     function openForm() {
//         priceRequestForm.style.display = 'flex';
//         // ADD THIS LINE: Stops the body from scrolling
//         document.body.classList.add('form-is-open');
//     }

//     function closeForm() {
//         priceRequestForm.style.display = 'none';
//         // ADD THIS LINE: Allows the body to scroll again
//         document.body.classList.remove('form-is-open');
//     }

//     // Attach the event listeners
//     requestButtons.forEach(button => {
//         button.addEventListener('click', function(event) {
//             event.preventDefault();
//             openForm();
//         });
//     });

//     closeButton.addEventListener('click', closeForm);

//     priceRequestForm.addEventListener('click', function(event) {
//         if (event.target === priceRequestForm) {
//             closeForm();
//         }
//     });
// });

document.addEventListener('DOMContentLoaded', function() {
    
    const priceRequestForm = document.getElementById('price-request-form'); 
    const requestButtons = document.querySelectorAll('.price-request-button, .inquire-button');
    const closeButton = document.querySelector('.modal-close');

    function openForm() {
        priceRequestForm.style.display = 'flex';
        document.body.classList.add('form-is-open');
    }

    function closeForm() {
        priceRequestForm.style.display = 'none';
        document.body.classList.remove('form-is-open');
    }

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

    // --- New form submission logic ---
    const form = document.getElementById('contact-form-in-modal');
    const formStatus = document.getElementById('form-status');
    const submitButton = form.querySelector('.submit-button');

    form.addEventListener('submit', async (event) => {
        // Prevent the default browser action of reloading the page
        event.preventDefault();

        // Disable the submit button and show a "sending" message
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        formStatus.textContent = ''; // Clear previous status

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // You can add the brokerId from a cookie here if needed
        // For example: data.brokerId = getCookie('referral_code');

        try {
            // Send the data to your serverless function
            const response = await fetch('/api/SubmitContact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                formStatus.textContent = 'Thank you! Your message has been sent.';
                formStatus.style.color = 'green';
                form.reset(); // Clear the form fields
                // Optionally, close the form after a short delay
                setTimeout(closeForm, 3000); 
            } else {
                const errorText = await response.text();
                formStatus.textContent = `An error occurred: ${errorText}`;
                formStatus.style.color = 'red';
            }
        } catch (error) {
            formStatus.textContent = 'A network error occurred. Please try again.';
            formStatus.style.color = 'red';
        } finally {
            // Re-enable the submit button
            submitButton.disabled = false;
            submitButton.textContent = 'Send Request';
        }
    });
});