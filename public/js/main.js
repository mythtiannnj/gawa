document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Sticky Header Effect
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
    } else {
      header.style.boxShadow = 'none';
    }
  });

  // Smooth Scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});