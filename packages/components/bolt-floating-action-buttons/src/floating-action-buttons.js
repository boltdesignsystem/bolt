export class BoltFloatingActionButtons {
  constructor(el) {
    if (!el) return;
    this.el = el;
    this.init();
  }

  init() {
    this.primaryList = this.el.querySelector(
      '.js-bolt-floating-action-buttons-list',
    );
    this.secondaryList = this.primaryList.querySelector(
      '.js-bolt-floating-action-buttons-list',
    );
    this.toggleButton = this.primaryList.querySelector(
      '.js-bolt-floating-action-buttons-toggle',
    );
    this.hiddenListItems = this.el.querySelectorAll(
      '.js-bolt-floating-action-buttons-list-item--hidden',
    );
    this.isOpen = false;

    if (this.secondaryList) {
      this.secondaryListItems = this.secondaryList.querySelectorAll(
        '.js-bolt-floating-action-buttons-list-item',
      );

      // hide secondary list items
      Array.from(this.secondaryListItems).forEach(el => {
        el.classList.add('c-bolt-floating-action-buttons__list-item--hidden');
      });
    }

    if (this.toggleButton) {
      this.toggleButton.addEventListener('click', () => {
        this.toggleSecondaryList();
      });
    }

    if (this.hiddenListItems) {
      Array.from(this.hiddenListItems).forEach(el => {
        this.addScrollHandler(el);
      });
    }

    this.show();
    this.el.setAttribute('data-bolt-ready', '');
  }

  show() {
    this.el.classList.remove('c-bolt-floating-action-buttons--hidden');
  }

  hide() {
    this.el.classList.add('c-bolt-floating-action-buttons--hidden');
  }

  toggleSecondaryList() {
    if (this.isOpen) {
      // close this
      this.isOpen = false;
      this.toggleButton.setAttribute('aria-expanded', 'false');
      if (this.secondaryList) {
        this.secondaryList.classList.add(
          'c-bolt-floating-action-buttons__list--hidden',
        );
        Array.from(this.secondaryListItems).forEach(el => {
          setTimeout(() => {
            el.classList.add(
              'c-bolt-floating-action-buttons__list-item--hidden',
            );
          }, 200);
        });
      }
    } else {
      // open this
      this.isOpen = true;
      this.toggleButton.setAttribute('aria-expanded', 'true');
      if (this.secondaryList) {
        this.secondaryList.classList.remove(
          'c-bolt-floating-action-buttons__list--hidden',
        );
        Array.from(this.secondaryListItems).forEach((el, index) => {
          setTimeout(() => {
            el.classList.remove(
              'c-bolt-floating-action-buttons__list-item--hidden',
            );
          }, index * 50);
        });
      }
    }
  }

  addScrollHandler(el) {
    const callback = entries => {
      entries.forEach(entry => {
        const isIntersectingTop =
          entry.intersectionRect.top >= entry.boundingClientRect.top;
        const isLeaving = entry.intersectionRatio === 0;

        if (isIntersectingTop) {
          if (isLeaving) {
            // leaving
            el.classList.remove(
              'c-bolt-floating-action-buttons__list-item--hidden',
            );
          } else {
            // entering
            el.classList.add(
              'c-bolt-floating-action-buttons__list-item--hidden',
            );
          }
        }
      });
    };

    const observer = new IntersectionObserver(callback);
    observer.observe(document.querySelector(el.dataset.showOnScrollSelector));
  }
}
