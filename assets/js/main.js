/**
 * THE VELVET MIC — Comedy Club & Live Entertainment Venue
 * Main Interactive JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initPageLoader();
  initTheme();
  initDirection();
  initMobileNav();
  initShowFilters();
  initScrollTop();
  initCtaForms();
  initDashboardTabs();
});

/* --- Attractive Page Loader Dismissal --- */
function initPageLoader() {
  const loader = document.getElementById('pageLoader');
  if (!loader) return;

  const hideLoader = () => {
    loader.classList.add('loader-hidden');
    setTimeout(() => {
      if (loader.parentNode) {
        loader.style.display = 'none';
      }
    }, 600);
  };

  // Dismiss on full load or after fallback timeout
  if (document.readyState === 'complete') {
    setTimeout(hideLoader, 350);
  } else {
    window.addEventListener('load', () => setTimeout(hideLoader, 350));
    // Safe fallback so content is never stuck
    setTimeout(hideLoader, 1500);
  }
}

/* --- Theme Management (Light / Dark Mode) --- */
function initTheme() {
  const themeToggles = document.querySelectorAll('.theme-toggle-btn');
  const savedTheme = localStorage.getItem('velvet_theme') || 'light';
  
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcons(savedTheme);

  themeToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('velvet_theme', nextTheme);
      updateThemeIcons(nextTheme);
    });
  });
}

function updateThemeIcons(theme) {
  const icons = document.querySelectorAll('.theme-toggle-btn i');
  icons.forEach(icon => {
    if (theme === 'dark') {
      icon.className = 'fas fa-sun';
    } else {
      icon.className = 'fas fa-moon';
    }
  });
}

/* --- RTL / LTR Direction Management --- */
function initDirection() {
  const rtlToggles = document.querySelectorAll('.rtl-toggle-btn');
  const savedDir = localStorage.getItem('velvet_dir') || 'ltr';

  document.documentElement.setAttribute('dir', savedDir);
  updateRtlButtons(savedDir);

  rtlToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentDir = document.documentElement.getAttribute('dir');
      const nextDir = currentDir === 'rtl' ? 'ltr' : 'rtl';

      document.documentElement.setAttribute('dir', nextDir);
      localStorage.setItem('velvet_dir', nextDir);
      updateRtlButtons(nextDir);
    });
  });
}

function updateRtlButtons(dir) {
  const rtlBtns = document.querySelectorAll('.rtl-toggle-btn');
  rtlBtns.forEach(btn => {
    btn.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
  });
}

/* --- Mobile Navigation Drawer & Dropdowns --- */
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger-btn');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const mobileDropdownTriggers = document.querySelectorAll('.mobile-dropdown-toggle');

  const closeAllSubmenus = () => {
    document.querySelectorAll('.mobile-submenu').forEach(sub => {
      sub.classList.remove('show');
    });
    document.querySelectorAll('.mobile-dropdown-toggle .dropdown-icon').forEach(icon => {
      icon.style.transform = '';
    });
  };

  const closeDrawer = () => {
    if (drawer) drawer.classList.remove('open');
    if (hamburger) hamburger.classList.remove('active');
    document.documentElement.classList.remove('nav-open');
    closeAllSubmenus();
  };

  if (hamburger && drawer) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = drawer.classList.contains('open');
      if (isOpen) {
        closeDrawer();
      } else {
        closeAllSubmenus();
        drawer.classList.add('open');
        hamburger.classList.add('active');
        document.documentElement.classList.add('nav-open');
      }
    });

    // Close when clicking any regular link
    drawer.querySelectorAll('a:not(.mobile-dropdown-toggle)').forEach(link => {
      link.addEventListener('click', () => {
        closeDrawer();
      });
    });

    // Close when clicking outside drawer
    document.addEventListener('click', (e) => {
      if (drawer.classList.contains('open') && !drawer.contains(e.target) && !hamburger.contains(e.target)) {
        closeDrawer();
      }
    });
  }

  // Accordion for Mobile Submenus
  mobileDropdownTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const submenu = trigger.nextElementSibling;
      if (submenu) {
        const isCurrentlyShown = submenu.classList.contains('show');
        closeAllSubmenus();
        if (!isCurrentlyShown) {
          submenu.classList.add('show');
          const icon = trigger.querySelector('.dropdown-icon');
          if (icon) {
            icon.style.transform = 'rotate(180deg)';
          }
        }
      }
    });
  });
}

/* --- Show Category Filter Engine --- */
function initShowFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const showCards = document.querySelectorAll('.show-card');

  if (filterBtns.length === 0 || showCards.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      showCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --- Scroll To Top Button --- */
function initScrollTop() {
  const scrollBtns = document.querySelectorAll('.scroll-top-btn, .back-to-top');
  if (scrollBtns.length === 0) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollBtns.forEach(btn => btn.classList.add('show'));
    } else {
      scrollBtns.forEach(btn => btn.classList.remove('show'));
    }
  });

  scrollBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  });
}

/* --- CTA Form Interactive Feedback --- */
function initCtaForms() {
  const ctaForms = document.querySelectorAll('.cta-form');
  ctaForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"], input[type="text"]');
      if (input && input.value.trim() !== '') {
        const btn = form.querySelector('button');
        const origText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Reserved!';
        btn.style.background = '#10B981';
        input.value = '';
        setTimeout(() => {
          btn.innerHTML = origText;
          btn.style.background = '';
        }, 3000);
      }
    });
  });
}

/* --- Dashboard Horizontal / Vertical Tab Switching --- */
function initDashboardTabs() {
  const tabs = document.querySelectorAll('.sidebar-nav-item');
  const sections = document.querySelectorAll('.dash-tab-content');
  if (tabs.length === 0) return;

  function switchTab(targetId) {
    const cleanId = targetId.replace('#', '');
    const targetSection = document.getElementById(cleanId + 'Section') || document.getElementById(cleanId);
    
    tabs.forEach(t => {
      const href = t.getAttribute('href').replace('#', '');
      if (href === cleanId) {
        t.classList.add('active');
        // Scroll horizontal pill into view on mobile
        t.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else {
        t.classList.remove('active');
      }
    });

    if (targetSection) {
      sections.forEach(s => s.classList.remove('active'));
      targetSection.classList.add('active');
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      const href = tab.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        switchTab(href);
        history.replaceState(null, null, href);
      }
    });
  });

  // Check URL hash on page load
  if (window.location.hash) {
    switchTab(window.location.hash);
  }
}

