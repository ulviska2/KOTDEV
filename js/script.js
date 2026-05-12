function applyLanguage(lang) {
  const elements = document.querySelectorAll('[data-i18n]');
  
  elements.forEach(el => {
    el.style.opacity = '0';
  });
  
  setTimeout(() => {
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
      el.style.opacity = '1';
    });
  }, 200);
  
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
(function() {
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isMac = /Macintosh/i.test(navigator.userAgent);
    const isWindows = /Windows/i.test(navigator.userAgent);
    
    const links = document.querySelectorAll('.game-store-link');
    
    links.forEach(link => {
        const androidUrl = link.getAttribute('data-android');
        const iosUrl = link.getAttribute('data-ios');
        const icon = link.querySelector('i');
        const text = link.querySelector('.store-text');
        
        if (isIOS && iosUrl) {
            link.href = iosUrl;
            if (icon) icon.className = 'fab fa-app-store-ios';
            if (text) text.textContent = 'App Store';
        } else if (isAndroid && androidUrl) {
            link.href = androidUrl;
            if (icon) icon.className = 'fab fa-google-play';
            if (text) text.textContent = 'Google Play';
        } else if (isMac && iosUrl) {
            link.href = iosUrl;
            if (icon) icon.className = 'fab fa-app-store-ios';
            if (text) text.textContent = 'App Store';
        } else if (isWindows && androidUrl) {
            link.href = androidUrl;
            if (icon) icon.className = 'fab fa-google-play';
            if (text) text.textContent = 'Google Play';
        } else {
            link.href = androidUrl || iosUrl || '#';
        }
    });
})();
document.querySelectorAll('.game-slider').forEach(slider => {
    const track = slider.querySelector('.slider-track');
    const images = track.querySelectorAll('img');
    const prevBtn = slider.querySelector('.prev');
    const nextBtn = slider.querySelector('.next');
    let index = 0;

    if (images.length > 0) {
        images[0].classList.add('active');
    }

    function update() {
        images.forEach(img => img.classList.remove('active'));
        images[index].classList.add('active');
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            index = (index + 1) % images.length;
            update();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            index = (index - 1 + images.length) % images.length;
            update();
        });
    }

    let startX = 0;
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    track.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                index = (index + 1) % images.length;
            } else {
                index = (index - 1 + images.length) % images.length;
            }
            update();
        }
    });

    track.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (e.deltaX > 0 || e.deltaY > 0) {
            index = (index + 1) % images.length;
        } else {
            index = (index - 1 + images.length) % images.length;
        }
        update();
    }, { passive: false });
});
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
const overlay = document.getElementById('overlay');
const navLinks = document.querySelectorAll('.nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        overlay.classList.remove('active');
    });
});

burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
    nav.classList.remove('active');
    overlay.classList.remove('active');
});
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});
window.addEventListener('beforeunload', () => {
    localStorage.setItem('scrollPosition', window.scrollY);
});

window.addEventListener('load', () => {
    const savedPosition = localStorage.getItem('scrollPosition');
    if (savedPosition) {
        window.scrollTo(0, parseInt(savedPosition));
    }
});
const scrollTopBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});