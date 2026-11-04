document.addEventListener('DOMContentLoaded', () => {
  
  // =========================================
  // 1. MOBILE HAMBURGER MENU LOGIC
  // =========================================
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  // Close mobile menu when a link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if(hamburger) hamburger.classList.remove('active');
      if(navLinks) navLinks.classList.remove('active');
    });
  });

  // =========================================
  // 2. FETCH PROGRAMS FROM CONFIG.JSON
  // =========================================
  const programsGrid = document.getElementById('programs-grid');
  
  // Only run this if we are on the programs.html page
  if (programsGrid) {
    // Show a loading state while fetching
    programsGrid.innerHTML = '<p style="text-align: center; grid-column: 1 / -1; color: var(--text-muted);">Loading programs...</p>';

    fetch('/api/data')
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        // Clear the loading text
        programsGrid.innerHTML = ''; 

        // Loop through the programs array in config.json
        data.programs.forEach(program => {
          const card = document.createElement('div');
          card.className = 'program-card';
          
          // Inject the icon and name dynamically
          card.innerHTML = `
            <i class="fas ${program.icon}"></i>
            <h3>${program.name}</h3>
          `;
          
          programsGrid.appendChild(card);
        });
      })
      .catch(error => {
        console.error('Error fetching programs:', error);
        programsGrid.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; background: #fee2e2; border-radius: 8px; color: #991b1b;">
            <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
            <h3>Failed to load programs</h3>
            <p>Please make sure the backend server is running.</p>
          </div>
        `;
      });
  }
});