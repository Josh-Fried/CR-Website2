// assets/js/propertiesFilter.js

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.properties-filter-buttons button');
    const propertyCards = document.querySelectorAll('.property-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'active-filter-btn' from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active-filter-btn'));

            // Add 'active-filter-btn' to the clicked button
            button.classList.add('active-filter-btn');

            const filterType = button.dataset.filter; // 'all', 'beachfront', etc.

            propertyCards.forEach(card => {
                const cardTypes = card.dataset.type.split(' '); // e.g., ['beachfront', 'villa']

                if (filterType === 'all' || cardTypes.includes(filterType)) {
                    card.style.display = 'block'; // Show the card
                } else {
                    card.style.display = 'none'; // Hide the card
                }
            });
        });
    });
});