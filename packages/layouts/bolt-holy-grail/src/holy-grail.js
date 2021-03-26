var holyGrailSidebarToggleTrigger = document.querySelectorAll(
  '.js-bolt-holy-grail-sidebar-toggle-trigger',
);

holyGrailSidebarToggleTrigger.forEach(function(el) {
  el.addEventListener('click', function(event) {
    if (el.getAttribute('aria-expanded') === 'true') {
      el.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('u-bolt-overflow-hidden');
    } else {
      el.setAttribute('aria-expanded', 'true');
      document.body.classList.add('u-bolt-overflow-hidden');
    }
  });
});
