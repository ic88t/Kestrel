document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initAccordion();
  initStickyHeader();
  initProductThumbs();
});

/* Mobile menu */
function initMobileMenu() {
  const trigger = document.querySelector('[data-mobile-menu-trigger]');
  const menu = document.querySelector('[data-mobile-menu]');
  const close = document.querySelector('[data-mobile-menu-close]');
  if (!trigger || !menu) return;

  trigger.addEventListener('click', () => menu.classList.add('is-open'));
  close?.addEventListener('click', () => menu.classList.remove('is-open'));
  menu.addEventListener('click', (e) => {
    if (e.target === menu) menu.classList.remove('is-open');
  });
}

/* Accordion */
function initAccordion() {
  document.querySelectorAll('[data-accordion-trigger]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('[data-accordion-item]');
      const isOpen = item.classList.contains('is-open');
      // Close siblings if grouped
      const group = item.closest('[data-accordion-group]');
      if (group) {
        group.querySelectorAll('[data-accordion-item]').forEach(i => i.classList.remove('is-open'));
      }
      item.classList.toggle('is-open', !isOpen);
    });
  });
}

/* Sticky header shadow */
function initStickyHeader() {
  const header = document.querySelector('[data-header]');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('is-scrolled', window.scrollY > 10);
  }, { passive: true });
}

/* Product thumbnail switching */
function initProductThumbs() {
  const main = document.querySelector('[data-product-main-image]');
  document.querySelectorAll('[data-product-thumb]').forEach(thumb => {
    thumb.addEventListener('click', () => {
      if (!main) return;
      const src = thumb.querySelector('img')?.dataset.src || thumb.querySelector('img')?.src;
      if (src) main.src = src;
      document.querySelectorAll('[data-product-thumb]').forEach(t => t.classList.remove('is-active'));
      thumb.classList.add('is-active');
    });
  });
}
