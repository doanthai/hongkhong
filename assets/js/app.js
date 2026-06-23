/* =============================================
   BBL TECHNOLOGY LIMITED — SPA Router & App Logic
   ============================================= */

'use strict';

// ——— Language System ———
const LANG_KEY = 'bbl_lang';
let currentLang = localStorage.getItem(LANG_KEY) || 'en';

const i18n = {
  en: {
    nav: { home:'Home', about:'About', services:'Services', apps:'Our Apps', contact:'Contact' },
    navLogo: 'BBL TECHNOLOGY',
    footer: { rights: '© 2025 BBL Technology Limited. All rights reserved.', hk: 'Hong Kong Company' }
  },
  zh: {
    nav: { home:'首頁', about:'關於我們', services:'服務', apps:'我們的應用', contact:'聯繫我們' },
    navLogo: 'BBL TECHNOLOGY',
    footer: { rights: '© 2025 BBL Technology Limited 版權所有', hk: '香港公司' }
  }
};

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang === 'zh' ? 'zh-HK' : 'en';

  // Show/hide language-specific elements
  document.querySelectorAll('[data-lang-en]').forEach(el => {
    el.style.display = lang === 'en' ? '' : 'none';
  });
  document.querySelectorAll('[data-lang-zh]').forEach(el => {
    el.style.display = lang === 'zh' ? '' : 'none';
  });

  // Update lang button states
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

// ——— Hash Router ———
const routes = {
  '': 'page-home',
  'home': 'page-home',
  'about': 'page-about',
  'services': 'page-services',
  'apps': 'page-apps',
  'contact': 'page-contact',
  'privacy': 'page-privacy',
  'terms': 'page-terms',
  'delete-account': 'page-delete'
};

function getRoute() {
  const hash = window.location.hash.replace('#', '').replace('/', '').trim();
  return routes[hash] || 'page-home';
}

function navigate(pageId, smooth) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById(pageId);
  if (page) {
    page.classList.add('active');
    if (smooth !== false) window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Sync nav links
  const hash = pageId.replace('page-', '');
  document.querySelectorAll('.nav-links a, .nav-drawer a').forEach(a => {
    const href = a.getAttribute('href') || '';
    const linkHash = href.replace('#', '').replace('/', '');
    a.classList.toggle('active', linkHash === hash || (linkHash === 'home' && hash === 'home'));
  });

  // Close mobile drawer
  document.getElementById('navDrawer')?.classList.remove('open');
}

function handleRoute() {
  navigate(getRoute(), false);
  window.scrollTo(0, 0);
}

// ——— Nav scroll effect ———
function initNavScroll() {
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ——— Mobile nav ———
function initMobileNav() {
  const btn = document.getElementById('mobileNavBtn');
  const drawer = document.getElementById('navDrawer');
  btn?.addEventListener('click', () => {
    drawer?.classList.toggle('open');
  });
}

// ——— Contact Form ———
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const origText = btn.textContent;
    btn.textContent = currentLang === 'zh' ? '發送中...' : 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = origText;
      btn.disabled = false;
      form.reset();
      showToast(
        currentLang === 'zh' ? '✓  訊息已發送！我們將盡快回覆。' : '✓  Message sent! We\'ll get back to you soon.',
        'success'
      );
    }, 1600);
  });
}

// ——— Toast ———
function showToast(msg, type) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span>${msg}</span>`;
  toast.className = `toast ${type || ''}`;
  requestAnimationFrame(() => { toast.classList.add('show'); });
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// ——— Counter animation ———
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
    const duration = 1800;
    const start = performance.now();
    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      el.textContent = prefix + current.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  });
}

// ——— Intersection Observer for counter ———
function initCounters() {
  const statsBar = document.querySelector('.stats-bar');
  if (!statsBar) return;
  let triggered = false;
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !triggered) {
      triggered = true;
      animateCounters();
    }
  }, { threshold: 0.4 });
  observer.observe(statsBar);
}

// ——— Smooth section link clicks ———
function initSectionLinks() {
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href) return;
    e.preventDefault();
    window.location.hash = href.slice(1);
    handleRoute();
  });
}

// ——— Delete account tab selector ———
function initDeleteTabs() {
  document.querySelectorAll('.delete-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      document.querySelectorAll('.delete-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.delete-tab-pane').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(target)?.classList.add('active');
    });
  });
}

// ——— Bootstrap ———
document.addEventListener('DOMContentLoaded', () => {
  // Set initial language
  setLang(currentLang);

  // Wire up lang buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });

  // Init subsystems
  initNavScroll();
  initMobileNav();
  initContactForm();
  initCounters();
  initSectionLinks();
  initDeleteTabs();

  // Initial route
  window.addEventListener('hashchange', handleRoute);
  handleRoute();
});
