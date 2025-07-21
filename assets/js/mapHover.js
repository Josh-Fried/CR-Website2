// assets/js/mapHover.js
document.addEventListener('DOMContentLoaded', () => {
    const mapImage = document.querySelector('#community-map');
    //const mapSection = document.querySelector('#map-section'); // The parent of your image and highlight container

    // Data for your lots (move coords from HTML <area> to here)
    // IMPORTANT: THESE COORDS MUST BE FOR THE *ORIGINAL, NATURAL SIZE* OF YOUR IMAGE
    const lotData = [
        { id: 'Lot5', name: 'The Point', href: 'lot5Map', units: '5 Houses', averagePrice: '$6,476,000', coords: '178,1333,171,1092,215,1071,263,1069,315,1054,353,1019,398,954,410,914,407,822,416,800,428,787,469,780,490,786,504,805,521,912,530,936,440,1063,424,1113,422,1161,448,1237,455,1313,474,1357,500,1384,540,1402,592,1405,570,1495,502,1474,346,1391' },
        { id: 'Lot10', name: 'Cliffside', href: 'lot10Map', units: '9 Houses, 8 apartments, 1 penthouse', averagePrice: '$6,712,000', coords: '822,741,835,609,925,414,1103,240,1113,248,1172,241,1196,274,1214,273,1231,316,1235,352,1228,456,1229,501,1243,549,1293,639,1300,669,1302,709,1292,762,1260,811,1228,844,1106,890,983,918' },
        { id: 'Lot13', name: 'The Bluffs', href: 'lot13Map', units: '2 Houses', averagePrice: '$6,467,000', coords: '1370,485,1531,451,1550,496,1576,513,1610,517,1612,572,1624,626,1565,641,1468,700,1402,543' },
        { id: 'Lot14', name: 'The Bluffs', href: 'lot14Map', units: '4 Houses', averagePrice: 'From $833,000', coords: '1368,465,1361,281,1373,113,1524,80,1576,254,1631,267,1648,305,1733,271,1752,269,1804,304,1806,316,1785,337,1673,394,1645,418,1633,442,1563,414,1550,430' }
    ];

    // const lotData = [
    //     { id: 'Lot5', name: 'The Point', href: 'Lot5Map', coords: '178,1333,171,1092,215,1071,263,1069,315,1054,353,1019,398,954,410,914,407,822,416,800,428,787,469,780,490,786,504,805,521,912,530,936,440,1063,424,1113,422,1161,448,1237,455,1313,474,1357,500,1384,540,1402,592,1405,570,1495,502,1474,346,1391' },
    //     { id: 'Lot10', name: 'Cliffside', href: 'Lot10Map', coords: '822,741,835,609,925,414,1103,240,1113,248,1172,241,1196,274,1214,273,1231,316,1235,352,1228,456,1229,501,1243,549,1293,639,1300,669,1302,709,1292,762,1260,811,1228,844,1106,890,983,918' },
    //     { id: 'Lot13', name: 'The Bluffs', href: 'Lot13Map', coords: '1370,485,1531,451,1550,496,1576,513,1610,517,1612,572,1624,626,1565,641,1468,700,1402,543' },
    //     { id: 'Lot14', name: 'The Bluffs', href: 'Lot14Map', coords: '1368,465,1361,281,1373,113,1524,80,1576,254,1631,267,1648,305,1733,271,1752,269,1804,304,1806,316,1785,337,1673,394,1645,418,1633,442,1563,414,1550,430' }
    // ];

    let highlightSVGContainer = document.createElement('div');
    highlightSVGContainer.classList.add('lot-highlight-container');
    document.body.appendChild(highlightSVGContainer); // Append to body for robust absolute positioning

    let clickableSVGOverlay = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    clickableSVGOverlay.classList.add('clickable-svg-overlay');
    document.body.appendChild(clickableSVGOverlay); // Append to body, same absolute positioning

    let infoBox = document.createElement('div');
    infoBox.classList.add('lot-info-box');
    document.body.appendChild(infoBox);

    let naturalWidth, naturalHeight;
    let currentWidth, currentHeight;
    let imageAbsoluteLeft = 0;
    let imageAbsoluteTop = 0;

    // Function to update dimensions and calculate absolute positions
    function updateDimensions() {
        if (!mapImage.complete) {
            console.warn('Image not fully loaded yet in updateDimensions. Cannot get dimensions.');
            return;
        }

        naturalWidth = mapImage.naturalWidth;
        naturalHeight = mapImage.naturalHeight;
        currentWidth = mapImage.offsetWidth;
        currentHeight = mapImage.offsetHeight;

        const imageRect = mapImage.getBoundingClientRect();
        imageAbsoluteLeft = imageRect.left + window.scrollX;
        imageAbsoluteTop = imageRect.top + window.scrollY;

        console.log('Image Dims - Natural:', naturalWidth, naturalHeight, 'Current:', currentWidth, currentHeight);
        console.log('Image Absolute Pos (from document top/left):', imageAbsoluteLeft, imageAbsoluteTop);

        // Position and size the highlight container
        highlightSVGContainer.style.width = currentWidth + 'px';
        highlightSVGContainer.style.height = currentHeight + 'px';
        highlightSVGContainer.style.left = imageAbsoluteLeft + 'px';
        highlightSVGContainer.style.top = imageAbsoluteTop + 'px';

        // Position and size the clickable SVG overlay
        clickableSVGOverlay.setAttribute('width', currentWidth);
        clickableSVGOverlay.setAttribute('height', currentHeight);
        clickableSVGOverlay.style.left = imageAbsoluteLeft + 'px';
        clickableSVGOverlay.style.top = imageAbsoluteTop + 'px';
        clickableSVGOverlay.style.position = 'absolute';
        clickableSVGOverlay.style.zIndex = '11'; // Higher z-index than highlightSVGContainer
        clickableSVGOverlay.style.overflow = 'visible';
        clickableSVGOverlay.innerHTML = ''; // Clear previous polygons

        // Redraw clickable polygons on the overlay
        lotData.forEach(lot => {
            const scaledCoords = lot.coords.split(',').map((coord, index) => {
                const val = parseFloat(coord);
                return (index % 2 === 0) ? val * (currentWidth / naturalWidth) : val * (currentHeight / naturalHeight);
            });

            let polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
            polygon.setAttribute('points', scaledCoords.join(','));
            polygon.setAttribute('fill', 'transparent');
            polygon.setAttribute('stroke', 'transparent');
            
            // Store all lot data as data attributes on the polygon
            for (const key in lot) {
                if (lot.hasOwnProperty(key)) {
                    polygon.dataset[key] = lot[key];
                }
            }

            polygon.addEventListener('mouseover', (event) => {
                const hoveredLot = event.target.dataset; // Access all data attributes
                console.log(`Mouse over scalable polygon for ${hoveredLot.name}`);
                drawHighlight(scaledCoords);
                showInfoBox(hoveredLot, event); // Pass data and event object
            });

            polygon.addEventListener('mouseout', () => {
                hideHighlight();
                hideInfoBox();
            });

            polygon.addEventListener('click', (event) => {
                const clickedLotHref = event.target.dataset.href;
                if (clickedLotHref) {
                    const targetElement = document.getElementById(clickedLotHref);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        history.pushState(null, '', '#' + clickedLotHref);
                    } else {
                        console.warn(`Target element #${clickedLotHref} not found.`);
                    }
                }
            });

            clickableSVGOverlay.appendChild(polygon);
        });
        dimensionsCalculated = true;
    }

    function checkAndInit() {
        if (mapImage.complete && mapImage.offsetWidth > 0 && mapImage.offsetHeight > 0) {
            updateDimensions();
        } else {
            requestAnimationFrame(checkAndInit); // Keep checking until image is fully rendered
        }
    }
    checkAndInit(); // Start the checking process

    // Attach to image onload as a fallback/redundancy, although requestAnimationFrame is more robust
    mapImage.onload = updateDimensions; 
    // Initial setup and on image load
    // mapImage.onload = updateDimensions;
    // if (mapImage.complete) {
    //     updateDimensions();
    // }

    // Function to draw the visual highlight (called by mouseover on invisible polygon)
    function drawHighlight(coords) {
        highlightSVGContainer.innerHTML = ''; // Clear existing highlight

        const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgElement.setAttribute('width', currentWidth);
        svgElement.setAttribute('height', currentHeight);
        svgElement.style.position = 'relative';
        svgElement.style.top = '0';
        svgElement.style.left = '0';
        svgElement.style.overflow = 'visible';

        const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        polygon.setAttribute('points', coords.join(','));
        polygon.setAttribute('fill', 'rgba(0, 123, 255, 0.5)'); // Blue with 50% opacity
        polygon.setAttribute('stroke', '#007bff');
        polygon.setAttribute('stroke-width', '2');

        svgElement.appendChild(polygon);
        highlightSVGContainer.appendChild(svgElement);
        highlightSVGContainer.style.display = 'block';
    }

    function showInfoBox(lotData, event) {
        infoBox.innerHTML = `
            <h3>${lotData.name}</h3>
            <p>Units: ${lotData.units}</p>
            <p>Avg. Price: ${lotData.averagePrice}</p>
        `;

        // Position the info box relative to the mouse cursor or the lot center
        // event.clientX/Y gives mouse position relative to viewport
        // window.scrollX/Y adds scroll to get document-relative position
        let mouseX = event.clientX + window.scrollX;
        let mouseY = event.clientY + window.scrollY;

        // Adjust position to be slightly offset from cursor and within viewport
        let boxWidth = infoBox.offsetWidth;
        let boxHeight = infoBox.offsetHeight;

        // Prevent overflow to the right
        if (mouseX + boxWidth + 20 > window.innerWidth + window.scrollX) {
            mouseX = window.innerWidth + window.scrollX - boxWidth - 20;
        }
        // Prevent overflow to the bottom
        if (mouseY + boxHeight + 20 > window.innerHeight + window.scrollY) {
            mouseY = window.innerHeight + window.scrollY - boxHeight - 20;
        }

        infoBox.style.left = (mouseX + 15) + 'px'; // 15px offset from cursor
        infoBox.style.top = (mouseY + 15) + 'px';  // 15px offset from cursor
        infoBox.style.display = 'block';
    }

    // Function to hide the visual highlight
    function hideHighlight() {
        highlightSVGContainer.style.display = 'none';
        highlightSVGContainer.innerHTML = '';
    }

    function hideInfoBox() {
        infoBox.style.display = 'none';
    }

    // Handle map resizing
    let resizeTimeout;
    window.addEventListener('resize', () => {
        hideHighlight(); // Hide during resize to prevent misplacement
        hideInfoBox();
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateDimensions(); // Recalculate dimensions and redraw clickable polygons
        }, 100);
    });

    // Handle scroll: Hide highlight during scroll
    window.addEventListener('scroll', () => {
        hideHighlight();
        hideInfoBox();
        // Optionally re-run updateDimensions on scroll end if map's absolute position changes
        // but often 'mouseover' on next interaction is sufficient.
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateDimensions();
        }, 100);
    });
});