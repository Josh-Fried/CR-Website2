document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. SETUP ---
    const backToCardButton = document.getElementById('backToCardBtn');

    if (backToCardButton) {
        backToCardButton.style.display = 'none';
    }
    let lastClickedCardId = null; 
    const detailsButtons = document.querySelectorAll('.details-button');

    // --- 2. 'REMEMBER' WHICH CARD WAS CLICKED ---
    detailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const parentCard = button.closest('.property-card');
            
            if (parentCard) {
                lastClickedCardId = parentCard.id;
                backToCardButton.style.display = 'block';
            }
        });
    });

    // --- 3. SCROLL BACK TO THE REMEMBERED CARD ---
    backToCardButton.addEventListener('click', function() {
        if (lastClickedCardId) {
            const targetCard = document.getElementById(lastClickedCardId);
            if (targetCard) {
                targetCard.scrollIntoView({ behavior: 'auto', block: 'center' });
                backToCardButton.style.display = 'none'; 
            }
        }
    });

});