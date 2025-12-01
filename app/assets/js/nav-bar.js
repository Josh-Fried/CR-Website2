/**
 * nav-bar.js
 * FINAL WORKING VERSION
 * 1. Injects Navigation Bar
 * 2. Injects Inquire Modal
 * 3. Handles Scroll Animations & Active States
 * 4. Handles Modal Logic
 * 5. Handles Mobile Menu (jQuery Logic Only)
 */

console.log("[NavBar Debug] Script file loaded.");

// --- 0a. NAVIGATION HTML ---
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
                    <ul class="menu">
                        <li class="menu-item"><a href="/">Home</a></li>
                        <li class="menu-item has-children"><a class="residences" href="/for-sale/">Residences</a>
                            <ul class="sub-menu">
                                <li class="menu-item"><a href="/for-sale/">For Sale</a></li>
                                <li class="menu-item"><a href="/coming-soon/">Coming Soon</a></li>
                            </ul>
                        </li>
                        <li class="menu-item has-children"><a class="ll" href="/#luxury-living">Luxury Living</a>
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
`;

// --- 0b. MODAL HTML ---
const INQUIRE_MODAL_HTML = `
    <div id="price-request-form" class="modal-overlay">
      <div class="modal-content">
        <button class="modal-close">&times;</button>
        <h3>Request Price Information</h3>
        <p>Please fill out the form below and we will get back to you shortly.</p>
        <form id="contact-form-in-modal" action="#" method="POST">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div class="form-group">
            <label for="phone">Phone (Optional)</label>
            <input type="tel" id="phone" name="phone" />
          </div>
          <div class="form-group form-group-expand">
            <label for="message">Message</label>
            <textarea id="message" name="message" rows="4" placeholder="I'm interested in..."></textarea>
          </div>
          <div id="form-status" style="text-align: center; margin-top: 10px"></div>
          <button type="submit" class="submit-button">Send Request</button>
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

  document
    .querySelectorAll(".current-menu-item, .current-page-item")
    .forEach((el) => {
      el.classList.remove("current-menu-item", "current-page-item");
    });

  let targetId = "menu-item-711"; // Default to Home

  if (effectivePath.startsWith("/experiences")) targetId = "menu-item-554";
  else if (effectivePath.startsWith("/luxury-living"))
    targetId = "menu-item-444";
  else if (
    effectivePath.startsWith("/for-sale") ||
    effectivePath.startsWith("/coming-soon")
  )
    targetId = "menu-item-551";
  else if (effectivePath === "/#why-invest") targetId = "menu-item-445";
  else if (effectivePath === "/") targetId = "menu-item-711";

  const parentElement = document.getElementById(targetId);
  if (parentElement) parentElement.classList.add("current-menu-item");

  const specificLink = document.querySelector(
    `#menu-main-menu-1 li[data-path='${effectivePath}']`
  );
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

    if (href === "#slide-out-widget-area" || link.closest('.slide-out-widget-area-toggle') || link.classList.contains("inquire-button")) return;

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
          if (document.body.classList.contains('material-ocm-open')) {
             if(typeof jQuery !== 'undefined') jQuery('.slide_out_area_close').click(); 
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
        if (!headerOuter.classList.contains("small-nav"))
          headerOuter.classList.add("small-nav");
        if (!headerOuter.classList.contains("scrolled-down"))
          headerOuter.classList.add("scrolled-down");
      } else {
        if (headerOuter.classList.contains("small-nav"))
          headerOuter.classList.remove("small-nav");
        if (headerOuter.classList.contains("scrolled-down"))
          headerOuter.classList.remove("scrolled-down");
      }
    });
    window.dispatchEvent(new Event("scroll"));
  }
};

// --- 3. MODAL LOGIC (Handles UI AND Submission) ---
const handleInquireLogic = () => {
  document.body.insertAdjacentHTML("beforeend", INQUIRE_MODAL_HTML);
  const modal = document.getElementById("price-request-form");
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
        statusDiv.innerHTML =
          '<span style="color:green;">Thank you! We will be in touch soon.</span>';
        btn.innerText = "Sent";
        form.reset();

        setTimeout(() => {
          modal.classList.remove("open");
          modal.style.display = "none";
          statusDiv.innerHTML = ""; // Clear status
          btn.innerText = originalText; // Reset button
          btn.disabled = false;
        }, 2000);
      }, 1000);
    });
  }
};

// --- 5. REPLICATED THEME INIT LOGIC (NEW) ---
const initNectarMenuLogic = () => {
    console.log("[NavBar Debug] initNectarMenuLogic called");
    
    if (typeof jQuery === 'undefined') {
        console.error("[NavBar Debug] jQuery is NOT loaded. Theme logic will fail.");
        return;
    }
    
    var $ = jQuery;

    // Check if elements exist
    console.log("[NavBar Debug] Toggle buttons found:", $('.slide-out-widget-area-toggle a').length);
    console.log("[NavBar Debug] Slide out area found:", $('#slide-out-widget-area').length);
    
    $('body').on('click', '.slide-out-widget-area-toggle a, .slide_out_area_close, #slide-out-widget-area-bg', function(e) {
         console.log("[NavBar Debug] Click detected on mobile trigger");
         e.preventDefault();
         e.stopPropagation();
         
         var $body = jQuery('body');
         var $widget = jQuery('#slide-out-widget-area');
         var $bg = jQuery('#slide-out-widget-area-bg');
         var $toggle = jQuery('.slide-out-widget-area-toggle a');
         var $toggleWrap = jQuery('.slide-out-widget-area-toggle');

         // Check current state
         if ($body.hasClass('material-ocm-open')) {
             console.log("[NavBar Debug] Closing menu...");
             $body.removeClass('material-ocm-open nectar-no-flex-height');
             $widget.removeClass('open material-open');
             $bg.removeClass('open material-open');
             $toggleWrap.removeClass('material-open');
             $toggle.removeClass('open').addClass('closed').attr('aria-expanded', 'false');
         } else {
             console.log("[NavBar Debug] Opening menu...");
             $body.addClass('material-ocm-open nectar-no-flex-height');
             $widget.addClass('open material-open');
             $bg.addClass('open material-open');
             $toggleWrap.addClass('material-open');
             $toggle.addClass('open').removeClass('closed').attr('aria-expanded', 'true');
         }
    });
};

// --- 4. INJECTION AND EXECUTION ---

const injectNavBarAndActivate = () => {
  console.log("[NavBar Debug] Injections started");

  // Inject Header
  document.body.insertAdjacentHTML("afterbegin", NAV_BAR_HTML_TEMPLATE);
  console.log("[NavBar Debug] HTML Template Injected");

  // Call highlighting function
  highlightCurrentMenuItem();

  // Attach custom anchor handling logic
  handleAnchorLinks(); 

  // Attach Scroll Animation Logic
  handleScrollEffect();

  // This now injects the modal AND attaches the submit listener
  handleInquireLogic();
  
  // Call the theme init logic replacement (NEW)
  initNectarMenuLogic();
};

document.addEventListener("DOMContentLoaded", injectNavBarAndActivate);