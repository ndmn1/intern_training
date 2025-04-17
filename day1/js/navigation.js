// Navigation functionality
function initNavigation() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  
  if (menuToggle && nav) {
      // Mobile menu toggle
      menuToggle.addEventListener('click', function() {
          nav.classList.toggle('active');
          
          // Change icon based on menu state
          const icon = this.querySelector('i');
          if (icon) {
              if (nav.classList.contains('active')) {
                  icon.classList.remove('fa-bars');
                  icon.classList.add('fa-times');
              } else {
                  icon.classList.remove('fa-times');
                  icon.classList.add('fa-bars');
              }
          }
      });
      
      // Close menu when clicking on a nav link (mobile)
      const navLinks = document.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
          link.addEventListener('click', function() {
              if (nav.classList.contains('active')) {
                  nav.classList.remove('active');
                  const icon = menuToggle.querySelector('i');
                  if (icon) {
                      icon.classList.remove('fa-times');
                      icon.classList.add('fa-bars');
                  }
              }
          });
      });
      
      // Active nav link based on scroll position
      function setActiveNavLink() {
          const sections = document.querySelectorAll('section');
          const navLinks = document.querySelectorAll('.nav-link');
          
          let currentSection = '';
          
          sections.forEach(section => {
              const sectionTop = section.offsetTop - 100;
              const sectionHeight = section.clientHeight;
              if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                  currentSection = section.getAttribute('id');
              }
          });
          
          navLinks.forEach(link => {
              link.classList.remove('active');
              if (link.getAttribute('href') === `#${currentSection}`) {
                  link.classList.add('active');
              }
          });
      }
      
      window.addEventListener('scroll', setActiveNavLink);
      
      // Initial call to set active link
      setActiveNavLink();
  }
}