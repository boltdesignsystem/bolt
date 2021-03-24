var holyGrailSidebarToggleTrigger = document.querySelectorAll(
  '.js-bolt-holy-grail-sidebar-toggle-trigger',
);

holyGrailSidebarToggleTrigger.forEach(function(el) {
  el.addEventListener('click', function(event) {
    if (el.getAttribute('aria-expanded') === 'true') {
      el.setAttribute('aria-expanded', 'false');
    } else {
      el.setAttribute('aria-expanded', 'true');
    }
  });
});
