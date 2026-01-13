// assets/js/mapHover.js (Updated)

document.addEventListener('DOMContentLoaded', () => {

    const allMapData = {
        'map-image-main': {
            mapType: 'main-parcel',
            lots: [
                { id: 'Lot5', name: 'The Point', href: 'maps#lot5-section', units: '5 Houses', sqft: '8,611 - 10,323', coords: '178,1333,171,1092,215,1071,263,1069,315,1054,353,1019,398,954,410,914,407,822,416,800,428,787,469,780,490,786,504,805,521,912,530,936,440,1063,424,1113,422,1161,448,1237,455,1313,474,1357,500,1384,540,1402,592,1405,570,1495,502,1474,346,1391' },
                { id: 'Lot10', name: 'Cliffside', href: 'maps#lot10-section', units: '7 Houses, 12 condos, 2 penthouses', sqft: '1,378 - 11,173', coords: '822,741,835,609,925,414,1103,240,1113,248,1172,241,1196,274,1214,273,1231,316,1235,352,1228,456,1229,501,1243,549,1293,639,1300,669,1302,709,1292,762,1260,811,1228,844,1106,890,983,918' },
                { id: 'Lot13', name: 'The Bluffs (Lot 13)', href: 'maps#lot13-section', units: '2 Houses', sqft: '6,566 - 9,900', coords: '1370,485,1531,451,1550,496,1576,513,1610,517,1612,572,1624,626,1565,641,1468,700,1402,543' },
                { id: 'Lot14', name: 'The Bluffs (Lot 14)', href: 'maps#lot14-section', units: '4 Houses', sqft: '7,223 - 13,681', coords: '1368,465,1361,281,1373,113,1524,80,1576,254,1631,267,1648,305,1733,271,1752,269,1804,304,1806,316,1785,337,1673,394,1645,418,1633,442,1563,414,1550,430' }
            ]
        },
        'map-image-lot5': {
            mapType: 'individual-lot',
            lots: [
                { id: 'Lot1', name: 'The Point - Home 1', href: 'the_point#lot1', beds: '8', baths: '8.5', sqft: '10,323', coords: '217,958,297,748,477,765,482,782,492,885,408,1048,321,1002' },
                { id: 'Lot2', name: 'The Point - Home 2', href: 'the_point#lot2', beds: '5', baths: '5.5', sqft: '10,290', coords: '81,918,71,556,120,533,143,528,215,523,215,679,297,748,217,961' },
                { id: 'Lot3', name: 'The Point - Home 3', href: 'the_point#lot3', beds: '6', baths: '6.5', sqft: '9,279', coords: '215,525,253,514,282,501,442,616,445,663,456,710,478,765,298,747,216,680' },
                { id: 'Lot4', name: 'The Point - Home 4', href: 'the_point#lot4', beds: '6', baths: '6.5', sqft: '8,611', coords: '282,500,325,470,402,359,416,326,536,414,472,508,454,550,441,617' },
                { id: 'Lot5', name: 'The Point - Home 5', href: 'the_point#lot5', beds: '5', baths: '5.5', sqft: '13,294', coords: '416,325,423,281,420,147,433,122,460,100,517,92,545,104,565,128,592,305,599,327,536,415' }
            ]
        },
        'map-image-lot10': {
            mapType: 'individual-lot',
            lots: [
                { id: 'Home1', name: 'Cliffside Home 1', href: 'cliffside#lot10-1', beds: '5', baths: '5.5', sqft: '11.065', coords: '729,901,500,796,450,753,482,602,567,618,614,620,650,618,776,596,779,688,729,733' },
                { id: 'Home2', name: 'Cliffside Home 2', href: 'cliffside#lot10-2', beds: '6', baths: '6.5', sqft: '11,173', coords: '729,900,729,734,779,689,776,595,988,547,988,983,909,977,817,941' },
                { id: 'Home3', name: 'Cliffside Home 3', href: 'cliffside#lot10-3', beds: '4', baths: '4.5', sqft: '10,829', coords: '988,547,1100,523,1154,520,1247,520,1247,842,988,844' },
                { id: 'SouthCondos', name: 'South Condos', href: 'cliffside#lot10-4', units: '4 Condos + 4 Condos + 1 Penthouse', beds: '2, 2, 3', baths: '2, 2.5, 3.5', sqft: '1,378, 2,099, 3,606', coords: '988,983,988,844,1247,842,1247,520,1519,538,1528,543,1537,554,1555,651,1562,684,1188,1001' },
                { id: 'NorthCondos', name: 'North Condos', href: 'cliffside#lot10-5', units: '4 Condos + 1 Penthouse', beds: '2, 3', baths: '2.5, 3.5', sqft: '2,099, 3,606', coords: '1076,444,1208,307,1208,62,1271,87,1314,114,1355,149,1386,183,1404,208,1424,244,1447,300,1496,428,1494,439,1490,448,1476,451,1238,435,1154,435' },
                { id: 'Home4', name: 'Cliffside Home 4', href: 'cliffside#lot10-6', beds: '4', baths: '4.5', sqft: '9,924', coords: '952,470,952,74,1001,52,1044,45,1127,45,1168,52,1208,61,1208,306,1076,445' },
                { id: 'Home5', name: 'Cliffside Home 5', href: 'cliffside#lot10-7', beds: '4', baths: '4.5', sqft: '9,063', coords: '698,527,698,188,740,176,790,158,952,75,952,469' },
                { id: 'Home6', name: 'Cliffside Home 6', href: 'cliffside#lot10-8', beds: '4', baths: '4.5', sqft: '8,999', coords: '443,501,443,187,601,193,653,193,698,187,698,526,644,535,594,537,538,528' },
                { id: 'Home7', name: 'Cliffside Home 7', href: 'cliffside#lot10-9', beds: '4', baths: '4.5', sqft: '9,042', coords: '308,593,160,450,142,306,216,256,205,247,200,238,203,227,209,220,270,196,326,182,441,184,443,501,349,472' }
            ]
        },
        'map-image-lot13': {
            mapType: 'individual-lot',
            lots: [
                { id: 'Home1', name: 'The Bluffs - Home 1', href: 'the_bluffs#lot13-1', beds: '3', baths: '3.5', sqft: '6,566', coords: '393,785,730,785,963,691,1158,735,1171,763,1185,782,1205,807,1237,829,1270,842,1297,849,1322,849,1351,847,1371,842,1393,834,1420,820,1440,805,1458,787,1472,765,1485,740,1495,720,1544,711,1631,1042,1279,1134,720,1471,678,1471' },
                { id: 'Home2', name: 'The Bluffs - Home 2', href: 'the_bluffs#lot13-2', beds: '6', baths: '6.5', sqft: '9,900', coords: '393,785,327,624,106,205,1064,0,1079,2,1072,25,1077,52,1200,280,1223,312,1240,329,1262,347,1287,361,1334,379,1317,495,1279,500,1247,515,1213,535,1188,560,1168,589,1156,619,1148,646,1146,676,1148,698,1158,733,960,691,728,782' }
            ]
        },
        'map-image-lot14': {
            mapType: 'individual-lot',
            lots: [
                { id: 'Home3', name: 'The Bluffs - Home 3', href: 'the_bluffs#lot14-1', beds: '6', baths: '6.5', sqft: '12,702', coords: '249,1479,225,826,342,917,574,1002,618,975,676,1054,667,1069,661,1092,659,1113,661,1133,667,1154,676,1171,688,1186,702,1198,717,1209,738,1221,825,1255,986,1304,969,1302,957,1307,931,1337' },
                { id: 'Home4', name: 'The Bluffs - Home 4', href: 'the_bluffs#lot14-2', beds: '10', baths: '10.5', sqft: '13,681', coords: '225,823,225,781,266,177,828,51,1016,701,875,1054,869,1060,858,1040,840,1025,822,1011,799,1002,767,999,743,1002,714,1016,700,1028,676,1051,618,973,574,1002,340,917' },
                { id: 'Home5', name: 'The Bluffs - Home 5', href: 'the_bluffs#lot14-3', beds: '4', baths: '4.5', sqft: '7,223', coords: '869,1062,878,1050,1016,699,1244,743,1229,749,1291,889,1352,939,1291,1041,1177,1167,1171,1187,1139,1179,1127,1211,1147,1217,1139,1249,925,1182,890,1170,881,1158,878,1149,878,1141,881,1114,878,1085' },
                { id: 'Home6', name: 'The Bluffs - Home 6', href: 'the_bluffs#lot14-4', beds: '4', baths: '4.5', sqft: '7,330', coords: '1171,1189,1177,1166,1291,1043,1352,937,1294,888,1578,765,1610,756,1630,753,1651,756,1674,759,1689,762,1703,771,1864,870,1876,879,1882,896,1882,911,1876,926,1850,952,1815,984,1788,1002,1747,1031,1417,1195,1376,1221,1343,1242' }
            ]
        }
    };

    let infoBox = document.createElement('div');
    infoBox.classList.add('lot-info-box');
    document.body.appendChild(infoBox);

    function initializeMapInteractivity(mapImageId) {
        const mapImage = document.getElementById(mapImageId);
        if (!mapImage) {
            console.error(`Map image with ID '${mapImageId}' not found.`);
            return;
        }

        const mapConfig = allMapData[mapImageId];
        if (!mapConfig || !mapConfig.lots) {
            console.warn(`No lot data found for map image ID: ${mapImageId}`);
            return;
        }
        const currentMapLotData = mapConfig.lots;
        const mapType = mapConfig.mapType;

        let highlightSVGContainer = document.createElement('div');
        highlightSVGContainer.classList.add('lot-highlight-container');
        highlightSVGContainer.style.zIndex = '10';
        document.body.appendChild(highlightSVGContainer);

        let clickableSVGOverlay = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        clickableSVGOverlay.classList.add('clickable-svg-overlay');
        document.body.appendChild(clickableSVGOverlay);

        let naturalWidth, naturalHeight;
        let currentWidth, currentHeight;
        let imageAbsoluteLeft = 0;
        let imageAbsoluteTop = 0;

        function updateDimensions() {
            if (!mapImage.complete || mapImage.offsetWidth === 0 || mapImage.offsetHeight === 0) {
                requestAnimationFrame(updateDimensions);
                return;
            }

            naturalWidth = mapImage.naturalWidth;
            naturalHeight = mapImage.naturalHeight;
            currentWidth = mapImage.offsetWidth;
            currentHeight = mapImage.offsetHeight;

            const imageRect = mapImage.getBoundingClientRect();
            imageAbsoluteLeft = imageRect.left + window.scrollX;
            imageAbsoluteTop = imageRect.top + window.scrollY;

            highlightSVGContainer.style.width = currentWidth + 'px';
            highlightSVGContainer.style.height = currentHeight + 'px';
            highlightSVGContainer.style.left = imageAbsoluteLeft + 'px';
            highlightSVGContainer.style.top = imageAbsoluteTop + 'px';

            clickableSVGOverlay.setAttribute('width', currentWidth);
            clickableSVGOverlay.setAttribute('height', currentHeight);
            clickableSVGOverlay.style.width = currentWidth + 'px';
            clickableSVGOverlay.style.height = currentHeight + 'px';
            clickableSVGOverlay.style.left = imageAbsoluteLeft + 'px';
            clickableSVGOverlay.style.top = imageAbsoluteTop + 'px';
            clickableSVGOverlay.style.position = 'absolute';
            clickableSVGOverlay.style.zIndex = '11';
            clickableSVGOverlay.style.overflow = 'hidden';
            clickableSVGOverlay.innerHTML = '';

            currentMapLotData.forEach(lot => {
                const scaledCoords = lot.coords.split(',').map((coord, index) => {
                    const val = parseFloat(coord);
                    return (index % 2 === 0) ? val * (currentWidth / naturalWidth) : val * (currentHeight / naturalHeight);
                });

                let polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
                polygon.setAttribute('points', scaledCoords.join(','));
                polygon.setAttribute('fill', 'transparent');
                polygon.setAttribute('stroke', 'transparent');
                
                for (const key in lot) {
                    if (lot.hasOwnProperty(key)) {
                        polygon.dataset[key] = lot[key];
                    }
                }
                polygon.dataset.mapType = mapType;

                polygon.addEventListener('mouseover', (event) => {
                    const hoveredLot = event.target.dataset;
                    drawHighlight(scaledCoords, highlightSVGContainer);
                    showInfoBox(hoveredLot, event, mapImage);
                });

                polygon.addEventListener('mouseout', () => {
                    hideHighlight(highlightSVGContainer);
                    hideInfoBox();
                });

                // =====================================================================
                // UPDATED CLICK HANDLER
                // =====================================================================
                polygon.addEventListener('click', (event) => {
                    const clickedLotHref = event.target.dataset.href;
                    if (!clickedLotHref) return;

                    // Split the href into path and hash
                    const [path, hash] = clickedLotHref.split('#');
                    const targetId = hash ? '#' + hash : null;

                    // Check if the link is for the current page
                    const isSamePage = !path || window.location.pathname.includes(path);

                    if (targetId) {
                        if (isSamePage) {
                            // --- BEHAVIOR FOR SAME-PAGE LINKS ---
                            const targetElement = document.querySelector(targetId);
                            if (targetElement) {
                                // This assumes getHeaderOffset() is globally available from your other script
                                const offset = (typeof getHeaderOffset === 'function') ? getHeaderOffset() : 0;
                                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
                                window.scrollTo({ top: targetPosition, behavior: 'auto' });
                            } else {
                                console.warn(`Target element ${targetId} not found on this page.`);
                            }
                        } else {
                            // --- BEHAVIOR FOR DIFFERENT-PAGE LINKS ---
                            localStorage.setItem('scrollToTarget', targetId);
                            window.location.href = path; // Navigate to the new page without the hash
                        }
                    } else if (path) {
                        // Handle links without a hash (just navigate)
                        window.location.href = path;
                    }
                });
                // =====================================================================

                clickableSVGOverlay.appendChild(polygon);
            });
        }

        requestAnimationFrame(updateDimensions);
        mapImage.onload = updateDimensions;
    }

    function drawHighlight(coords, container) {
        container.innerHTML = '';
        const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgElement.setAttribute('width', container.offsetWidth);
        svgElement.setAttribute('height', container.offsetHeight);
        svgElement.style.position = 'relative';
        svgElement.style.top = '0';
        svgElement.style.left = '0';
        svgElement.style.overflow = 'visible';

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
        let content = `<h3>${lotData.name}</h3>`;

        if (lotData.mapType === 'main-parcel') {
            content += `<p><b>Units:</b> ${lotData.units}</p>`;
            content += `<p><b>Sq Ft:</b> ${lotData.sqft}</p>`;
        } else if (lotData.mapType === 'individual-lot') {
            if (lotData.units) content += `<p><b>Units:</b> ${lotData.units}</p>`;
            if (lotData.beds) content += `<p><b>Beds:</b> ${lotData.beds}</p>`;
            if (lotData.baths) content += `<p><b>Baths:</b> ${lotData.baths}</p>`;
            if (lotData.sqft) content += `<p><b>Sq Ft:</b> ${lotData.sqft}</p>`;
            if (lotData.averagePrice) content += `<p><b>Price:</b> ${lotData.averagePrice}</p>`;
        }

        infoBox.innerHTML = content;

        let boxX, boxY;
        if (event.target.getBBox) {
            const bbox = event.target.getBBox();
            const clickableOverlayRect = event.target.ownerSVGElement.getBoundingClientRect();
            boxX = clickableOverlayRect.left + window.scrollX + bbox.x + bbox.width / 2;
            boxY = clickableOverlayRect.top + window.scrollY + bbox.y + bbox.height / 2;
        } else {
            const imageRect = mapImageElement.getBoundingClientRect();
            boxX = imageRect.left + window.scrollX + mapImageElement.offsetWidth / 2;
            boxY = imageRect.top + window.scrollY + mapImageElement.offsetHeight / 2;
        }

        let boxWidth = infoBox.offsetWidth;
        let boxHeight = infoBox.offsetHeight;

        const offsetX = 10;
        const offsetY = 10;

        boxX -= boxWidth / 2;
        boxY -= boxHeight + offsetY;

        if (boxX < window.scrollX + 10) boxX = window.scrollX + 10;
        if (boxX + boxWidth + 10 > window.innerWidth + window.scrollX) boxX = window.innerWidth + window.scrollX - boxWidth - 10;
        if (boxY < window.scrollY + 10) boxY = window.scrollY + 10;
        if (boxY + boxHeight + 10 > window.innerHeight + window.scrollY) {
            boxY = window.innerHeight + window.scrollY - boxHeight - 10;
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

    function reinitializeAllMaps() {
        hideInfoBox();
        document.querySelectorAll('.lot-highlight-container, .clickable-svg-overlay').forEach(el => el.remove());
        
        const mapsOnThisPage = document.querySelectorAll('.interactive-map-image');
        
        mapsOnThisPage.forEach(mapImage => {
            if (mapImage.id && allMapData[mapImage.id]) {
                initializeMapInteractivity(mapImage.id);
            }
        });
    }

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(reinitializeAllMaps, 250);
    });

    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(reinitializeAllMaps, 250);
    });

    const mapsOnThisPage = document.querySelectorAll('.interactive-map-image');

    mapsOnThisPage.forEach(mapImage => {
        if (mapImage.id && allMapData[mapImage.id]) {
            initializeMapInteractivity(mapImage.id);
        }
    });
});