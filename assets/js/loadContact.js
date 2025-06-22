document.addEventListener('DOMContentLoaded', function () {
    fetch('contactSub.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('contact-placeholder').innerHTML = data;
      })
      .catch(error => console.error('Error loading contactSub.html:', error));
  });