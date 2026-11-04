document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('applicationForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = document.getElementById('submitBtn');
      const msg = document.getElementById('formMsg');
      
      btn.textContent = 'Submitting...';
      btn.disabled = true;

      const data = {
        fullname: document.getElementById('fullname').value,
        email: document.getElementById('email').value,
        course: document.getElementById('course').value
      };

      try {
        const res = await fetch('/api/apply', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        const result = await res.json();
        
        if (res.ok) {
          msg.innerHTML = `<span style="color:green">${result.message}</span>`;
          form.reset();
        } else {
          msg.innerHTML = `<span style="color:red">${result.error}</span>`;
        }
      } catch (err) {
        msg.innerHTML = `<span style="color:red">Network error. Try again.</span>`;
      } finally {
        btn.textContent = 'Submit Application';
        btn.disabled = false;
      }
    });
  }
});