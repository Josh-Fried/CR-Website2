document.addEventListener("DOMContentLoaded", () => {
  // --- DOM ELEMENTS ---
  const popupOverlay = document.getElementById("gallery-popup-overlay");
  const closeBtn = document.querySelector(".popup-close");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const popupTitle = document.getElementById("popup-title");
  const mainImage = document.getElementById("popup-main-image");
  const specsGrid = document.getElementById("popup-specs-grid");

  // --- STATE ---
  let currentImageIndex = 0;
  let activePropertyImages = [];

  // --- FUNCTIONS ---
  function showImage(index) {
    if (!activePropertyImages || activePropertyImages.length === 0) return;
    mainImage.src = activePropertyImages[index];
    currentImageIndex = index;
  }

  function showNextImage() {
    if (!activePropertyImages || activePropertyImages.length === 0) return;
    const newIndex = (currentImageIndex + 1) % activePropertyImages.length;
    showImage(newIndex);
  }

  function showPrevImage() {
    if (!activePropertyImages || activePropertyImages.length === 0) return;
    const newIndex = (currentImageIndex - 1 + activePropertyImages.length) % activePropertyImages.length;
    showImage(newIndex);
  }
  
  function populatePopup(data) {
    activePropertyImages = data.images;
    popupTitle.textContent = data.title;
    
    specsGrid.innerHTML = "";
    data.specs.forEach((spec) => {
      const specEl = document.createElement("div");
      specEl.className = "spec";
      specEl.innerHTML = `<span class="label">${spec.label}:</span> ${spec.value}`;
      specsGrid.appendChild(specEl);
    });

    showImage(0);
  }

  function openPopup() {
    if (popupOverlay) popupOverlay.classList.add("active");
  }

  function closePopup() {
    if (popupOverlay) popupOverlay.classList.remove("active");
  }

  // --- EVENT LISTENERS ---
  const allDetailsButtons = document.querySelectorAll(".details-button");
  allDetailsButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault();
      event.stopPropagation();
      const card = this.closest(".property-card");
      if (card) {
        const cardData = {
          title: card.querySelector("h3")?.textContent || "Property Details",
          images: Array.from(card.querySelectorAll(".home-slide-carousel img")).map(img => img.src),
          specs: Array.from(card.querySelectorAll(".detail-item")).map(item => ({
            label: item.querySelector(".detail-label")?.textContent.trim(),
            value: item.querySelector(".detail-value")?.textContent.trim(),
          })),
        };
        populatePopup(cardData);
        openPopup();
      }
    });
  });
  
  if(prevBtn) prevBtn.addEventListener("click", showPrevImage);
  if(nextBtn) nextBtn.addEventListener("click", showNextImage);
  if(closeBtn) closeBtn.addEventListener("click", closePopup);
  if(popupOverlay) popupOverlay.addEventListener("click", (event) => {
    if (event.target === popupOverlay) closePopup();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && popupOverlay?.classList.contains("active")) closePopup();
  });
});