document.addEventListener('DOMContentLoaded', () => {
  // 1. Hamburger Menu Logic
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  // Close menu when a link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // 2. Fetch Data from Backend (Only runs on programs.html)
  const programsGrid = document.getElementById('programs-grid');
  if (programsGrid) {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        data.programs.forEach(program => {
          const card = document.createElement('div');
          card.className = 'program-card';
          // Notice the styling is applied for the light background
          card.style.background = '#ffffff';
          card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
          card.style.borderTop = '4px solid var(--accent)';
          
          card.innerHTML = `
            <i class="fas ${program.icon}" style="color: var(--primary);"></i>
            <h3 style="color: var(--primary);">${program.name}</h3>
          `;
          programsGrid.appendChild(card);
        });
      })
      .catch(err => console.error('Error loading programs:', err));
  }
});