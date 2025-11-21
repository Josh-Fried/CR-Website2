/**
 * nav-bar.js
 * FINAL VERSION: Uses direct if/else if logic based on the required root paths.
 * Guarantees that /experiences/* highlights Experiences, and defaults to Home.
 */

// --- 0. UNIVERSAL NAVIGATION BAR HTML TEMPLATE (Complete Structure) ---
const NAV_BAR_HTML_TEMPLATE = `
    <div class="ocm-effect-wrap">
        <div class="ocm-effect-wrap-inner">
            <div id="header-space" data-header-mobile-fixed="1"></div>
            <div
                id="header-outer"
                data-has-menu="true"
                data-has-buttons="no"
                data-header-button_style="default"
                data-using-pr-menu="true"
                data-mobile-fixed="1"
                data-ptnm="false"
                data-lhe="animated_underline"
                data-user-set-bg="#f4ece2"
                data-format="centered-logo-between-menu-alt"
                data-permanent-transparent="false"
                data-megamenu-rt="1"
                data-remove-fixed="0"
                data-header-resize="1"
                data-cart="false"
                data-transparency-option="1"
                data-box-shadow="none"
                data-shrink-num="25"
                data-using-secondary="0"
                data-using-logo="1"
                data-logo-height="100"
                data-m-logo-height="60"
                data-padding="24"
                data-full-width="true"
                data-condense="false"
                data-transparent-header="false"
                data-transparent-shadow-helper="false"
                data-remove-border="true"
                class=""
                >
                <div id="search-outer" class="nectar">
                    <div id="search">
                    <div class="container">
                        <div id="search-box">
                        <div class="inner-wrap">
                            <div class="col span_12">
                            <form
                                role="search"
                                action="https://triadacollections.com/"
                                method="GET"
                            >
                                <input
                                type="text"
                                name="s"
                                id="s"
                                value=""
                                aria-label="Search"
                                placeholder="Search"
                                />

                                <span>Hit enter to search or ESC to close</span>
                            </form>
                            </div>
                            <!--/span_12-->
                        </div>
                        <!--/inner-wrap-->
                        </div>
                        <!--/search-box-->
                        <div id="close">
                        <a href="#"
                            ><span class="screen-reader-text">Close Search</span>
                            <span class="close-wrap">
                            <span class="close-line close-line1"></span>
                            <span class="close-line close-line2"></span>
                            </span>
                        </a>
                        </div>
                    </div>
                    <!--/container-->
                    </div>
                    <!--/search-->
                </div>
                <!--/search-outer-->

                <header id="top">
                    <div class="container">
                    <div class="row">
                        <div class="col span_3">
                        <a
                            id="logo"
                            href="/"
                            data-supplied-ml-starting-dark="false"
                            data-supplied-ml-starting="false"
                            data-supplied-ml="true"
                        >
                            <img
                            class="stnd skip-lazy default-logo dark-version"
                            width="128"
                            height="92"
                            alt="Triada Collections"
                            src="https://triadacollections.com/wp-content/uploads/2025/02/triada-logo-fullcolor-RGB-BAHAI-COSTARICA.svg"
                            srcset="
                                https://triadacollections.com/wp-content/uploads/2025/02/triada-logo-fullcolor-RGB-BAHAI-COSTARICA.svg 1x,
                                https://triadacollections.com/wp-content/uploads/2025/02/triada-logo-fullcolor-RGB-BAHAI-COSTARICA.svg 2x
                            "
                            /><img
                            class="mobile-only-logo skip-lazy"
                            alt="Triada Collections"
                            width="128"
                            height="92"
                            src="https://triadacollections.com/wp-content/uploads/2025/02/triada-logo-fullcolor-RGB-BAHAI-COSTARICA.svg"
                            />
                        </a>
                        </div>
                        <!--/span_3-->

                        <div class="col span_9 col_last">
                        <div class="nectar-mobile-only mobile-header">
                            <div class="inner"></div>
                        </div>
                        <div
                            class="slide-out-widget-area-toggle mobile-icon fullscreen-alt"
                            data-custom-color="false"
                            data-icon-animation="simple-transform"
                        >
                            <div>
                            <a
                                href="#slide-out-widget-area"
                                role="button"
                                aria-label="Navigation Menu"
                                aria-expanded="false"
                                class="closed"
                            >
                                <span class="screen-reader-text">Menu</span
                                ><span aria-hidden="true">
                                <i class="lines-button x2"> <i class="lines"></i> </i>
                                </span>
                            </a>
                            </div>
                        </div>

                        <nav aria-label="Main Menu">
                            <ul id="menu-main-menu-1" class="sf-menu">
                            <li
                                id="menu-item-711"
                                class="menu-item menu-item-type-post_type menu-item-object-page page_item page-item-691 menu-item-has-icon nectar-regular-menu-item menu-item-711"
                                data-path="/"
                            >
                                <a
                                href="/"
                                aria-current="page"
                                class=""
                                ><img
                                    width="128"
                                    height="92"
                                    src="https://triadacollections.com/wp-content/uploads/2025/02/triada-logo-fullcolor-RGB-BAHAI-COSTARICA.svg"
                                    class="nectar-menu-icon-img"
                                    alt=""
                                    decoding="async"
                                /><span class="menu-title-text">Home</span></a
                                >
                            </li>
                            <li
                                id="menu-item-551"
                                class="menu-item menu-item-type-post_type menu-item-object-page nectar-regular-menu-item menu-item-551 menu-item-has-children"
                                data-path="RESIDENCES_PARENT_ROOT" 
                            >
                                <a href="/for-sale/">
                                    <span class="menu-title-text">Residences</span>
                                </a>
                                <ul class="sub-menu">
                                    <li class="menu-item submenu-link" data-path="/for-sale"><a href="/for-sale/">For Sale</a></li>
                                    <li class="menu-item submenu-link" data-path="/coming-soon"><a href="/coming-soon/">Coming Soon</a></li>
                                </ul>
                            </li>
                            <li
                                id="menu-item-444"
                                class="menu-item menu-item-type-post_type menu-item-object-page nectar-regular-menu-item menu-item-444"
                                data-path="/luxury-living"
                            >
                                <a href="/#luxury-living"
                                ><span class="menu-title-text">Luxury Living</span></a
                                >
                                <ul class="sub-menu">
                                    <li class="menu-item submenu-link" data-path="/luxury-living/beach-club"><a href="/luxury-living/beach-club">Beach Club</a></li>
                                </ul>
                            </li>
                            </ul>
                        </nav>
                        </div>
                        <div class="right-aligned-menu-items">
                        <nav>
                            <ul class="buttons sf-menu" data-user-set-ocm="off">
                            <li
                                id="menu-item-445"
                                class="menu-item menu-item-type-post_type menu-item-object-page nectar-regular-menu-item menu-item-445"
                                data-path="/#why-invest"
                            >
                                <a href="/#why-invest" class=""
                                ><span class="menu-title-text">Why Us</span></a
                                >
                            </li>
                            <li
                                id="menu-item-554"
                                class="menu-item menu-item-type-post_type menu-item-object-page nectar-regular-menu-item menu-item-554"
                                data-path="/experiences"
                            >
                                 <a href="/#experiences"
                          ><span class="menu-title-text">Experiences</span></a
                        >
                        <ul class="sub-menu">
                          <li class="menu-item submenu-link" data-path="/experiences/nature-pools">
                            <a href="/experiences/nature-pools">Nature Pools</a>
                          </li>
                          <li class="menu-item submenu-link" data-path="/experiences/farm-to-table">
                            <a href="/experiences/farm-to-table"
                              >Farm to Table</a
                            >
                          </li>
                          <li class="menu-item submenu-link" data-path="/experiences/fishing">
                            <a href="/experiences/fishing">Fishing</a>
                          </li>
                          <li class="menu-item submenu-link" data-path="/experiences/volcanoes">
                            <a href="/experiences/volcanoes">Volcanoes</a>
                          </li>
                          <li class="menu-item submenu-link" data-path="/experiences/nature-trails">
                            <a href="/experiences/nature-trails"
                              >Nature Trails</a
                            >
                          </li>
                          <li class="menu-item submenu-link" data-path="/experiences/snorkeling">
                            <a href="/experiences/snorkeling">Snorkeling</a>
                          </li>
                          <li class="menu-item submenu-link" data-path="/experiences/blue-zones">
                            <a href="/experiences/blue-zones">Blue Zones</a>
                          </li>
                          <li class="menu-item submenu-link" data-path="/experiences/spas">
                            <a href="/experiences/spas">Spas</a>
                          </li>
                          <li class="menu-item submenu-link" data-path="/experiences/surfing">
                            <a href="/experiences/surfing">Surfing</a>
                          </li>
                        </ul>
                      </li>
                      <li
                        id="menu-item-439"
                        class="button-style menu-item menu-item-type-custom menu-item-object-custom menu-item-btn-style-button-border_accent-color nectar-regular-menu-item menu-item-439"
                        data-path="/inquire"
                      >
                        <a href="#" class="inquire-button"
                          ><span class="menu-title-text">INQUIRE</span></a
                        >
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </header>
        </div>
        <div id="slide-out-widget-area-bg" class="fullscreen-alt medium">
          <div class="bg-inner"></div>
        </div>
        <div id="slide-out-widget-area" class="fullscreen-alt">
          <div class="inner-wrap">
            <div class="inner">
              <a class="slide_out_area_close" href="#"
                ><span class="screen-reader-text">Close Menu</span
                ><span class="close-wrap"
                  ><span class="close-line close-line1"></span>
                  <span class="close-line close-line2"></span>
                </span>
              </a>
              <div
                class="off-canvas-menu-container mobile-only"
                role="navigation"
              >
                <ul class="menu">
                  <!-- Mobile Menu (Mirroring Desktop data-path structure is best practice) -->
                  <li class="menu-item"><a href="/">Home</a></li>
                  <li class="menu-item has-children">
                    <a class="residences" href="/for-sale/">Residences</a>
                   <ul class="sub-menu">
                      <li class="menu-item">
                        <a href="/for-sale/">For Sale</a>
                      </li>
                      <li class="menu-item">
                        <a href="/coming-soon/">Coming Soon</a>
                      </li>
                    </ul>
                  </li>
                  <li class="menu-item has-children">
                    <a class="ll" href="/#luxury-living">Luxury Living</a>
                    <ul class="sub-menu">
                      <li class="menu-item">
                        <a href="/luxury-living/beach-club">Beach Club</a>
                      </li>
                    </ul>
                  </li>
                  <li class="menu-item"><a href="/#why-invest" class="">Why Us</a></li>                  
                  <li class="menu-item has-children">
                    <a href="/#experiences">Experiences</a>
                    <ul class="sub-menu">
                      <li class="menu-item">
                        <a href="/experiences/nature-pools">Nature Pools</a>
                      </li>
                      <li class="menu-item">
                        <a href="/experiences/farm-to-table">Farm to Table</a>
                      </li>
                      <li class="menu-item">
                        <a href="/experiences/fishing">Fishing</a>
                      </li>
                      <li class="menu-item">
                        <a href="/experiences/volcanoes">Volcanoes</a>
                      </li>
                      <li class="menu-item">
                        <a href="/experiences/nature-trails">Nature Trails</a>
                      </li>
                      <li class="menu-item">
                        <a href="/experiences/snorkeling">Snorkeling</a>
                      </li>
                      <li class="menu-item">
                        <a href="/experiences/blue-zones">Blue Zones</a>
                      </li>
                      <li class="menu-item">
                        <a href="/experiences/spas">Spas</a>
                      </li>
                      <li class="menu-item">
                        <a href="/experiences/surfing">Surfing</a>
                      </li>
                    </ul>
                  </li>
                  <li class="button-style menu-item">
                    <a href="#" class="inquire-button">INQUIRE</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
`;

// --- 1. CORE LOGIC FUNCTIONS ---

// Function to normalize the URL path for consistent comparison
const normalizePath = (url) => {
  const path = new URL(url, window.location.origin).pathname;
  let normalized = path.replace(/\/$/, "");
  if (normalized === "") {
    normalized = "/";
  }
  return normalized;
};

// --- CUSTOM HEADER OFFSET LOGIC (From your original theme scripts) ---
function getHeaderOffset() {
  let smallHeaderHeight;
  const breakpoint = 960; // The screen width where the header changes

  // These values (84 and 102) were taken from your provided main.js logic and need to be exact for the offset to work.
  if (window.innerWidth <= breakpoint) {
    smallHeaderHeight = 84;
  } else {
    smallHeaderHeight = 102;
  }

  const rootFontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );
  const sectionPaddingInPixels = 2 * rootFontSize; // This calculation is based on your theme's conventions

  // Returns the calculated offset height needed to push the target element down by the header height.
  return smallHeaderHeight + sectionPaddingInPixels;
}

const highlightCurrentMenuItem = () => {
  // ... (Highlighting logic remains the same for simplicity, using the direct prefix checks)
  const currentPathname = normalizePath(window.location.href);
  const currentHash = window.location.hash;
  let effectivePath = currentPathname;

  if (currentHash && currentHash.startsWith("#")) {
    const pathnameForHashMatch = currentPathname === "/" ? "" : currentPathname;
    effectivePath = pathnameForHashMatch + currentHash;
  }

  // 2. Clear all existing active classes
  document
    .querySelectorAll(".current-menu-item, .current-page-item")
    .forEach((el) => {
      el.classList.remove("current-menu-item", "current-page-item");
    });

  // 3. Define all top-level parents by their ID
  let targetId = "menu-item-711"; // Default to Home (menu-item-711)

  // --- SIMPLIFIED DIRECT PREFIX MATCHING ---
  if (effectivePath.startsWith("/experiences")) {
    targetId = "menu-item-554";
  } else if (effectivePath.startsWith("/luxury-living")) {
    targetId = "menu-item-444";
  } else if (
    effectivePath.startsWith("/for-sale") ||
    effectivePath.startsWith("/coming-soon")
  ) {
    targetId = "menu-item-551";
  } else if (effectivePath === "/#why-invest") {
    targetId = "menu-item-445";
  } else if (effectivePath === "/") {
    targetId = "menu-item-711";
  }
  // else, targetId remains default 'menu-item-711' (Home)

  // 4. Apply class to the identified target and ensure the specific sub-link is also highlighted

  // Apply class to the Parent Tab (the item that won the if/else if logic)
  const parentElement = document.getElementById(targetId);
  if (parentElement) {
    parentElement.classList.add("current-menu-item");
  }

  // Secondary Check: Find and highlight the specific sub-link if an exact match exists.
  const specificLink = document.querySelector(
    `#menu-main-menu-1 li[data-path='${effectivePath}']`
  );
  if (specificLink && specificLink !== parentElement) {
    specificLink.classList.add("current-menu-item", "current-page-item");
  }
};

// --- CUSTOM ANCHOR SCROLLING LOGIC (PART 1: Handles Clicks) ---
const handleAnchorLinks = () => {
    // PART 1: Handles Clicks on All Links
    document.body.addEventListener('click', function(e) {
        const link = e.target.closest('a');

        if (!link || !link.getAttribute('href')) return;
        
        const href = link.getAttribute('href');
        
        // Check if the link contains an anchor ID, regardless of whether it's a cross-page or same-page link
        const hashMatch = href.match(/#.+/);
        
        if (hashMatch) {
            e.preventDefault(); // Stop default jump/URL update

            const hash = hashMatch[0]; // e.g., "#luxury-living"
            const linkPath = href.split('#')[0]; // e.g., "/" or "/new-page"
            const currentPath = normalizePath(window.location.href);
            
            // Normalize linkPath to ensure reliable comparison against the current clean path
            const normalizedLinkPath = normalizePath(linkPath || '/'); 
            
            const isSamePageScroll = normalizedLinkPath === currentPath;

            if (isSamePageScroll) {
                // --- BEHAVIOR FOR SAME-PAGE SCROLLS (Scroll without touching history) ---
                const targetElement = document.querySelector(hash);
                if (targetElement) {
                    const offset = getHeaderOffset();
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
                    
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                    
                    // Do NOT update history here to suppress the hash from the URL bar.
                }
            } else {
                // --- BEHAVIOR FOR CROSS-PAGE SCROLLS (Navigate and store scroll target) ---
                // Store the target ID in temporary browser memory
                localStorage.setItem('scrollToTarget', hash);
                
                // Navigate to the new page path (e.g., go to / instead of /experiences/volcanoes#luxury-living)
                window.location.href = normalizedLinkPath;
            }
        }
    });

    // PART 2: Runs on Every Page Load (Checks if we just arrived from another page)
    const scrollTargetId = localStorage.getItem('scrollToTarget');
    if (scrollTargetId && scrollTargetId.startsWith('#')) {
        const targetElement = document.querySelector(scrollTargetId);
        if (targetElement) {
            // Wait a moment for the page to render fully, then scroll
            setTimeout(() => {
                const offset = getHeaderOffset();
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });

                // Update URL to show the anchor and clean up localStorage
                // We use replaceState to avoid cluttering the browser history with the scroll action itself
                history.replaceState(null, null, scrollTargetId); 
                localStorage.removeItem('scrollToTarget');
            }, 100);
        } else {
             // If the target is not found (e.g., the element ID changed), clear the item
            localStorage.removeItem('scrollToTarget');
        }
    }
};

// --- 2. INJECTION AND EXECUTION ---

const injectNavBarAndActivate = () => {
  // Inject the HTML template into the beginning of the body
  document.body.insertAdjacentHTML("afterbegin", NAV_BAR_HTML_TEMPLATE);

  // Call highlighting function
  highlightCurrentMenuItem();

  // Attach custom anchor handling logic
  handleAnchorLinks();
};

// Start the whole process
document.addEventListener("DOMContentLoaded", injectNavBarAndActivate);
