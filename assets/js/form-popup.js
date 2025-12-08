document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. CONFIGURATION ---
    const priceRequestForm = document.getElementById('contact-us-form'); 
    const requestButtons = document.querySelectorAll('.price-request-button, .inquire-button');
    const closeButton = document.querySelector('.modal-close');
    const successInput = document.querySelector('input[name="lm_FormResponsePage"]');

    // --- 2. AUTO-SET RETURN URL ---
    // This tells the CRM: "After submission, come back to this page with ?status=success attached"
    if (successInput) {
        // Uses window.location.origin to work on both Localhost and TriadaCollections.com automatically
        successInput.value = window.location.origin + window.location.pathname + '?status=success';
    }

    // --- 3. MODAL UTILITIES ---
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

    // --- 4. SUCCESS DETECTION ---
    // This runs immediately when the page loads (e.g., after the CRM redirects you back)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('status') === 'success') {
        
        // A. Open the modal immediately
        openForm();

        // B. Switch the modal content to "Success Mode"
        const modalContent = priceRequestForm.querySelector('.modal-content');
        if (modalContent) {
            // Hide the form and original text
            const form = modalContent.querySelector('form');
            const introText = modalContent.querySelector('p');
            const title = modalContent.querySelector('h3');
            
            if (form) form.style.display = 'none';
            if (introText) introText.style.display = 'none';
            
            // Update Title
            if (title) {
                title.textContent = 'Message Sent!';
                title.style.color = '#2e7d32'; // Success Green
            }

            // Create and append the success message
            const successMsg = document.createElement('div');
            successMsg.innerHTML = `
                <div style="text-align: center; padding: 20px 0;">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 15px;">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <p style="font-size: 1.1em; line-height: 1.5;">
                        Thank you for reaching out.<br>
                        We have received your inquiry and will be in touch shortly.
                    </p>
                    <button class="submit-button" id="close-success-btn" style="margin-top: 20px;">Close</button>
                </div>
            `;
            modalContent.appendChild(successMsg);

            // Add click listener to the new "Close" button
            const newCloseBtn = successMsg.querySelector('#close-success-btn');
            if (newCloseBtn) {
                newCloseBtn.addEventListener('click', closeForm);
            }
        }

        // C. Clean the URL (Remove ?status=success so it doesn't reappear on refresh)
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
    }

    // --- 5. STANDARD EVENT LISTENERS ---
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
});