// assets/js/mapHover.js
document.addEventListener('DOMContentLoaded', () => {
    const mapImage = document.querySelector('#community-map');
    const mapSection = document.querySelector('#map-section'); // This should be the direct parent of the image and highlight container

    // Create a single highlight container that we will reuse
    let highlightContainer = document.createElement('div');
    highlightContainer.classList.add('lot-highlight-container');
    mapSection.appendChild(highlightContainer);

    // Variables to store natural dimensions and current displayed dimensions
    let naturalWidth, naturalHeight;
    let currentWidth, currentHeight;

    // Function to update dimensions and recalculate scales
    function updateDimensions() {
        if (mapImage.complete) { // Ensure image is fully loaded
            naturalWidth = mapImage.naturalWidth;
            naturalHeight = mapImage.naturalHeight;
            currentWidth = mapImage.offsetWidth;
            currentHeight = mapImage.offsetHeight;
            console.log('Image Dims - Natural:', naturalWidth, naturalHeight, 'Current:', currentWidth, currentHeight);

            // Set the highlight container's size to match the scaled image
            highlightContainer.style.width = currentWidth + 'px';
            highlightContainer.style.height = currentHeight + 'px';
        } else {
            console.warn('Image not fully loaded yet. Cannot get dimensions.');
        }
    }

    // Call updateDimensions when the image loads and initially if already loaded
    mapImage.onload = updateDimensions;
    if (mapImage.complete) {
        updateDimensions();
    }

    // Event listeners for areas
    const areas = document.querySelectorAll('map[name="lotmap"] area');

    // Function to calculate scaled coordinates
    function getScaledCoords(coordsString) {
        if (!naturalWidth || !naturalHeight || !currentWidth || !currentHeight) {
            console.warn('Image dimensions not available for scaling.');
            return [];
        }

        const scaleX = currentWidth / naturalWidth;
        const scaleY = currentHeight / naturalHeight;

        return coordsString.split(',').map((coord, index) => {
            const val = parseFloat(coord);
            if (index % 2 === 0) { // x-coordinate
                return val * scaleX;
            } else { // y-coordinate
                return val * scaleY;
            }
        });
    }

    // Function to draw a polygon using SVG
    function drawPolygon(coords) {
        // Clear any existing SVG content
        highlightContainer.innerHTML = '';

        // Create SVG element
        const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgElement.setAttribute('width', currentWidth); // Use current scaled width
        svgElement.setAttribute('height', currentHeight); // Use current scaled height
        svgElement.style.position = 'absolute';
        svgElement.style.top = '0';
        svgElement.style.left = '0';
        svgElement.style.overflow = 'visible'; // Allow shapes to exceed SVG bounds if needed for precision

        const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        polygon.setAttribute('points', coords.join(','));
        polygon.setAttribute('fill', 'rgba(0, 123, 255, 0.5)'); // Blue with 50% opacity
        polygon.setAttribute('stroke', '#007bff');
        polygon.setAttribute('stroke-width', '2');

        svgElement.appendChild(polygon);
        highlightContainer.appendChild(svgElement);
        highlightContainer.style.display = 'block';
    }

    areas.forEach(area => {
        area.addEventListener('mouseover', (event) => {
            updateDimensions(); // Recalculate dimensions on each hover to ensure accuracy if resized
            const lotName = area.alt || area.title;
            console.log(`Hovering over ${lotName}`);

            const coords = getScaledCoords(area.coords);
            if (coords.length > 0) {
                if (area.shape === 'poly') {
                    drawPolygon(coords);
                }
            }
        });

        area.addEventListener('mouseout', () => {
            highlightContainer.style.display = 'none';
            highlightContainer.innerHTML = ''; // Clear SVG on mouseout
        });
    });

    // Handle map resizing: Recalculate dimensions and hide highlight
    let resizeTimeout;
    window.addEventListener('resize', () => {
        highlightContainer.style.display = 'none';
        highlightContainer.innerHTML = ''; // Clear SVG content
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateDimensions(); // Update dimensions after resize
        }, 100); // Debounce to avoid excessive recalculations during resize
    });
});