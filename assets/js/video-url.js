 // This script will run on page load and fix all video paths.
        window.addEventListener('DOMContentLoaded', async () => {
            try {
                // 1. Fetch the base URL from our API.
                const response = await fetch('/api/GetConfig');
                const config = await response.json();
                const baseUrl = config.baseUrl;

                // Only proceed if a base URL was found.
                if (baseUrl !== undefined) {
                    // 2. Find ALL video source elements on the page.
                    const videoSources = document.querySelectorAll('video > source');

                    // 3. Loop through each source and prepend the base URL.
                    videoSources.forEach(source => {
                        const originalSrc = source.getAttribute('src');
                        // Combine the base URL with the relative path.
                        source.src = baseUrl + originalSrc;
                    });
                    
                    // Reload the videos to apply the new sources
                    document.querySelectorAll('video').forEach(video => video.load());
                }

            } catch (error) {
                console.error('Failed to configure video sources:', error);
            }
        });