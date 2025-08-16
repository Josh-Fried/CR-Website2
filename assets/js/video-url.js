// This script detects the environment and sets the video source accordingly.

window.addEventListener('DOMContentLoaded', () => {
    // Define the base URL for your production videos.
    const productionBaseUrl = 'https://papagayobay.blob.core.windows.net/';

    // Check if the script is running on a local development server.
    const isLocal = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost';

    // Set the baseUrl based on the environment.
    const baseUrl = isLocal ? '' : productionBaseUrl;

    // Find all video elements on the page.
    const videos = document.querySelectorAll('video');

    // Loop through each video element.
    videos.forEach(video => {
        // Find the source element inside this video that has a "data-src" attribute.
        const source = video.querySelector('source[data-src]');

        // If a source with data-src was found...
        if (source) {
            // Get the relative path from the "data-src" attribute.
            const relativePath = source.getAttribute('data-src');

            // Build the full URL and set it as the REAL src.
            source.src = baseUrl + relativePath;

            // Tell the parent video element to load this new source.
            video.load();
        }
    });
});

// window.addEventListener('DOMContentLoaded', () => {
//     // Define the base URL for your production videos.
//     const productionBaseUrl = 'https://papagayobay.blob.core.windows.net/';

//     // Check if the script is running on a local development server.
//     const isLocal = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost';

//     // Set the baseUrl based on the environment.
//     // If local, the base URL is an empty string. Otherwise, it's the production URL.
//     const baseUrl = isLocal ? '' : productionBaseUrl;

//     // Find all video source elements on the page.
//     const videoSources = document.querySelectorAll('video > source');

//     // Loop through each source and prepend the correct base URL.
//     videoSources.forEach(source => {
//         const originalSrc = source.getAttribute('src');
//         source.src = baseUrl + originalSrc;
//     });
    
//     // Reload the videos to apply the new sources. This is important.
//     document.querySelectorAll('video').forEach(video => video.load());
// });

