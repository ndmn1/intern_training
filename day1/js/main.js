// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  const currentYear = new Date().getFullYear();
  
  // Load all sections
  loadSection('header-container', 'sections/header.html');
  loadSection('hero-container', 'sections/hero.html');
  loadSection('skills-container', 'sections/skills.html');
  loadSection('contact-container', 'sections/contact.html');
  loadSection('footer-container', 'sections/footer.html',function() {
    // After all sections are loaded, initialize other scripts
    initializeScripts();
});
  
  // Function to load section content
  function loadSection(containerId, sectionPath, callback) {
      fetch(sectionPath)
          .then(response => response.text())
          .then(html => {
              document.getElementById(containerId).innerHTML = html;
              if (callback) callback();
          })
          .catch(error => console.error('Error loading section:', error));
  }
  
  // Initialize all scripts after sections are loaded
  function initializeScripts() {
      // Set current year in footer
      if (document.getElementById('current-year')) {
          document.getElementById('current-year').textContent = currentYear;
      }
      
      // Initialize navigation
      if (typeof initNavigation === 'function') {
          initNavigation();
      }
      
      // Initialize form validation
      if (typeof initFormValidation === 'function') {
          initFormValidation();
      }
      
  }
});