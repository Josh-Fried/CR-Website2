document.addEventListener('DOMContentLoaded', function() {

    function setActiveNavLink() {
        // Get and normalize the current page's name (e.g., "the_point" or "index")
        const currentPath = window.location.pathname;
        let currentPageName = currentPath.replace(/^\/|\/$/g, '').replace('.html', '');
        if (currentPageName === '' || currentPageName === 'index') {
            currentPageName = 'index';
        }

        const navItems = document.querySelectorAll('#header-outer nav > ul > li.menu-item');

        // First, clear the active class from all items to prevent multiple underlines
        navItems.forEach(item => item.classList.remove('current-menu-item'));

        // SPECIAL CASE: If we are on the home page, only highlight the "Home" link and stop.
        if (currentPageName === 'index') {
            const homeLink = document.querySelector('a[href="./"], a[href="index.html"]');
            if (homeLink) {
                const parentLi = homeLink.closest('li.menu-item');
                if (parentLi) {
                    parentLi.classList.add('current-menu-item');
                }
            }
            return; // Exit the function early
        }

        // FOR ALL OTHER PAGES: Find the parent category that contains a link to the current page.
        for (const item of navItems) {
            const linksInItem = item.querySelectorAll('a');
            let isCurrentPageSection = false;

            for (const link of linksInItem) {
                if (!link || !link.href || link.getAttribute('href') === '#') continue;

                const linkUrl = new URL(link.href, window.location.origin);
                let linkPageName = linkUrl.pathname.replace(/^\/|\/$/g, '').replace('.html', '');
                
                if (linkPageName === currentPageName) {
                    isCurrentPageSection = true;
                    break; // Found a match, no need to check other links in this group
                }
            }

            if (isCurrentPageSection) {
                item.classList.add('current-menu-item');
                break; // Found the correct parent category, no need to check other categories
            }
        }
    }

    // Run the function to set the active link
    setActiveNavLink();

});