export class BoltPageFooter {
  constructor(el) {
    if (!el) return;
    this.el = el;
    this.init();
  }

  init() {
    var acc = document.getElementsByClassName('c-page-footer__nav-trigger');
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener('click', function() {
        this.classList.toggle('active');
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      });
    }
  }
}
