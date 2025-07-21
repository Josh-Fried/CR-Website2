// assets/js/mapHover.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Data for all maps and their respective lots ---
    // Group lot data by the ID of the map image it belongs to.
    const allMapData = {
        'map-image-main': [ // Data for the main MasMap.png
            { id: 'Lot5', name: 'The Point', href: 'lot5-section', units: '5 Houses', averagePrice: '$6,476,000', coords: '178,1333,171,1092,215,1071,263,1069,315,1054,353,1019,398,954,410,914,407,822,416,800,428,787,469,780,490,786,504,805,521,912,530,936,440,1063,424,1113,422,1161,448,1237,455,1313,474,1357,500,1384,540,1402,592,1405,570,1495,502,1474,346,1391' },
            { id: 'Lot10', name: 'Cliffside', href: 'lot10-section', units: '9 Houses, 8 apartments, 1 penthouse', averagePrice: '$6,712,000', coords: '822,741,835,609,925,414,1103,240,1113,248,1172,241,1196,274,1214,273,1231,316,1235,352,1228,456,1229,501,1243,549,1293,639,1300,669,1302,709,1292,762,1260,811,1228,844,1106,890,983,918' },
            { id: 'Lot13', name: 'The Bluffs (Lot 13)', href: 'lot13-section', units: '2 Houses', averagePrice: '$6,467,000', coords: '1370,485,1531,451,1550,496,1576,513,1610,517,1612,572,1624,626,1565,641,1468,700,1402,543' },
            { id: 'Lot14', name: 'The Bluffs (Lot 14)', href: 'lot14-section', units: '4 Houses', averagePrice: 'From $833,000', coords: '1368,465,1361,281,1373,113,1524,80,1576,254,1631,267,1648,305,1733,271,1752,269,1804,304,1806,316,1785,337,1673,394,1645,418,1633,442,1563,414,1550,430' }
        ],
        'map-image-lot5': [ // Data for Lot5.png
            { id: 'Lot1', name: 'The Point - Lot 1', href: 'the_point.html#lot1', units: '1 House', averagePrice: '$1,200,000', coords: '217,958,297,748,477,765,482,782,492,885,408,1048,321,1002' },
            { id: 'Lot2', name: 'The Point - Lot 2', href: 'the_point.html#lot2', units: '1 House', averagePrice: '$1,350,000', coords: '81,918,71,556,120,533,143,528,215,523,215,679,297,748,217,961' },
            { id: 'Lot3', name: 'The Point - Lot 3', href: 'the_point.html#lot3', units: '1 House', averagePrice: '$1,100,000', coords: '215,525,253,514,282,501,442,616,445,663,456,710,478,765,298,747,216,680' },
            { id: 'Lot4', name: 'The Point - Lot 4', href: 'the_point.html#lot4', units: '1 House', averagePrice: '$950,000', coords: '282,500,325,470,402,359,416,326,536,414,472,508,454,550,441,617' },
            { id: 'Lot5', name: 'The Point - Lot 5', href: 'the_point.html#lot5', units: '1 House', averagePrice: '$1,050,000', coords: '416,325,423,281,420,147,433,122,460,100,517,92,545,104,565,128,592,305,599,327,536,415' }
        ],
        'map-image-lot10': [ // Data for Lot10Map.png
            { id: 'Home1', name: 'Cliffside Home 1', href: 'cliffside.html#lot10-1', units: '1 House', averagePrice: '$7,200,000', coords: '729,901,500,796,450,753,482,602,567,618,614,620,650,618,776,596,779,688,729,733' },
            { id: 'Home2', name: 'Cliffside Home 2', href: 'cliffside.html#lot10-2', units: '1 House', averagePrice: '$6,900,000', coords: '729,900,729,734,779,689,776,595,988,547,988,983,909,977,817,941' },
            { id: 'Home3', name: 'Cliffside Home 3', href: 'cliffside.html#lot10-3', units: '1 House', averagePrice: '$6,850,000', coords: '988,547,1100,523,1154,520,1247,520,1247,842,988,844' },
            { id: 'SouthApartments', name: 'South Apartments', href: 'cliffside.html#lot10-4', units: '4 Apartments', averagePrice: 'From $1,500,000', coords: '988,983,988,844,1247,842,1247,520,1519,538,1528,543,1537,554,1555,651,1562,684,1188,1001' },
            { id: 'NorthApartments', name: 'North Apartments', href: 'cliffside.html#lot10-5', units: '4 Apartments + 1 Penthouse', averagePrice: 'From $1,800,000', coords: '1076,444,1208,307,1208,62,1271,87,1314,114,1355,149,1386,183,1404,208,1424,244,1447,300,1496,428,1494,439,1490,448,1476,451,1238,435,1154,435' },
            { id: 'Home4', name: 'Cliffside Home 4', href: 'cliffside.html#lot10-6', units: '1 House', averagePrice: '$6,500,000', coords: '952,470,952,74,1001,52,1044,45,1127,45,1168,52,1208,61,1208,306,1076,445' },
            { id: 'Home5', name: 'Cliffside Home 5', href: 'cliffside.html#lot10-7', units: '1 House', averagePrice: '$6,700,000', coords: '698,527,698,188,740,176,790,158,952,75,952,469' },
            { id: 'Home6', name: 'Cliffside Home 6', href: 'cliffside.html#lot10-8', units: '1 House', averagePrice: '$6,400,000', coords: '443,501,443,187,601,193,653,193,698,187,698,526,644,535,594,537,538,528' },
            { id: 'Home7', name: 'Cliffside Home 7', href: 'cliffside.html#lot10-9', units: '1 House', averagePrice: '$6,650,000', coords: '308,593,160,450,142,306,216,256,205,247,200,238,203,227,209,220,270,196,326,182,441,184,443,501,349,472' }
        ],
        'map-image-lot13': [ // Data for Lot13Map.png
            { id: 'Home1', name: 'The Bluffs - Home 1', href: 'the_bluffs.html#lot13-1', units: '1 House', averagePrice: '$6,300,000', coords: '393,785,730,785,963,691,1158,735,1171,763,1185,782,1205,807,1237,829,1270,842,1297,849,1322,849,1351,847,1371,842,1393,834,1420,820,1440,805,1458,787,1472,765,1485,740,1495,720,1544,711,1631,1042,1279,1134,720,1471,678,1471' },
            { id: 'Home2', name: 'The Bluffs - Home 2', href: 'the_bluffs.html#lot13-2', units: '1 House', averagePrice: '$6,100,000', coords: '393,785,327,624,106,205,1064,0,1079,2,1072,25,1077,52,1200,280,1223,312,1240,329,1262,347,1287,361,1334,379,1317,495,1279,500,1247,515,1213,535,1188,560,1168,589,1156,619,1148,646,1146,676,1148,698,1158,733,960,691,728,782' }
        ],
        'map-image-lot14': [ // Data for Lot14Map.png
            { id: 'Home3', name: 'The Bluffs - Home 3', href: 'the_bluffs.html#lot14-1', units: '1 House', averagePrice: '$5,950,000', coords: '249,1479,225,826,342,917,574,1002,618,975,676,1054,667,1069,661,1092,659,1113,661,1133,667,1154,676,1171,688,1186,702,1198,717,1209,738,1221,825,1255,986,1304,969,1302,957,1307,931,1337' },
            { id: 'Home4', name: 'The Bluffs - Home 4', href: 'the_bluffs.html#lot14-2', units: '1 House', averagePrice: '$5,800,000', coords: '225,823,225,781,266,177,828,51,1016,701,875,1054,869,1060,858,1040,840,1025,822,1011,799,1002,767,999,743,1002,714,1016,700,1028,676,1051,618,973,574,1002,340,917' },
            { id: 'Home5', name: 'The Bluffs - Home 5', href: 'the_bluffs.html#lot14-3', units: '1 House', averagePrice: '$6,050,000', coords: '869,1062,878,1050,1016,699,1244,743,1229,749,1291,889,1352,939,1291,1041,1177,1167,1171,1187,1139,1179,1127,1211,1147,1217,1139,1249,925,1182,890,1170,881,1158,878,1149,878,1141,881,1114,878,1085' },
            { id: 'Home6', name: 'The Bluffs - Home 6', href: 'the_bluffs.html#lot14-4', units: '1 House', averagePrice: '$6,250,000', coords: '1171,1189,1177,1166,1291,1043,1352,937,1294,888,1578,765,1610,756,1630,753,1651,756,1674,759,1689,762,1703,771,1864,870,1876,879,1882,896,1882,911,1876,926,1850,952,1815,984,1788,1002,1747,1031,1417,1195,1376,1221,1343,1242' }
        ]
    };

    // A single infoBox element for all maps
    let infoBox = document.createElement('div');
    infoBox.classList.add('lot-info-box');
    document.body.appendChild(infoBox);

    function initializeMapInteractivity(mapImageId) {
        const mapImage = document.getElementById(mapImageId);
        if (!mapImage) {
            console.error(`Map image with ID '${mapImageId}' not found.`);
            return;
        }

        const currentMapLotData = allMapData[mapImageId];
        if (!currentMapLotData) {
            console.warn(`No lot data found for map image ID: ${mapImageId}`);
            return;
        }

        // Create elements specific to this map's interactivity
        let highlightSVGContainer = document.createElement('div');
        highlightSVGContainer.classList.add('lot-highlight-container');
        document.body.appendChild(highlightSVGContainer);

        let clickableSVGOverlay = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        clickableSVGOverlay.classList.add('clickable-svg-overlay');
        document.body.appendChild(clickableSVGOverlay);

        let naturalWidth, naturalHeight;
        let currentWidth, currentHeight;
        let imageAbsoluteLeft = 0;
        let imageAbsoluteTop = 0;

        // Function to update dimensions and calculate absolute positions for THIS map
        function updateDimensions() {
            // Check if image is loaded and has rendered dimensions
            if (!mapImage.complete || mapImage.offsetWidth === 0 || mapImage.offsetHeight === 0) {
                console.warn(`Image '${mapImageId}' not fully loaded or not rendered yet. Retrying...`);
                requestAnimationFrame(updateDimensions); // Keep retrying until ready
                return;
            }

            naturalWidth = mapImage.naturalWidth;
            naturalHeight = mapImage.naturalHeight;
            currentWidth = mapImage.offsetWidth;
            currentHeight = mapImage.offsetHeight;

            const imageRect = mapImage.getBoundingClientRect();
            imageAbsoluteLeft = imageRect.left + window.scrollX;
            imageAbsoluteTop = imageRect.top + window.scrollY;

            // console.log(`[${mapImageId}] Image Dims - Natural:`, naturalWidth, naturalHeight, 'Current:', currentWidth, currentHeight);
            // console.log(`[${mapImageId}] Image Absolute Pos:`, imageAbsoluteLeft, imageAbsoluteTop);

            // Position and size the highlight container
            highlightSVGContainer.style.width = currentWidth + 'px';
            highlightSVGContainer.style.height = currentHeight + 'px';
            highlightSVGContainer.style.left = imageAbsoluteLeft + 'px';
            highlightSVGContainer.style.top = imageAbsoluteTop + 'px';

            // Position and size the clickable SVG overlay
            clickableSVGOverlay.setAttribute('width', currentWidth);
            clickableSVGOverlay.setAttribute('height', currentHeight);
            clickableSVGOverlay.style.width = currentWidth + 'px'; // Ensure CSS width matches
            clickableSVGOverlay.style.height = currentHeight + 'px'; // Ensure CSS height matches
            clickableSVGOverlay.style.left = imageAbsoluteLeft + 'px';
            clickableSVGOverlay.style.top = imageAbsoluteTop + 'px';
            clickableSVGOverlay.style.position = 'absolute';
            clickableSVGOverlay.style.zIndex = '11';
            clickableSVGOverlay.style.overflow = 'hidden';
            clickableSVGOverlay.innerHTML = ''; // Clear previous polygons

            // Redraw clickable polygons on the overlay for THIS map
            currentMapLotData.forEach(lot => {
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
                    const hoveredLot = event.target.dataset;
                    drawHighlight(scaledCoords, highlightSVGContainer); // Pass specific highlight container
                    showInfoBox(hoveredLot, event, mapImage); // Pass mapImage for relative positioning
                });

                polygon.addEventListener('mouseout', () => {
                    hideHighlight(highlightSVGContainer); // Pass specific highlight container
                    hideInfoBox();
                });

                polygon.addEventListener('click', (event) => {
                    const clickedLotHref = event.target.dataset.href;
                    if (clickedLotHref) {
                        // Check if href is a full path or a local hash
                        if (clickedLotHref.includes('.html')) {
                            window.location.href = clickedLotHref; // Navigate to new page
                        } else {
                            // If it's a local hash (e.g., #lot5Map)
                            const targetElement = document.getElementById(clickedLotHref);
                            if (targetElement) {
                                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                history.pushState(null, '', '#' + clickedLotHref);
                            } else {
                                console.warn(`Target element #${clickedLotHref} not found on this page.`);
                            }
                        }
                    }
                });

                clickableSVGOverlay.appendChild(polygon);
            });
        }

        // Initial setup for THIS map
        // Use requestAnimationFrame loop for continuous checks until dimensions are non-zero
        requestAnimationFrame(updateDimensions); // Start the checking process for this map
        mapImage.onload = updateDimensions; // Redundancy
        
        // Add map-specific event listeners for window resize/scroll, but only manage THIS map's elements
        // This is tricky. It's better to have ONE global resize/scroll listener that updates ALL maps.
        // So these need to be handled outside this function.
        // We will pass the specific highlightSVGContainer to the draw/hide functions.
    }

    // --- Global Functions (single instances for all maps) ---
    function drawHighlight(coords, container) {
        container.innerHTML = '';

        const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        // Use the container's current size as the SVG's viewport
        svgElement.setAttribute('width', container.offsetWidth);
        svgElement.setAttribute('height', container.offsetHeight);
        svgElement.style.position = 'relative';
        svgElement.style.top = '0';
        svgElement.style.left = '0';
        svgElement.style.overflow = 'visible'; // Allow polygon to draw slightly outside if needed

        const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        polygon.setAttribute('points', coords.join(','));
        polygon.setAttribute('fill', 'rgba(0, 123, 255, 0.5)');
        polygon.setAttribute('stroke', '#007bff');
        polygon.setAttribute('stroke-width', '2');

        svgElement.appendChild(polygon);
        container.appendChild(svgElement);
        container.style.display = 'block';
    }

    function hideHighlight(container) {
        container.style.display = 'none';
        container.innerHTML = '';
    }

    function showInfoBox(lotData, event, mapImageElement) {
        infoBox.innerHTML = `
            <h3>${lotData.name}</h3>
            <p>Units: ${lotData.units}</p>
            <p>Avg. Price: ${lotData.averagePrice}</p>
        `;
        
        // Get the bounding box of the hovered SVG polygon relative to its SVG overlay
        let boxX, boxY;
        if (event.target.getBBox) {
            const bbox = event.target.getBBox();
            // Convert polygon's bbox coordinates (relative to SVG) to document coordinates
            const clickableOverlayRect = event.target.ownerSVGElement.getBoundingClientRect(); // Get SVG overlay's position
            boxX = clickableOverlayRect.left + window.scrollX + bbox.x + bbox.width / 2;
            boxY = clickableOverlayRect.top + window.scrollY + bbox.y + bbox.height / 2;
        } else {
            // Fallback: position relative to image center if getBBox is not available (should be for SVG polygons)
            const imageRect = mapImageElement.getBoundingClientRect();
            boxX = imageRect.left + window.scrollX + mapImageElement.offsetWidth / 2;
            boxY = imageRect.top + window.scrollY + mapImageElement.offsetHeight / 2;
        }

        let boxWidth = infoBox.offsetWidth;
        let boxHeight = infoBox.offsetHeight;

        const offsetX = 10; 
        const offsetY = 10;

        boxX -= boxWidth / 2; // Center horizontally
        boxY -= boxHeight + offsetY; // Position above the lot/polygon, with some offset

        // Prevent overflow to the left
        if (boxX < window.scrollX + 10) {
            boxX = window.scrollX + 10;
        }
        // Prevent overflow to the right
        if (boxX + boxWidth + 10 > window.innerWidth + window.scrollX) {
            boxX = window.innerWidth + window.scrollX - boxWidth - 10;
        }
        // Prevent overflow to the top
        if (boxY < window.scrollY + 10) {
            boxY = window.scrollY + 10;
        }
        // Prevent overflow to the bottom (if it ends up below the image)
        if (boxY + boxHeight + 10 > window.innerHeight + window.scrollY) {
            boxY = window.innerHeight + window.scrollY - boxHeight - 10;
            // If it's still forced above current image bottom, place below image for safety
            if (boxY < (mapImageElement.getBoundingClientRect().top + window.scrollY + mapImageElement.offsetHeight + offsetY)) { 
                 boxY = mapImageElement.getBoundingClientRect().top + window.scrollY + mapImageElement.offsetHeight + offsetY; 
            }
        }
        
        infoBox.style.left = boxX + 'px';
        infoBox.style.top = boxY + 'px';
        infoBox.style.display = 'block';
    }

    function hideInfoBox() {
        infoBox.style.display = 'none';
    }

    // --- Global Event Listeners for ALL maps ---
    let resizeTimeout;
    window.addEventListener('resize', () => {
        // Hide info box and highlights from all maps during resize
        hideInfoBox();
        document.querySelectorAll('.lot-highlight-container').forEach(container => hideHighlight(container));

        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Reinitialize all maps after resize
            Object.keys(allMapData).forEach(mapImageId => {
                initializeMapInteractivity(mapImageId);
            });
        }, 100);
    });

    let scrollTimeout;
    window.addEventListener('scroll', () => {
        // Hide info box and highlights from all maps during scroll
        hideInfoBox();
        document.querySelectorAll('.lot-highlight-container').forEach(container => hideHighlight(container));

        clearTimeout(scrollTimeout); // Use a different timeout for scroll
        scrollTimeout = setTimeout(() => {
            // Reinitialize all maps after scroll
            Object.keys(allMapData).forEach(mapImageId => {
                initializeMapInteractivity(mapImageId);
            });
        }, 100);
    });

    // --- Initialize all maps on page load ---
    Object.keys(allMapData).forEach(mapImageId => {
        initializeMapInteractivity(mapImageId);
    });
});