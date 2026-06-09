document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initAccordion();
  initStickyHeader();
  initProductThumbs();
  initProductOptions();
  initQuantity();
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

/* Product option selection */
function initProductOptions() {
  const optionsContainer = document.querySelector('[data-product-options]');
  if (!optionsContainer) return;

  const options = optionsContainer.querySelectorAll('[data-product-option]');
  options.forEach(option => {
    option.addEventListener('click', () => {
      options.forEach(o => o.classList.remove('is-selected'));
      option.classList.add('is-selected');
      updateATCButton();
    });
  });
}

/* Quantity +/- */
function initQuantity() {
  const minusBtn = document.querySelector('[data-qty-minus]');
  const plusBtn = document.querySelector('[data-qty-plus]');
  const input = document.querySelector('[data-qty-input]');
  if (!input) return;

  minusBtn?.addEventListener('click', () => {
    const current = parseInt(input.value, 10) || 1;
    if (current > 1) {
      input.value = current - 1;
      updateATCButton();
    }
  });

  plusBtn?.addEventListener('click', () => {
    const current = parseInt(input.value, 10) || 1;
    input.value = current + 1;
    updateATCButton();
  });

  input.addEventListener('change', () => {
    let val = parseInt(input.value, 10);
    if (isNaN(val) || val < 1) val = 1;
    input.value = val;
    updateATCButton();
  });
}

/* Update Add to Cart button text */
function updateATCButton() {
  const atcBtn = document.querySelector('[data-atc-button]');
  const selectedOption = document.querySelector('[data-product-option].is-selected');
  const qtyInput = document.querySelector('[data-qty-input]');
  if (!atcBtn || !selectedOption) return;

  const priceCents = parseInt(selectedOption.dataset.optionPrice, 10) || 0;
  const qty = parseInt(qtyInput?.value, 10) || 1;
  const totalCents = priceCents * qty;

  const formatted = formatMoney(totalCents);
  atcBtn.textContent = `Add to Cart — ${formatted}`;
}

/* Simple money formatter (assumes USD / shop currency) */
function formatMoney(cents) {
  const dollars = (cents / 100).toFixed(2);
  // Try to use Shopify's Currency if available, otherwise fallback
  if (window.Shopify && window.Shopify.formatMoney) {
    return window.Shopify.formatMoney(cents, window.Shopify.money_format || '${{amount}}');
  }
  return '$' + dollars;
}
