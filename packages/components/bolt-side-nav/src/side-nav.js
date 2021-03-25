var sideNavLinkToggleTrigger = document.querySelectorAll(
  '.js-bolt-side-nav-toggle-trigger',
);

sideNavLinkToggleTrigger.forEach(function(el) {
  el.addEventListener('click', function(event) {
    if (el.getAttribute('aria-expanded') === 'true') {
      el.setAttribute('aria-expanded', 'false');
    } else {
      el.setAttribute('aria-expanded', 'true');
    }
  });
});
