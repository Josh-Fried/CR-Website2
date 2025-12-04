
mapboxgl.accessToken =
"pk.eyJ1Ijoiam9zaGZyaWVkIiwiYSI6ImNtZzVweXhqbTA4ZXAya3B4M2QzcXF4OWEifQ.GPxLToDEuWvH8-VHGtPh6Q";

// --- UPDATED LOCATIONS TO RESTORE ANIMATION ---
const locations = [
// 1. Start in the Atlantic (Restored for "fly-in" animation)
// { center: [-40, 30], zoom: 1.0, duration: 4000, pause: 1000 },
// 2. Zoom into Costa Rica.
{ center: [-84.2, 9.75], zoom: 6.5, duration: 5000, pause: 5000 },
// 3. Zoom into the specific resort.
{
    center: [-85.623, 10.608],
    zoom: 11.01,
    duration: 5000,
    pause: 6000,
},
];
let currentLocationIndex = 0;

const map = new mapboxgl.Map({
container: "map", // container ID
style: "mapbox://styles/joshfried/cmg6vnoj700gy01rh9dcnfkw5",
center: locations[0].center, // Start at the first location
zoom: locations[0].zoom,
});

// Get references to all elements
const mapContainer = document.getElementById("map");
const overlay = document.getElementById("map-overlay");
const mapPrompt = document.querySelector(".map-click-prompt");

// Store the original parent elements
let originalMapParent = mapContainer.parentElement;
let originalOverlayParent = overlay.parentElement;

// --- CREATE PULSING MARKER ---
const el = document.createElement('div');
el.className = 'pulsing-marker hidden'; // Start hidden
const pulsingMarker = new mapboxgl.Marker(el)
.setLngLat([-85.623, 10.608]) 
.addTo(map);
// --- END MARKER ---

// Function to open the map modal
function openMap() {
// Store parents just in case
originalMapParent = mapContainer.parentElement;
originalOverlayParent = overlay.parentElement;

document.body.appendChild(mapContainer);
document.body.appendChild(overlay);

mapContainer.classList.add("fullscreen");
overlay.classList.add("visible");

setTimeout(() => {
    map.resize();
}, 50); // Resize *after* transition starts
}

// --- COMPLETELY REBUILT closeMap FUNCTION ---
function closeMap() {
// 1. Start the CSS transition by removing classes
mapContainer.classList.remove("fullscreen");
overlay.classList.remove("visible");

// 2. Wait for the (new 250ms) transition to finish
setTimeout(() => {
    
    // 3. FORCE THE CORRECT ORDER
    if (originalMapParent) {
    // First, put the map back.
    originalMapParent.appendChild(mapContainer);
    
    // Second, find the prompt and MOVE it to the end.
    if (mapPrompt) {
        originalMapParent.appendChild(mapPrompt);
    }
    }
    
    // 4. Put the overlay back
    if (originalOverlayParent) {
    originalOverlayParent.appendChild(overlay);
    }

    // 5. FIX THE SKEW:
    //    Wait a tiny bit for DOM to settle, *then* resize.
    setTimeout(() => {
    map.resize();
    }, 50);

}, 300); // 300ms (just over 250ms transition)
}

// An async function to handle the animation loop precisely
async function runAnimationLoop() {
await new Promise((resolve) => map.on("load", resolve));

while (true) {
    
    // --- UPDATED Show/Hide Marker Logic ---
    // Show marker at location index 1 (Costa Rica view)
    if (currentLocationIndex === 0) {
    el.classList.remove('hidden');
    } else {
    el.classList.add('hidden');
    }
    // --- End Show/Hide Logic ---

    // If the map is enlarged, pause the animation loop
    if (mapContainer.classList.contains("fullscreen")) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    continue; 
    }

    const nextLocation = locations[currentLocationIndex];
    map.flyTo({ ...nextLocation });

    await new Promise((resolve) =>
    setTimeout(resolve, nextLocation.duration + nextLocation.pause)
    );

    currentLocationIndex = (currentLocationIndex + 1) % locations.length;
}
}

// Start the animation loop
runAnimationLoop();

// Add a click event listener to the map container
mapContainer.addEventListener("click", () => {
if (!mapContainer.classList.contains("fullscreen")) {
    openMap();
}
});

// Add click listener to the prompt as well
if (mapPrompt) {
mapPrompt.addEventListener("click", () => {
    if (!mapContainer.classList.contains("fullscreen")) {
    openMap();
    }
});
}

// Add a click event listener to the overlay
overlay.addEventListener("click", () => {
if (mapContainer.classList.contains("fullscreen")) {
    closeMap();
}
});