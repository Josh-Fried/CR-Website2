document.addEventListener('DOMContentLoaded', function () {
  fetch('/contactSub.html') 
    .then(response => response.text())
    .then(data => {
      // 1. Inject the HTML first
      document.getElementById('contact-placeholder').innerHTML = data;

      // 2. Now that the HTML exists in the DOM, find the ID and set the year
      const yearSpan = document.getElementById("year");
      if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
      }
    })
    .catch(error => console.error('Error loading /contactSub.html:', error));
});