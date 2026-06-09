document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initAccordion();
  initStickyHeader();
  initProductThumbs();
  initProductOptions();
  initQuantity();
  initCartDrawer();
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


/* ═══════════════════════════════════════════════════════════════
   AJAX CART DRAWER
   ═══════════════════════════════════════════════════════════════ */

function initCartDrawer() {
  const drawer = document.querySelector('[data-cart-drawer]');
  if (!drawer) return;

  const trigger = document.querySelector('[data-cart-drawer-trigger]');
  const close = document.querySelector('[data-cart-drawer-close]');
  const overlay = drawer.querySelector('[data-cart-drawer-overlay]');
  const body = drawer.querySelector('[data-cart-drawer-body]');
  const loader = drawer.querySelector('[data-cart-drawer-loader]');

  trigger?.addEventListener('click', (e) => {
    e.preventDefault();
    openDrawer();
  });
  close?.addEventListener('click', closeDrawer);
  overlay?.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeDrawer();
  });

  function openDrawer() {
    drawer.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    loadCart();
  }

  function closeDrawer() {
    drawer.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  async function loadCart() {
    showLoader();
    try {
      const res = await fetch('/cart.js');
      if (!res.ok) throw new Error('Failed to load cart');
      const cart = await res.json();
      renderCart(cart);
      updateBadge(cart.item_count);
    } catch (err) {
      body.innerHTML = '<div class="cart-drawer__empty"><p style="color:#dc2626">Unable to load cart. Please refresh.</p></div>';
    } finally {
      hideLoader();
    }
  }

  function renderCart(cart) {
    if (cart.item_count === 0) {
      body.innerHTML = `
        <div class="cart-drawer__empty">
          <div class="cart-drawer__empty-icon">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
          </div>
          <div class="cart-drawer__empty-title">Your cart is empty</div>
          <p class="cart-drawer__empty-text">Looks like you haven't added anything yet.</p>
          <a href="/collections/all" class="cart-drawer__empty-btn" data-cart-drawer-close>Start Shopping</a>
        </div>
      `;
      drawer.querySelector('[data-cart-drawer-footer]').style.display = 'none';
      drawer.querySelector('[data-cart-drawer-shipping]').style.display = 'none';
      return;
    }

    drawer.querySelector('[data-cart-drawer-footer]').style.display = '';
    drawer.querySelector('[data-cart-drawer-shipping]').style.display = '';

    // Shipping bar
    const freeThreshold = 9900; // $99 in cents — adjust as needed
    const remaining = Math.max(0, freeThreshold - cart.total_price);
    const pct = Math.min(100, (cart.total_price / freeThreshold) * 100);
    const shippingText = remaining > 0
      ? `Add <strong>${formatMoney(remaining)}</strong> more for free shipping!`
      : `<strong>You've unlocked free shipping!</strong>`;
    const shippingBar = drawer.querySelector('[data-cart-drawer-shipping]');
    if (shippingBar) {
      shippingBar.querySelector('[data-shipping-text]').innerHTML = shippingText;
      shippingBar.querySelector('[data-shipping-fill]').style.width = pct + '%';
    }

    // Items
    const itemsHTML = cart.items.map(item => {
      const variant = item.variant_title ? `<div class="cart-drawer__item-variant">${item.variant_title}</div>` : '';
      return `
        <div class="cart-drawer__item" data-line="${item.line}">
          <div class="cart-drawer__item-image">
            <img src="${item.image || ''}" alt="${item.product_title}" loading="lazy">
          </div>
          <div class="cart-drawer__item-info">
            <div class="cart-drawer__item-title">${item.product_title}</div>
            ${variant}
            <div class="cart-drawer__item-bottom">
              <div class="cart-drawer__qty">
                <button class="cart-drawer__qty-btn" data-qty-change="${item.line}" data-delta="-1" aria-label="Decrease quantity">−</button>
                <input class="cart-drawer__qty-input" type="number" value="${item.quantity}" min="1" data-qty-line="${item.line}" readonly>
                <button class="cart-drawer__qty-btn" data-qty-change="${item.line}" data-delta="1" aria-label="Increase quantity">+</button>
              </div>
              <span class="cart-drawer__item-price">${formatMoney(item.final_line_price)}</span>
            </div>
          </div>
          <button class="cart-drawer__item-remove" data-remove-line="${item.line}" aria-label="Remove item">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      `;
    }).join('');

    body.innerHTML = `<div class="cart-drawer__items">${itemsHTML}</div>`;

    // Footer totals
    const footer = drawer.querySelector('[data-cart-drawer-footer]');
    if (footer) {
      const subtotal = footer.querySelector('[data-cart-subtotal]');
      const discount = footer.querySelector('[data-cart-discount]');
      const discountRow = footer.querySelector('[data-cart-discount-row]');
      const total = footer.querySelector('[data-cart-total]');
      if (subtotal) subtotal.textContent = formatMoney(cart.original_total_price || cart.total_price);
      if (total) total.textContent = formatMoney(cart.total_price);
      const discountAmount = (cart.original_total_price || cart.total_price) - cart.total_price;
      if (discount && discountRow) {
        if (discountAmount > 0) {
          discount.textContent = '-' + formatMoney(discountAmount);
          discountRow.style.display = 'flex';
        } else {
          discountRow.style.display = 'none';
        }
      }
    }

    // Bind events
    body.querySelectorAll('[data-qty-change]').forEach(btn => {
      btn.addEventListener('click', () => {
        const line = parseInt(btn.dataset.qtyChange, 10);
        const delta = parseInt(btn.dataset.delta, 10);
        const input = body.querySelector(`[data-qty-line="${line}"]`);
        const current = parseInt(input?.value, 10) || 1;
        const newQty = current + delta;
        if (newQty < 1) return;
        updateLine(line, newQty);
      });
    });

    body.querySelectorAll('[data-remove-line]').forEach(btn => {
      btn.addEventListener('click', () => {
        const line = parseInt(btn.dataset.removeLine, 10);
        updateLine(line, 0);
      });
    });

    // Close button inside empty state
    drawer.querySelectorAll('[data-cart-drawer-close]').forEach(btn => {
      btn.addEventListener('click', closeDrawer);
    });
  }

  async function updateLine(line, quantity) {
    showLoader();
    try {
      const res = await fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ line, quantity })
      });
      if (!res.ok) throw new Error('Update failed');
      const cart = await res.json();
      renderCart(cart);
      updateBadge(cart.item_count);
    } catch (err) {
      console.error('Cart update error:', err);
    } finally {
      hideLoader();
    }
  }

  function updateBadge(count) {
    const badge = document.querySelector('[data-cart-count]');
    if (!badge) return;
    badge.textContent = count > 0 ? count : '';
    badge.style.display = count > 0 ? 'flex' : 'none';
  }

  function showLoader() { loader?.classList.add('is-active'); }
  function hideLoader() { loader?.classList.remove('is-active'); }
}
