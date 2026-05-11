function applyLanguage(lang) {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18n[lang] && i18n[lang][key]) {
      const text = i18n[lang][key];
      if (text.includes('<') && (text.includes('<br>') || text.includes('<strong>'))) {
        el.innerHTML = text;
      } else {
        el.textContent = text;
      }
    }
  });
  document.documentElement.lang = lang;
  const links = document.querySelectorAll('.lang-switch a');
  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-lang') === lang) {
      link.classList.add('active');
    }
  });
  localStorage.setItem('kotdev-lang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('kotdev-lang') || 'ru';
  applyLanguage(savedLang);
  const langSwitch = document.querySelector('.lang-switch');
  langSwitch.addEventListener('click', (e) => {
    e.preventDefault();
    const target = e.target.closest('a');
    if (!target) return;
    const lang = target.getAttribute('data-lang');
    if (lang) {
      applyLanguage(lang);
    }
  });
});
