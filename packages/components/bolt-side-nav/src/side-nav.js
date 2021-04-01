const sideNavLinkToggleTrigger = document.querySelectorAll(
  '.js-bolt-side-nav-toggle-trigger',
);

sideNavLinkToggleTrigger.forEach(el => {
  el.addEventListener('click', event => {
    if (el.getAttribute('aria-expanded') === 'true') {
      el.setAttribute('aria-expanded', 'false');
    } else {
      el.setAttribute('aria-expanded', 'true');
    }
  });
});
