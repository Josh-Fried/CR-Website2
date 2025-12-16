/**
 * nav-bar.js
 * FINAL WORKING VERSION - With "Brute Force" Visibility CSS
 */

// console.log("[NavBar Debug] Script file loaded.");

const NAV_STYLES = `
<style>
   /* 1. SLIDE MOVEMENT & Z-INDEX (Kept at 9998 as requested) */
    #slide-out-widget-area.slide-out-from-right {
        transform: translateX(100%) !important;
        display: block !important;
        visibility: visible !important; 
        transition: transform 0.4s cubic-bezier(0.2, 1, 0.2, 1) !important;
        opacity: 1 !important;
        right: 0 !important;
        z-index: 9998 !important; /* MATCHING YOUR WORKING VERSION */
        background-color: #f4ece2 !important; 
        position: fixed !important;
        top: 0; left: 0; width: 100%; height: 100%;
    }

    /* 2. OPEN STATE */
    #slide-out-widget-area.slide-out-from-right.open {
        transform: translateX(0) !important;
    }

    /* 3. CONTENT CONTAINER */
    #slide-out-widget-area .inner-wrap {
        padding-top: 100px !important;
        height: 100% !important;
        overflow-y: auto !important;
        opacity: 1 !important;
        visibility: visible !important;
        display: block !important;
    }
    
    #slide-out-widget-area .inner,
    #slide-out-widget-area .off-canvas-menu-container {
        opacity: 1 !important;
        visibility: visible !important;
        display: block !important;
        height: auto !important;
        overflow: visible !important;
    }

    /* 4. MENU LINKS (Standardizing Heights & Removing Bars) */
    #slide-out-widget-area ul.menu li,
    #slide-out-widget-area ul.menu li a {
        opacity: 1 !important;
        visibility: visible !important;
        color: #000000 !important;
        font-family: inherit !important;
        font-size: 20px !important;
        line-height: 1.4 !important;
        padding: 5px 20px !important;
        transform: none !important;
        
        /* UNIFORM SPACING */
        margin-bottom: 15px !important; 
        margin-top: 0 !important;
        
        /* Cleanup */
        box-shadow: none !important;
        text-decoration: none !important;
        border: none !important; 
        background: transparent !important;
        position: relative !important;
    }

    /* Kill default :after elements (The unwanted bars) */
    #slide-out-widget-area ul.menu li::after,
    #slide-out-widget-area ul.menu li a::after {
        content: none !important;
        display: none !important;
    }

    /* 5. INQUIRE BUTTON FIX (Uniform Spacing) */
    #slide-out-widget-area ul.menu li.button-style {
        margin-top: 0 !important; 
        margin-bottom: 15px !important;
    }

    #slide-out-widget-area ul.menu li.button-style a {
        border: 1px solid #000000 !important;
        border-radius: 50px !important;
        padding: 8px 35px !important; 
        display: inline-block !important;
        width: auto !important;
    }

    /* 6. CLOSE BUTTON VISIBILITY */
    .slide_out_area_close {
        opacity: 1 !important;
        visibility: visible !important;
        display: block !important;
        z-index: 9999 !important; /* One higher than menu */
        position: absolute !important;
        top: 20px !important;
        right: 20px !important;
        width: 30px !important;
        height: 30px !important;
        cursor: pointer !important;
    }
    
    .slide_out_area_close .close-wrap { width: 100%; height: 100%; position: relative; display: block; }
    .slide_out_area_close .close-line {
        position: absolute; height: 2px; width: 100%; background-color: #000 !important; top: 50%; left: 0;
    }
    .slide_out_area_close .close-line1 { transform: rotate(45deg); }
    .slide_out_area_close .close-line2 { transform: rotate(-45deg); }

    /* 7. BACKGROUND OVERLAY */
    #slide-out-widget-area-bg.slide-out-from-right {
        display: none !important; /* Hiding overlay as requested for full screen menu */
    }

    /* 8. SUB-MENU STYLING (The New Part) */
    
    /* Sub-menu hidden by default */
    #slide-out-widget-area .sub-menu {
        display: none; /* jQuery will toggle this */
        padding-top: 10px !important;
    }
    
    /* Sub-menu items smaller */
    #slide-out-widget-area .sub-menu li a {
        font-size: 18px !important;
        opacity: 0.7 !important;
    }

    /* 9. PLUS SIGN (Styled to match your image) */
    
    /* Ensure parent link allows positioning */
    #slide-out-widget-area ul.menu li.has-children > a {
        display: inline-block !important;
        padding-right: 40px !important; /* Room for plus */
        width: 100% !important;
    }

    /* The Plus Pseudo-element (Re-added here specifically) */
    #slide-out-widget-area ul.menu li.has-children > a::before {
        content: '+' !important;
        position: absolute !important;
        right: 0 !important;
        top: 50% !important;
        transform: translateY(-55%) !important;
        font-family: inherit !important;
        font-weight: 300 !important;
        font-size: 24px !important;
        line-height: 1 !important;
        color: #000 !important;
        pointer-events: none !important;
        transition: transform 0.3s ease !important;
        display: block !important;
    }

    /* Rotate Plus to X when open */
    #slide-out-widget-area ul.menu li.has-children.open-submenu > a::before {
        transform: translateY(-55%) rotate(45deg) !important;
    }

    /* Fix body scroll */
    body.material-ocm-open {
        overflow: hidden !important;
    }
    
    /* ... (Your existing Z-index and layout styles) ... */

    /* 8. SUB-MENU LOGIC (CRITICAL MISSING PART) */
    
    /* Initially hide sub-menu */
    #slide-out-widget-area .sub-menu {
        display: none; /* jQuery handles the slide, but we need this base state */
        padding-top: 10px;
        padding-left: 0;
        list-style: none;
    }

    /* Style the sub-menu items */
    #slide-out-widget-area .sub-menu li {
        border: none !important;
        margin-bottom: 5px !important;
        width: 100% !important;
    }
    
    #slide-out-widget-area .sub-menu a {
        font-size: 18px !important;
        font-family: "gilmer", sans-serif !important;
        opacity: 0.7 !important;
        display: block !important;
    }

    /* PLUS SIGN LOGIC */
    /* Ensure parent link allows absolute positioning */
    #slide-out-widget-area .has-children > a {
        position: relative !important;
        display: inline-block !important;
        padding-right: 40px !important; /* Space for plus */
    }

    /* The Plus */
    #slide-out-widget-area .has-children > a::after {
        content: '+' !important;
        position: absolute !important;
        right: 0 !important;
        top: 50% !important;
        transform: translateY(-55%) !important;
        font-size: 28px !important;
        font-weight: 300 !important;
        color: #000000 !important;
        transition: transform 0.3s ease !important;
        pointer-events: none !important;
    }

    /* ROTATE X when open */
    #slide-out-widget-area .has-children.open-submenu > a::after {
        transform: translateY(-55%) rotate(45deg) !important;
    }

    
</style>
`;

// --- 0b. NAVIGATION HTML ---
const NAV_BAR_HTML_TEMPLATE = `
    <div class="ocm-effect-wrap">
        <div class="ocm-effect-wrap-inner">
            <div id="header-space" data-header-mobile-fixed="1"></div>
            <div id="header-outer" data-has-menu="true" data-has-buttons="no" data-header-button_style="default" data-using-pr-menu="true" data-mobile-fixed="1" data-ptnm="false" data-lhe="animated_underline" data-user-set-bg="#f4ece2" data-format="centered-logo-between-menu-alt" data-permanent-transparent="false" data-megamenu-rt="1" data-remove-fixed="0" data-header-resize="1" data-cart="false" data-transparency-option="1" data-box-shadow="none" data-shrink-num="25" data-using-secondary="0" data-using-logo="1" data-logo-height="100" data-m-logo-height="60" data-padding="24" data-full-width="true" data-condense="false" data-transparent-header="false" data-transparent-shadow-helper="false" data-remove-border="true" class="">
                <div id="search-outer" class="nectar">
                    <div id="search">
                        <div class="container">
                            <div id="search-box">
                                <div class="inner-wrap">
                                    <div class="col span_12">
                                        <form role="search" action="https://triadacollections.com/" method="GET">
                                            <input type="text" name="s" id="s" value="" aria-label="Search" placeholder="Search" />
                                            <span>Hit enter to search or ESC to close</span>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div id="close">
                                <a href="#"><span class="screen-reader-text">Close Search</span><span class="close-wrap"><span class="close-line close-line1"></span><span class="close-line close-line2"></span></span></a>
                            </div>
                        </div>
                    </div>
                </div>
                <header id="top">
                    <div class="container">
                        <div class="row">
                            <div class="col span_3">
                                <a id="logo" href="/" data-supplied-ml-starting-dark="false" data-supplied-ml-starting="false" data-supplied-ml="true">
                                    <img class="stnd skip-lazy default-logo dark-version" width="128" height="92" alt="Triada Collections" src="https://triadacollections.com/wp-content/uploads/2025/02/triada-logo-fullcolor-RGB-BAHAI-COSTARICA.svg" />
                                    <img class="mobile-only-logo skip-lazy" alt="Triada Collections" width="128" height="92" src="https://triadacollections.com/wp-content/uploads/2025/02/triada-logo-fullcolor-RGB-BAHAI-COSTARICA.svg" />
                                </a>
                            </div>
                            <div class="col span_9 col_last">
                                <div class="nectar-mobile-only mobile-header"><div class="inner"></div></div>
                                <div class="slide-out-widget-area-toggle mobile-icon fullscreen-alt" data-custom-color="false" data-icon-animation="simple-transform">
                                    <div><a href="#slide-out-widget-area" role="button" aria-label="Navigation Menu" aria-expanded="false" class="closed"><span class="screen-reader-text">Menu</span><span aria-hidden="true"><i class="lines-button x2"> <i class="lines"></i> </i></span></a></div>
                                </div>
                                <nav aria-label="Main Menu">
                                    <ul id="menu-main-menu-1" class="sf-menu">
                                        <li id="menu-item-711" class="menu-item menu-item-type-post_type menu-item-object-page page_item page-item-691 menu-item-has-icon nectar-regular-menu-item menu-item-711" data-path="/">
                                            <a href="/" aria-current="page" class=""><img width="128" height="92" src="https://triadacollections.com/wp-content/uploads/2025/02/triada-logo-fullcolor-RGB-BAHAI-COSTARICA.svg" class="nectar-menu-icon-img" alt="" decoding="async" /><span class="menu-title-text">Home</span></a>
                                        </li>
                                        <li id="menu-item-551" class="menu-item menu-item-type-post_type menu-item-object-page nectar-regular-menu-item menu-item-551 menu-item-has-children" data-path="RESIDENCES_PARENT_ROOT">
                                            <a href="/for-sale/"><span class="menu-title-text">Residences</span></a>
                                            <ul class="sub-menu">
                                                <li class="menu-item submenu-link" data-path="/for-sale"><a href="/for-sale/">For Sale</a></li>
                                                <li class="menu-item submenu-link" data-path="/coming-soon"><a href="/coming-soon/">Coming Soon</a></li>
                                            </ul>
                                        </li>
                                        <li id="menu-item-444" class="menu-item menu-item-type-post_type menu-item-object-page nectar-regular-menu-item menu-item-444" data-path="/luxury-living">
                                            <a href="/#luxury-living"><span class="menu-title-text">Luxury Living</span></a>
                                            <ul class="sub-menu">
                                                <li class="menu-item submenu-link" data-path="/luxury-living/beach-club"><a href="/luxury-living/beach-club">Beach Club</a></li>
                                                <li class="menu-item submenu-link" data-path="/luxury-living/waterfall"><a href="/luxury-living/waterfall">Waterfall</a></li>
                                                <li class="menu-item submenu-link" data-path="/for-sale/the-horizon-house"><a href="/for-sale/the-horizon-house">The Horizon House</a></li>
                                                <li class="menu-item submenu-link" data-path="/luxury-living/area-growth"><a href="/luxury-living/area-growth">Area Growth</a></li>
                                                <li class="menu-item submenu-link" data-path="/luxury-living/restaurants"><a href="/luxury-living/restaurants">Restaurants</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <div class="right-aligned-menu-items">
                                <nav>
                                    <ul class="buttons sf-menu" data-user-set-ocm="off">
                                        <li id="menu-item-445" class="menu-item menu-item-type-post_type menu-item-object-page nectar-regular-menu-item menu-item-445" data-path="/#why-invest">
                                            <a href="/#why-invest" class=""><span class="menu-title-text">Why Us</span></a>
                                        </li>
                                        <li id="menu-item-554" class="menu-item menu-item-type-post_type menu-item-object-page nectar-regular-menu-item menu-item-554" data-path="/experiences">
                                            <a href="/#experiences"><span class="menu-title-text">Experiences</span></a>
                                            <ul class="sub-menu">
                                                <li class="menu-item submenu-link" data-path="/experiences/nature-pools"><a href="/experiences/nature-pools">Nature Pools</a></li>
                                                <li class="menu-item submenu-link" data-path="/experiences/farm-to-table"><a href="/experiences/farm-to-table">Farm to Table</a></li>
                                                <li class="menu-item submenu-link" data-path="/experiences/fishing"><a href="/experiences/fishing">Fishing</a></li>
                                                <li class="menu-item submenu-link" data-path="/experiences/volcanoes"><a href="/experiences/volcanoes">Volcanoes</a></li>
                                                <li class="menu-item submenu-link" data-path="/experiences/nature-trails"><a href="/experiences/nature-trails">Nature Trails</a></li>
                                                <li class="menu-item submenu-link" data-path="/experiences/snorkeling"><a href="/experiences/snorkeling">Snorkeling</a></li>
                                                <li class="menu-item submenu-link" data-path="/experiences/blue-zones"><a href="/experiences/blue-zones">Blue Zones</a></li>
                                                <li class="menu-item submenu-link" data-path="/experiences/spas"><a href="/experiences/spas">Spas</a></li>
                                                <li class="menu-item submenu-link" data-path="/experiences/surfing"><a href="/experiences/surfing">Surfing</a></li>
                                            </ul>
                                        </li>
                                        <li id="menu-item-439" class="button-style menu-item menu-item-type-custom menu-item-object-custom menu-item-btn-style-button-border_accent-color nectar-regular-menu-item menu-item-439" data-path="/inquire">
                                            <a href="#" class="inquire-button"><span class="menu-title-text">INQUIRE</span></a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </header>
        </div>
    </div> 

    <div id="slide-out-widget-area-bg" class="fullscreen-alt medium slide-out-from-right"><div class="bg-inner"></div></div>

    <div id="slide-out-widget-area" class="fullscreen-alt slide-out-from-right" data-dropdown-func="separate-dropdown-parent-link" data-back-txt="Back">
        <div class="inner-wrap">
            <div class="inner">
                <a class="slide_out_area_close" href="#"><span class="screen-reader-text">Close Menu</span><span class="close-wrap"><span class="close-line close-line1"></span><span class="close-line close-line2"></span></span></a>
                
                <div class="off-canvas-menu-container mobile-only" role="navigation">
                    <div class="menu-wrap menuwrapper">
                        <ul class="menu menuopen">
                            <li class="menu-item"><a href="/">Home</a></li>
                            <li class="menu-item has-children">
                              <a href="#">Residences</a> 
                                <ul class="sub-menu">
                                    <li class="menu-item"><a href="/for-sale/">For Sale</a></li>
                                    <li class="menu-item"><a href="/coming-soon/">Coming Soon</a></li>
                                </ul>
                            </li>
                            <li class="menu-item has-children"><a class="ll">Luxury Living</a>
                                <ul class="sub-menu">
                                    <li class="menu-item"><a href="/luxury-living/beach-club">Beach Club</a></li>
                                    <li class="menu-item"><a href="/luxury-living/waterfall">Waterfall</a></li>
                                    <li class="menu-item"><a href="/for-sale/the-horizon-house">The Horizon House</a></li>
                                    <li class="menu-item"><a href="/luxury-living/area-growth">Area Growth</a></li>
                                    <li class="menu-item"><a href="/luxury-living/restaurants">Restaurants</a></li>                                
                                </ul>
                            </li>
                            <li class="menu-item"><a href="/#why-invest" class="">Why Us</a></li>
                            <li class="menu-item has-children"><a href="/#experiences">Experiences</a>
                                <ul class="sub-menu">
                                    <li class="menu-item"><a href="/experiences/nature-pools">Nature Pools</a></li>
                                    <li class="menu-item"><a href="/experiences/farm-to-table">Farm to Table</a></li>
                                    <li class="menu-item"><a href="/experiences/fishing">Fishing</a></li>
                                    <li class="menu-item"><a href="/experiences/volcanoes">Volcanoes</a></li>
                                    <li class="menu-item"><a href="/experiences/nature-trails">Nature Trails</a></li>
                                    <li class="menu-item"><a href="/experiences/snorkeling">Snorkeling</a></li>
                                    <li class="menu-item"><a href="/experiences/blue-zones">Blue Zones</a></li>
                                    <li class="menu-item"><a href="/experiences/spas">Spas</a></li>
                                    <li class="menu-item"><a href="/experiences/surfing">Surfing</a></li>
                                </ul>
                            </li>
                            <li class="button-style menu-item"><a href="#" class="inquire-button">INQUIRE</a></li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    </div>
`;

// --- 0c. MODAL HTML ---
const INQUIRE_MODAL_HTML = `
<div id="contact-us-form" class="modal-overlay">
  <div class="modal-content">
    <button class="modal-close">×</button>
    <h3>Contact Us</h3>
    <p style="margin-bottom: 25px;">Please fill out the form below and we will get back to you shortly.</p>
    
    <form id="contact-form-in-modal">
      <input type="hidden" id="time_zone" name="time_zone" value="">
      <div class="form-row">
        <div class="form-group half-width">
            <label class="field-title" for="first_name">First Name *</label>
            <input type="text" id="first_name" name="first_name" required />
        </div>
        <div class="form-group half-width">
            <label class="field-title" for="last_name">Last Name *</label>
            <input type="text" id="last_name" name="last_name" required />
        </div>
      </div>
      <div class="form-group">
        <label class="field-title" for="email">Email Address *</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div class="form-group">
        <label class="field-title" for="interested_in">Interested in: *</label>
        <div class="select-wrapper">
            <select id="interested_in" name="interested_in" required>
                <option value="" disabled selected>Select Property Type</option>
                <option value="Home">Home</option>
                <option value="Condo Unit">Condo Unit</option>
            </select>
        </div>
      </div>
      <div class="form-group">
        <label class="field-title" for="timeframe">Timeframe: *</label>
        <div class="select-wrapper">
            <select id="timeframe" name="timeframe" required>
                <option value="" disabled selected>Select Timeframe</option>
                <option value="0-6months">0-6 months</option>
                <option value="7-12months">7-12 months</option>
                <option value="13-18months">13-18 months</option>
                <option value="19+ months">19+ months</option>
            </select>
        </div>
      </div>
      <div class="form-group">
        <label class="field-title">Can we contact you via call/text?</label>
        <div class="radio-group">
          <label class="radio-label">
            <input type="radio" name="contact_consent" value="Yes"> Yes
          </label>
          <label class="radio-label">
            <input type="radio" name="contact_consent" value="No"> No
          </label>
        </div>
      </div>
      <div class="form-group">
        <label class="field-title" for="cell_phone">Cell #</label>
        <input type="tel" id="cell_phone" name="cell_phone" oninput="this.value = this.value.replace(/[^0-9]/g, '')" />
      </div>
      <div class="form-group">
        <label class="field-label" for="time_zone">Your Time Zone</label>
        <input type="text" id="time_zone" name="time_zone" placeholder="e.g. EST, Pacific" />
      </div>
      <div class="form-group">
        <label class="field-title" for="preferred_time">Preferred time to call</label>
        <input type="text" id="preferred_time" name="preferred_time" placeholder="e.g. After 5pm" />
      </div>
      <p class="disclaimer">
        ** We never sell or disclose any of your information to any outside organization, without your express permission.
      </p>
      <button type="submit" class="submit-button">Send Message</button>
      <div id="form-status"></div>
    </form>
  </div>
</div>
`;

// --- 1. HELPER FUNCTIONS ---

const normalizePath = (url) => {
  const path = new URL(url, window.location.origin).pathname;
  let normalized = path.replace(/\/$/, "");
  if (normalized === "") normalized = "/";
  return normalized;
};

function getHeaderOffset() {
  const breakpoint = 960;
  return window.innerWidth <= breakpoint ? 84 : 102;
}

const highlightCurrentMenuItem = () => {
  const currentPathname = normalizePath(window.location.href);
  const currentHash = window.location.hash;
  let effectivePath = currentPathname;

  if (currentHash && currentHash.startsWith("#")) {
    const pathnameForHashMatch = currentPathname === "/" ? "" : currentPathname;
    effectivePath = pathnameForHashMatch + currentHash;
  }

  document.querySelectorAll(".current-menu-item, .current-page-item").forEach((el) => {
    el.classList.remove("current-menu-item", "current-page-item");
  });

  let targetId = "menu-item-711"; // Default to Home

  if (effectivePath.startsWith("/experiences")) targetId = "menu-item-554";
  else if (effectivePath.startsWith("/luxury-living")) targetId = "menu-item-444";
  else if (effectivePath.startsWith("/for-sale") || effectivePath.startsWith("/coming-soon")) targetId = "menu-item-551";
  else if (effectivePath === "/#why-invest") targetId = "menu-item-445";
  else if (effectivePath === "/") targetId = "menu-item-711";

  const parentElement = document.getElementById(targetId);
  if (parentElement) parentElement.classList.add("current-menu-item");

  const specificLink = document.querySelector(`#menu-main-menu-1 li[data-path='${effectivePath}']`);
  if (specificLink && specificLink !== parentElement) {
    specificLink.classList.add("current-menu-item", "current-page-item");
  }
};

// --- 2. SCROLL & MODAL LOGIC ---

const handleAnchorLinks = () => {
  document.body.addEventListener("click", function (e) {
    const link = e.target.closest("a");
    if (!link || !link.getAttribute("href")) return;

    const href = link.getAttribute("href");

    if (
      href === "#slide-out-widget-area" ||
      link.closest(".slide-out-widget-area-toggle") ||
      link.classList.contains("inquire-button")
    )
      return;

    const hashMatch = href.match(/#.+/);

    if (hashMatch) {
      const hash = hashMatch[0];
      e.preventDefault();

      const linkPath = href.split("#")[0];
      const currentPath = normalizePath(window.location.href);
      const normalizedLinkPath = linkPath ? normalizePath(linkPath) : currentPath;

      if (normalizedLinkPath === currentPath) {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
          if (document.body.classList.contains("material-ocm-open")) {
            if (typeof jQuery !== "undefined") {
                 jQuery(".slide_out_area_close").click();
            }
          }
          const offset = getHeaderOffset();
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: targetPosition, behavior: "smooth" });
        }
      } else {
        localStorage.setItem("scrollToTarget", hash);
        window.location.href = normalizedLinkPath;
      }
    }
  });

  const scrollTargetId = localStorage.getItem("scrollToTarget");
  if (scrollTargetId && scrollTargetId.startsWith("#")) {
    const targetElement = document.querySelector(scrollTargetId);
    if (targetElement) {
      setTimeout(() => {
        const offset = getHeaderOffset();
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
        history.replaceState(null, null, scrollTargetId);
        localStorage.removeItem("scrollToTarget");
      }, 100);
    } else {
      localStorage.removeItem("scrollToTarget");
    }
  }
};

const handleScrollEffect = () => {
  const headerOuter = document.getElementById("header-outer");
  if (!headerOuter) return;

  const shrinkThreshold = 30;
  const headerResize = headerOuter.getAttribute("data-header-resize") === "1";

  if (headerResize) {
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY || window.pageYOffset;
      if (scrollY > shrinkThreshold) {
        if (!headerOuter.classList.contains("small-nav")) headerOuter.classList.add("small-nav");
        if (!headerOuter.classList.contains("scrolled-down")) headerOuter.classList.add("scrolled-down");
      } else {
        if (headerOuter.classList.contains("small-nav")) headerOuter.classList.remove("small-nav");
        if (headerOuter.classList.contains("scrolled-down")) headerOuter.classList.remove("scrolled-down");
      }
    });
    window.dispatchEvent(new Event("scroll"));
  }
};

// --- 3. MODAL LOGIC ---
const handleInquireLogic = () => {
  document.body.insertAdjacentHTML("beforeend", INQUIRE_MODAL_HTML);
  const modal = document.getElementById("contact-us-form");
  if (!modal) return;

  document.body.addEventListener("click", (e) => {
    if (e.target.closest(".inquire-button")) {
      e.preventDefault();
      modal.classList.add("open");
      modal.style.display = "flex";
    }
  });

  const closeBtn = modal.querySelector(".modal-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.classList.remove("open");
      modal.style.display = "none";
    });
  }
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("open");
      modal.style.display = "none";
    }
  });

  const form = document.getElementById("contact-form-in-modal");
  const statusDiv = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.innerText;

      btn.innerText = "Sending...";
      btn.disabled = true;

      setTimeout(() => {
        statusDiv.innerHTML = '<span style="color:green;">Thank you! We will be in touch soon.</span>';
        btn.innerText = "Sent";
        form.reset();

        setTimeout(() => {
          modal.classList.remove("open");
          modal.style.display = "none";
          statusDiv.innerHTML = "";
          btn.innerText = originalText;
          btn.disabled = false;
        }, 2000);
      }, 1000);
    });
  }
};

// --- LOGIC ---
function initNectarMenuLogic() {
    if (typeof jQuery === "undefined") return;
    var $ = jQuery;

    // 0. INJECT BACK BUTTONS
    $(".off-canvas-menu-container .sub-menu").prepend('<li class="back-btn"><a href="#">Back</a></li>');

    // 1. HAMBURGER TOGGLE (Main)
    $("body").on("click", ".slide-out-widget-area-toggle a, .slide_out_area_close", function(e) {
        e.preventDefault(); e.stopPropagation();
        var $body = $("body");
        var $widget = $("#slide-out-widget-area");
        var $toggle = $(".slide-out-widget-area-toggle a");
        
        if ($widget.hasClass("open")) {
            // Close
            $widget.removeClass("open");
            $body.removeClass("material-ocm-open");
            $toggle.removeClass("open").addClass("closed");
            
            // Reset Drill Down
            setTimeout(function(){
                $(".off-canvas-menu-container").removeClass("sub-view-active");
                $(".sub-menu").removeClass("visible");
            }, 400);
        } else {
            // Open
            $widget.addClass("open");
            $body.addClass("material-ocm-open");
            $toggle.addClass("open").removeClass("closed");
        }
    });

    // 2. DRILL DOWN: ZOOM IN (Parent Click)
    $("body").on("click", "#slide-out-widget-area .has-children > a", function(e) {
        e.preventDefault(); e.stopPropagation();
        
        var $container = $(".off-canvas-menu-container");
        var $submenu = $(this).siblings(".sub-menu");
        
        // Slide Left
        $container.addClass("sub-view-active");
        // Show specific submenu
        $submenu.addClass("visible");
    });

    // 3. DRILL DOWN: ZOOM OUT (Back Click)
    $("body").on("click", ".back-btn a", function(e) {
        e.preventDefault(); e.stopPropagation();
        
        var $container = $(".off-canvas-menu-container");
        var $submenu = $(this).closest(".sub-menu");
        
        // Slide Right
        $container.removeClass("sub-view-active");
        
        // Hide submenu after transition finishes
        setTimeout(function(){
            $submenu.removeClass("visible");
        }, 300);
    });
}

// --- 6. CRITICAL CSS INJECTION ---
// This function injects styles that force the menu to work even without the theme JS
const injectCriticalStyles = () => {
    document.head.insertAdjacentHTML("beforeend", NAV_STYLES);
    document.body.insertAdjacentHTML('beforeend', INQUIRE_MODAL_HTML);
};

// --- 4. INJECTION AND EXECUTION ---

const injectNavBarAndActivate = () => {
  // console.log("[NavBar Debug] Injections started");

  // 1. Inject CSS first to prevent layout jumping
  injectCriticalStyles();

  // 2. Inject Header HTML
  document.body.insertAdjacentHTML("afterbegin", NAV_BAR_HTML_TEMPLATE);
  // console.log("[NavBar Debug] HTML Template Injected");

  // 3. Highlight current page link
  highlightCurrentMenuItem();

  // 4. Attach Anchor Scroll Logic
  handleAnchorLinks();

  // 5. Attach Scroll Shrink Logic
  handleScrollEffect();

  // 6. Inject Modal & Attach Logic
  handleInquireLogic();

  // 7. Initialize Mobile Menu Logic
  initNectarMenuLogic();
};

document.addEventListener("DOMContentLoaded", injectNavBarAndActivate);