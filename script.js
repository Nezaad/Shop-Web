
// Small, deliberately simple panels keep the demo feeling like a real storefront.
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
document.querySelector('.search-panel form')?.addEventListener('submit', (event) => event.preventDefault());
document.querySelector('.search-panel input')?.addEventListener('input', (event) => {
  const message = document.querySelector('.search-message');
  message.textContent = event.target.value ? `Looking for “${event.target.value}” — try the collection below.` : '';
});
