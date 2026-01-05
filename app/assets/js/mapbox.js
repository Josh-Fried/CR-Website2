mapboxgl.accessToken = "pk.eyJ1Ijoiam9zaGZyaWVkIiwiYSI6ImNtZzVweXhqbTA4ZXAya3B4M2QzcXF4OWEifQ.GPxLToDEuWvH8-VHGtPh6Q";

// --- ANIMATION LOCATIONS ---
const locations = [
  // 1. Zoom into Costa Rica.
  { center: [-84.2, 9.75], zoom: 6.5, duration: 5000, pause: 5000 },
  // 2. Zoom into the specific resort.
  { center: [-85.623, 10.608], zoom: 11.01, duration: 5000, pause: 6000 },
];
let currentLocationIndex = 0;

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/joshfried/cmg6vnoj700gy01rh9dcnfkw5",
  center: locations[0].center,
  zoom: locations[0].zoom,
});

// Get references to all elements
const mapContainer = document.getElementById("map");
const overlay = document.getElementById("map-overlay");
const mapPrompt = document.querySelector(".map-click-prompt");

let originalMapParent = mapContainer.parentElement;
let originalOverlayParent = overlay.parentElement;

// --- CREATE PULSING MARKER ---
const el = document.createElement('div');
el.className = 'pulsing-marker hidden';
const pulsingMarker = new mapboxgl.Marker(el)
  .setLngLat([-85.623, 10.608])
  .addTo(map);

function openMap() {
  originalMapParent = mapContainer.parentElement;
  originalOverlayParent = overlay.parentElement;

  document.body.appendChild(mapContainer);
  document.body.appendChild(overlay);

  mapContainer.classList.add("fullscreen");
  overlay.classList.add("visible");
  
  el.classList.remove('hidden');

  // UPDATED: Wait 600ms to ensure the fullscreen animation is totally done
  setTimeout(() => {
    map.resize(); 
    
    map.flyTo({
        center: [-85.63131, 10.61016], // The specific coordinates you want
        zoom: 11.53,
        duration: 2000,
        essential: true,
        padding: 0 // Explicitly ensures no weird offsets are applied
    });
  }, 100); 
}

// --- CLOSE MAP FUNCTION ---
function closeMap() {
  mapContainer.classList.remove("fullscreen");
  overlay.classList.remove("visible");

  setTimeout(() => {
    if (originalMapParent) {
      originalMapParent.appendChild(mapContainer);
      if (mapPrompt) originalMapParent.appendChild(mapPrompt);
    }
    if (originalOverlayParent) {
      originalOverlayParent.appendChild(overlay);
    }
    setTimeout(() => {
      map.resize();
      // Optional: Reset view to animation start so it doesn't look jumpy when loop resumes
      // map.flyTo({ center: locations[currentLocationIndex].center, zoom: locations[currentLocationIndex].zoom, duration: 1000 });
    }, 50);
  }, 300);
}

// --- ANIMATION LOOP ---
async function runAnimationLoop() {
  await new Promise((resolve) => map.on("load", resolve));

  while (true) {
    // If fullscreen, pause the loop entirely
    if (mapContainer.classList.contains("fullscreen")) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      continue;
    }

    // --- MARKER LOGIC ---
    // Only manage marker visibility if NOT fullscreen (fullscreen handles it manually)
    if (!mapContainer.classList.contains("fullscreen")) {
        // Adjust this logic if you want the marker visible at different times
        // Currently: Shows during Costa Rica view (Index 0), hides during Resort view (Index 1)
        if (currentLocationIndex === 0) {
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
        }
    }

    const nextLocation = locations[currentLocationIndex];
    
    // We only fly if NOT fullscreen (double check to prevent fighting)
    if (!mapContainer.classList.contains("fullscreen")) {
        map.flyTo({ ...nextLocation });
    
        await new Promise((resolve) =>
            setTimeout(resolve, nextLocation.duration + nextLocation.pause)
        );
    
        currentLocationIndex = (currentLocationIndex + 1) % locations.length;
    }
  }
}

runAnimationLoop();

// Click Listeners
mapContainer.addEventListener("click", () => {
  if (!mapContainer.classList.contains("fullscreen")) openMap();
});

if (mapPrompt) {
  mapPrompt.addEventListener("click", () => {
    if (!mapContainer.classList.contains("fullscreen")) openMap();
  });
}

overlay.addEventListener("click", () => {
  if (mapContainer.classList.contains("fullscreen")) closeMap();
});

// TEMPORARY: Helper to find coordinates
// Drag the map to the view you want, then check the Console
map.on('moveend', () => {
  const center = map.getCenter();
  const zoom = map.getZoom();
  // formatting it so you can copy/paste directly
  console.log(`Center: [${center.lng.toFixed(5)}, ${center.lat.toFixed(5)}], Zoom: ${zoom.toFixed(2)}`);
});