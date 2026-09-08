// RÊVER — scroll-driven storytelling plus small, deliberately simple storefront interactions.
gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion) {
  gsap.to('.progress span', { width: '100%', ease: 'none', scrollTrigger: { scrub: 0.2 } });

  gsap.from('.hero-copy > *', {
    y: 35, opacity: 0, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.15
  });
  gsap.from('.hero-image-wrap img', {
    scale: 1.18, yPercent: 8, duration: 1.5, ease: 'power3.out', delay: 0.1
  });
  gsap.to('.hero-image-wrap img', {
    yPercent: -12, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });
  gsap.to('.hero-copy', {
    yPercent: -18, opacity: 0.25, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });
  gsap.to('.orbit-one', {
    rotation: 28, xPercent: 16, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });

  document.querySelectorAll('.statement h2, .section-heading h2, .closing h2').forEach((heading) => {
    gsap.from(heading, {
      y: 70, opacity: 0, duration: 1.1, ease: 'power3.out',
      scrollTrigger: { trigger: heading, start: 'top 88%', toggleActions: 'play none none reverse' }
    });
  });

  gsap.from('.product-card', {
    y: 80, opacity: 0, duration: 1, stagger: 0.18, ease: 'power3.out',
    scrollTrigger: { trigger: '.product-grid', start: 'top 78%', toggleActions: 'play none none reverse' }
  });
  gsap.to('.marquee-track', {
    xPercent: -28, ease: 'none', scrollTrigger: { trigger: '.marquee', start: 'top bottom', end: 'bottom top', scrub: true }
  });
  gsap.from('.journal-item', {
    x: -35, opacity: 0, duration: .7, stagger: .1, ease: 'power2.out',
    scrollTrigger: { trigger: '.journal-list', start: 'top 80%', toggleActions: 'play none none reverse' }
  });

  // Extended editorial sections
  gsap.from('.atelier-copy > *', {
    y: 35, opacity: 0, duration: .9, stagger: .1, ease: 'power2.out',
    scrollTrigger: { trigger: '.atelier', start: 'top 70%', toggleActions: 'play none none reverse' }
  });
  gsap.to('.atelier-image img', {
    yPercent: -10, ease: 'none', scrollTrigger: { trigger: '.atelier-image', start: 'top bottom', end: 'bottom top', scrub: true }
  });
  gsap.from('.atelier-stats > div', {
    y: 30, opacity: 0, duration: .8, stagger: .12, ease: 'power2.out',
    scrollTrigger: { trigger: '.atelier-stats', start: 'top 85%', toggleActions: 'play none none reverse' }
  });
  gsap.from('.craft-grid article', {
    y: 60, opacity: 0, duration: .9, stagger: .14, ease: 'power2.out',
    scrollTrigger: { trigger: '.craft-grid', start: 'top 75%', toggleActions: 'play none none reverse' }
  });
  gsap.from('.quote-list blockquote', {
    y: 50, opacity: 0, duration: .9, stagger: .15, ease: 'power2.out',
    scrollTrigger: { trigger: '.quote-list', start: 'top 78%', toggleActions: 'play none none reverse' }
  });
  gsap.from('.contact-grid > div', {
    y: 25, opacity: 0, duration: .7, stagger: .1, ease: 'power2.out',
    scrollTrigger: { trigger: '.contact-grid', start: 'top 90%', toggleActions: 'play none none reverse' }
  });
}

// Panels: menu, bag and search share one backdrop and one close routine.
const backdrop = document.querySelector('.panel-backdrop');
const panels = {
  menu: document.querySelector('.mobile-menu'),
  bag: document.querySelector('.bag-panel'),
  search: document.querySelector('.search-panel')
};
function closePanels() {
  Object.values(panels).forEach((panel) => panel?.classList.remove('is-open'));
  backdrop?.classList.remove('is-visible');
  Object.values(panels).forEach((panel) => panel?.setAttribute('aria-hidden', 'true'));
}
function openPanel(name) {
  closePanels();
  panels[name]?.classList.add('is-open');
  panels[name]?.setAttribute('aria-hidden', 'false');
  backdrop?.classList.add('is-visible');
}
document.querySelector('.menu-button')?.addEventListener('click', () => openPanel('menu'));
document.querySelector('.bag-button')?.addEventListener('click', () => openPanel('bag'));
document.querySelector('.icon-button')?.addEventListener('click', () => { openPanel('search'); setTimeout(() => document.querySelector('#site-search')?.focus(), 350); });
document.querySelectorAll('.close-panel').forEach((button) => button.addEventListener('click', closePanels));
backdrop?.addEventListener('click', closePanels);
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closePanels(); });
document.querySelectorAll('.mobile-menu a').forEach((link) => link.addEventListener('click', closePanels));

// Search: live hint while typing, same message when submitted.
const searchInput = document.querySelector('#site-search');
const searchMessage = document.querySelector('.search-message');
function showSearchHint(value) {
  if (!searchMessage) return;
  searchMessage.textContent = value ? `Looking for “${value}” — try the collection below.` : '';
}
searchInput?.addEventListener('input', (event) => showSearchHint(event.target.value));
document.querySelector('.search-panel div button')?.addEventListener('click', () => {
  showSearchHint(searchInput?.value?.trim() || '');
  if (searchInput?.value?.trim()) closePanels();
});

// Bag: product buttons fill a small, real bag.
const bagCount = document.querySelector('#bag-count');
const bagList = document.querySelector('#bag-list');
const bagTotal = document.querySelector('#bag-total');
const bagEmpty = document.querySelector('#bag-empty');
const bagItems = document.querySelector('#bag-items');
const bag = new Map();
function renderBag() {
  const count = [...bag.values()].reduce((sum, item) => sum + item.qty, 0);
  if (bagCount) bagCount.textContent = String(count);
  let total = 0;
  if (bagList) {
    bagList.textContent = '';
    bag.forEach((item, name) => {
      total += item.price * item.qty;
      const row = document.createElement('li');
      const label = document.createElement('div');
      const nameEl = document.createElement('span');
      nameEl.className = 'bag-item-name';
      nameEl.textContent = item.qty > 1 ? `${name} × ${item.qty}` : name;
      const priceEl = document.createElement('span');
      priceEl.className = 'bag-item-price';
      priceEl.textContent = `€ ${item.price * item.qty}`;
      label.append(nameEl, priceEl);
      const remove = document.createElement('button');
      remove.setAttribute('aria-label', `Remove ${name}`);
      remove.textContent = 'Remove';
      remove.addEventListener('click', () => { bag.delete(name); renderBag(); });
      row.append(label, remove);
      bagList.appendChild(row);
    });
  }
  if (bagTotal) bagTotal.textContent = `€ ${total}`;
  if (bagEmpty && bagItems) {
    bagEmpty.hidden = count > 0;
    bagItems.hidden = count === 0;
  }
}
document.querySelectorAll('.product-image button').forEach((button) => {
  button.addEventListener('click', () => {
    const name = button.getAttribute('data-name') || 'Rêver piece';
    const price = Number(button.getAttribute('data-price')) || 0;
    const current = bag.get(name) || { price, qty: 0 };
    bag.set(name, { price, qty: current.qty + 1 });
    renderBag();
    button.textContent = '✓';
    setTimeout(() => { button.textContent = '+'; }, 900);
  });
});

// FAQ accordion: one question open at a time.
document.querySelectorAll('.faq-list details').forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    document.querySelectorAll('.faq-list details[open]').forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});

// Newsletter: gentle validation, then the same quiet confirmation as before.
document.querySelector('form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const input = form.querySelector('input');
  const button = form.querySelector('button');
  const message = document.querySelector('.form-message');
  const value = (input?.value || '').trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    if (message) message.textContent = 'A valid email address, please.';
    input?.focus();
    return;
  }
  if (button) button.textContent = '✓';
  if (input) { input.value = ''; input.placeholder = 'You are on the list'; }
  if (message) message.textContent = 'Welcome to the list. First note arrives soon.';
});

// In-page anchors, smooth when motion is welcome.
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  });
});
