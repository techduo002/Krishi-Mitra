document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const openBtn = document.getElementById('open-sidebar');
  const closeBtn = document.getElementById('toggle-sidebar');
  const themeToggle = document.getElementById('theme-toggle');
  const langSelect = document.getElementById('language-select');

  // Sidebar toggle
  openBtn.onclick = () => sidebar.classList.add('open');
  closeBtn.onclick = () => sidebar.classList.remove('open');

  // Theme toggle
  themeToggle.onclick = () => {
    document.body.classList.toggle('dark-mode');
    themeToggle.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
  };

  // Google Translate wrapper
  function googleTranslateInit() {
    new google.translate.TranslateElement({pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google-translate-element');
    setTimeout(() => {
      const original = document.querySelector('.goog-te-combo');
      if (original) {
        Array.from(original.options).forEach(opt => langSelect.appendChild(opt.cloneNode(true)));
        original.style.display = 'none';
      }
    }, 500);
  }
  window.googleTranslateInit = googleTranslateInit;
});
