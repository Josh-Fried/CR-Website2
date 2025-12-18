/**
 * nav-bar.js
 * Injects custom navigation, handles mobile menu logic, and integrates Lasso CRM modal.
 *
 * FUNCTIONS:
 * - normalizePath: Standardizes URLs for comparison.
 * - getHeaderOffset: Calculates header height for scroll positioning.
 * - highlightCurrentMenuItem: Sets active CSS classes on menu links.
 * - handleAnchorLinks: Manages smooth scrolling to #hashes.
 * - handleScrollEffect: Toggles header shrinking on scroll.
 * - handleInquireLogic: Injects/Validates CRM form, loads Lasso script, & manages modal state.
 * - initNectarMenuLogic: Handles mobile menu toggle & sub-menu drill down.
 * - executeNavBar: Main initialization function.
 */

// console.log("[NavBar Debug] Script file loaded.");

// --- HTML WITH RENAMED SUB-MENUS ---
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
                                        <li id="menu-item-445" class="menu-item menu-item-type-post_type menu-item-object-page nectar-regular-menu-item menu-item-445" data-path="/#about-us">
                                            <a href="/#about-us" class=""><span class="menu-title-text">About Us</span></a>
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
                              <a href="#" onclick="return false;">Residences</a> 
                                <ul class="mobile-sub-menu">
                                    <li class="menu-item"><a href="/for-sale/">For Sale</a></li>
                                    <li class="menu-item"><a href="/coming-soon/">Coming Soon</a></li>
                                </ul>
                            </li>
                            
                            <li class="menu-item has-children">
                                <a href="#" onclick="return false;">Luxury Living</a> 
                                <ul class="mobile-sub-menu">
                                    <li class="menu-item"><a href="/luxury-living/beach-club">Beach Club</a></li>
                                    <li class="menu-item"><a href="/luxury-living/waterfall">Waterfall</a></li>
                                    <li class="menu-item"><a href="/for-sale/the-horizon-house">The Horizon House</a></li>
                                    <li class="menu-item"><a href="/luxury-living/area-growth">Area Growth</a></li>
                                    <li class="menu-item"><a href="/luxury-living/restaurants">Restaurants</a></li>                                
                                </ul>
                            </li>
                            
                            <li class="menu-item"><a href="/#about-us" class="">About Us</a></li>
                            
                            <li class="menu-item has-children">
                                <a href="#" onclick="return false;">Experiences</a>
                                <ul class="mobile-sub-menu">
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

const INQUIRE_MODAL_HTML = 
`<div id="contact-us-form" class="modal-overlay">
  <div class="modal-content">
    <button class="modal-close">&times;</button>
    <h3>Contact Us</h3>
    <p style="margin-bottom: 25px;">Please fill out the form below and we will get back to you shortly.</p>

	<form id="contact-form-in-modal" name='frm' method='post' onSubmit="return lm_SubmitWebForm()">
		<input type='hidden' name="lm_CompanyID" value="31641">
		<input type='hidden' name="lm_FormID" value="157">
		<input type='hidden' name="lm_MappingID" value="1">
		<input type='hidden' name="lm_FormKey" value="">
		<input type='hidden' name="lm_FormResponsePage" value="http://www.papagayobay.com/?status=success">
		
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
	  <div id="form-status"></div>
      <button type="submit" class="submit-button">Send Message</button>
    </form>
  </div>
</div>
`;


// --- HELPER FUNCTIONS ---

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
  else if (effectivePath === "/#about-us") targetId = "menu-item-445";
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

function handleAnchorLinks() {
  // A. Handle Clicks on Anchor Links
  document.body.addEventListener("click", function (e) {
    const link = e.target.closest("a");
    if (!link || !link.getAttribute("href")) return;

    const href = link.getAttribute("href");

    // Ignore specific buttons or the toggle itself
    if (
      href === "#slide-out-widget-area" ||
      link.closest(".slide-out-widget-area-toggle") ||
      link.classList.contains("inquire-button")
    ) {
      return;
    }

    const hashMatch = href.match(/#.+/);

    if (hashMatch) {
      const hash = hashMatch[0];
      const linkPath = href.split("#")[0];
      
      // Normalize paths to check if we are on the same page
      const currentPath = window.location.pathname.replace(/\/$/, ""); 
      const normalizedLinkPath = linkPath ? linkPath.replace(document.location.origin, "").replace(/\/$/, "") : currentPath;

      // IS SAME PAGE?
      if (normalizedLinkPath === currentPath || normalizedLinkPath === "") {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
          e.preventDefault(); // Stop default jump

          // 1. Close Menu if Open
          if (document.body.classList.contains("material-ocm-open")) {
             document.body.classList.remove("material-ocm-open");
             var menu = document.getElementById("slide-out-widget-area");
             if(menu) menu.classList.remove("user-menu-open");
             
             // Reset Hamburger Icon
             var icon = document.querySelector(".slide-out-widget-area-toggle a");
             if(icon) { icon.classList.remove("open"); icon.classList.add("closed"); }
          }

          // 2. Scroll to Target
          // Helper to get offset (handling sticky headers)
          const header = document.getElementById("header-outer");
          const offset = header ? header.offsetHeight : 0;
          
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
          
          window.scrollTo({ top: targetPosition, behavior: "smooth" });
        }
      } 
      // IS DIFFERENT PAGE?
      else {
        // Save target to local storage and navigate
        e.preventDefault();
        localStorage.setItem("scrollToTarget", hash);
        window.location.href = linkPath || href;
      }
    }
  });

  // B. Handle Page Load Scrolling (if coming from another page)
  const scrollTargetId = localStorage.getItem("scrollToTarget");
  if (scrollTargetId && scrollTargetId.startsWith("#")) {
    // Wait slightly for page render
    setTimeout(() => {
        const targetElement = document.querySelector(scrollTargetId);
        if (targetElement) {
            const header = document.getElementById("header-outer");
            const offset = header ? header.offsetHeight : 0;
            
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: targetPosition, behavior: "smooth" });
            
            // Clean up URL and Storage
            history.replaceState(null, null, window.location.pathname);
            localStorage.removeItem("scrollToTarget");
        }
    }, 300); // 300ms delay to ensure elements are loaded
  } else {
    localStorage.removeItem("scrollToTarget");
  }
}


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

function handleInquireLogic() {
    // 1. INJECT HTML IF MISSING
    if (!document.getElementById('contact-us-form')) {
        document.body.insertAdjacentHTML('beforeend', INQUIRE_MODAL_HTML);
        
        // We temporarily hijack it to capture the CRM's tracking pixel.
        var contentBuffer = "";
        var oldWrite = document.write; // Save original function

        document.write = function(str) {
            contentBuffer += str; // Capture the string (usually an <img> tag)
        };

        // Remove old script if exists
        const oldScript = document.querySelector('script[src*="lm_wfi.js"]');
        if (oldScript) oldScript.remove();

        // Create and Inject Script
        var script = document.createElement('script');
        script.src = "https://util1.crmtool.net/lm_wfi.js";
        script.type = "text/javascript";
        
        script.onload = function() {
            // Restore original document.write
            document.write = oldWrite;
            
            // If the script tried to write something (the tracker), inject it now
            if(contentBuffer) {
                var tempDiv = document.createElement('div');
                tempDiv.innerHTML = contentBuffer;
                tempDiv.style.display = 'none'; // Keep it hidden
                
                // --- FIX: INJECT INSIDE THE FORM, NOT THE BODY ---
                var targetForm = document.getElementById("contact-form-in-modal");
                if (targetForm) {
                    targetForm.appendChild(tempDiv);
                } else {
                    console.error("CRM Error: Could not find form to inject tracking pixels");
                }
                // -------------------------------------------------
            }
        };

        // Handle errors just in case
        script.onerror = function() {
            document.write = oldWrite;
        };

        document.body.appendChild(script);
        // ---------------------------------------
    }
    
    // 2. SETUP VARIABLES
    const priceRequestForm = document.getElementById('contact-us-form'); 
    const successInput = document.querySelector('input[name="lm_FormResponsePage"]');
    const closeButton = document.querySelector('.modal-close');
    const form = document.getElementById("contact-form-in-modal");

    // 3. AUTO-SET RETURN URL
    if (successInput) {
        successInput.value = window.location.origin + window.location.pathname + '?status=success';
    }

    // 4. OPEN/CLOSE UTILITIES
    function openForm() {
        document.body.classList.remove("material-ocm-open");
        const menu = document.getElementById("slide-out-widget-area");
        if(menu) menu.classList.remove("user-menu-open");
        const icon = document.querySelector(".slide-out-widget-area-toggle a");
        if(icon) { icon.classList.remove("open"); icon.classList.add("closed"); }

        if (priceRequestForm) {
            priceRequestForm.classList.add('open');
            priceRequestForm.style.display = 'flex';
        }
    }

    function closeForm() {
        if (priceRequestForm) {
            priceRequestForm.classList.remove('open');
            priceRequestForm.style.display = 'none';
        }
    }

    // 5. "SENDING..." BUTTON STATE
    // We do NOT preventDefault. We let Lasso handle the submission.
    if (form) {
        form.addEventListener("submit", function() {
            const btn = form.querySelector('button[type="submit"]');
            if(btn) {
                btn.innerText = "Sending...";
                btn.style.opacity = "0.7";
                btn.style.cursor = "wait";
            }
        });
    }

    // 6. SUCCESS DETECTION
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('status') === 'success') {
        openForm(); 
        const modalContent = priceRequestForm.querySelector('.modal-content');
        if (modalContent) {
            const formEl = modalContent.querySelector('form');
            const introText = modalContent.querySelector('p');
            const title = modalContent.querySelector('h3');
            
            if (formEl) formEl.style.display = 'none';
            if (introText) introText.style.display = 'none';
            
            if (title) {
                title.textContent = 'Message Sent!';
                title.style.color = '#2e7d32';
            }

            // Custom SVG Success Message
            const successMsg = document.createElement('div');
            successMsg.innerHTML = `
                <div style="text-align: center; padding: 20px 0;">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 15px;">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <p style="font-size: 1.1em; line-height: 1.5;">
                        Thank you for reaching out.<br>
                        We have received your inquiry and will be in touch shortly.
                    </p>
                    <button class="submit-button" id="close-success-btn" style="margin-top: 20px;">Close</button>
                </div>
            `;
            modalContent.appendChild(successMsg);

            const newCloseBtn = successMsg.querySelector('#close-success-btn');
            if (newCloseBtn) newCloseBtn.addEventListener('click', closeForm);
        }
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    // 7. EVENT LISTENERS
    document.body.addEventListener("click", (e) => {
        if (e.target.closest(".inquire-button") || e.target.closest(".price-request-button")) {
            e.preventDefault();
            openForm();
        }
    });

    if (closeButton) closeButton.addEventListener('click', closeForm);
    window.addEventListener("click", (e) => {
        if (e.target === priceRequestForm) closeForm();
    });
}

function initNectarMenuLogic() {
    // console.log("[NavBar Debug] Attaching Event Listeners (Delegation)");
    
    var $ = (typeof jQuery !== 'undefined') ? jQuery : null;
    if($) {
        $(".off-canvas-menu-container .mobile-sub-menu").each(function() {
            if($(this).find('.back-btn').length === 0) {
                $(this).prepend('<li class="back-btn"></li>');
            }
        });
    }

    // MAIN TOGGLE & DRILL DOWN LOGIC
    document.addEventListener("click", function(e) {
        var toggle = e.target.closest(".slide-out-widget-area-toggle");
        var closeBtn = e.target.closest(".slide_out_area_close");
        
        if (toggle || closeBtn) {
            e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
            
            var body = document.body;
            var menu = document.getElementById("slide-out-widget-area");
            var icon = document.querySelector(".slide-out-widget-area-toggle a");

            if (menu.classList.contains("user-menu-open")) {
                menu.classList.remove("user-menu-open");
                body.classList.remove("material-ocm-open");
                if(icon) { icon.classList.remove("open"); icon.classList.add("closed"); }
                
                setTimeout(() => { 
                    if($) {
                        $(".off-canvas-menu-container").removeClass("sub-view-active");
                        $(".mobile-sub-menu").removeClass("visible");
                    }
                }, 400);
            } else {
                menu.classList.add("user-menu-open");
                body.classList.add("material-ocm-open");
                if(icon) { icon.classList.add("open"); icon.classList.remove("closed"); }
            }
            return;
        }

        // DRILL DOWN: PARENT LINK
        var link = e.target.closest("#slide-out-widget-area .has-children > a");
        if (link && $) {
            e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
            
            var parent = $(link).parent();
            var submenu = parent.find("ul");
            
            $(".mobile-sub-menu").removeClass("visible");
            submenu.addClass("visible");
            
            requestAnimationFrame(() => {
                $(".off-canvas-menu-container").addClass("sub-view-active");
            });
            return;
        }

        // DRILL DOWN: BACK BUTTON
        var back = e.target.closest(".back-btn");
        if (back && $) {
            e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
            $(".off-canvas-menu-container").removeClass("sub-view-active");
            setTimeout(function(){
                $(".mobile-sub-menu").removeClass("visible");
            }, 400);
            return;
        }
    }, true); 
}

// --- EXECUTION ---
function executeNavBar() {
    var existingMenu = document.getElementById('slide-out-widget-area');
    if(existingMenu) existingMenu.remove();
    var existingHeader = document.getElementById('header-outer');
    if(existingHeader) existingHeader.remove();

    // Inject Header
    document.body.insertAdjacentHTML("afterbegin", NAV_BAR_HTML_TEMPLATE);
    // console.log("[NavBar Debug] HTML Template Injected");

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
}

if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", executeNavBar);
} else {
    executeNavBar();
}