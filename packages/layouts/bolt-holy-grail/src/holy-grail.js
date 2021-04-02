const holyGrailToggleTrigger = document.querySelectorAll(
  '[data-bolt-holy-grail-toggle-trigger]',
);

holyGrailToggleTrigger.forEach(el => {
  el.addEventListener('click', event => {
    if (el.getAttribute('aria-expanded') === 'true') {
      el.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('u-bolt-overflow-hidden');
    } else {
      el.setAttribute('aria-expanded', 'true');
      document.body.classList.add('u-bolt-overflow-hidden');
    }
  });
});
