document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const btn = document.getElementById('theme-toggle');
  if (btn) {
    const stored = localStorage.getItem('theme') || 'light';
    body.dataset.theme = stored;
    btn.textContent = stored === 'dark' ? 'Light mode' : 'Dark mode';
    btn.addEventListener('click', () => {
      const newTheme = body.dataset.theme === 'dark' ? 'light' : 'dark';
      body.dataset.theme = newTheme;
      btn.textContent = newTheme === 'dark' ? 'Light mode' : 'Dark mode';
      localStorage.setItem('theme', newTheme);
    });
  }
});
