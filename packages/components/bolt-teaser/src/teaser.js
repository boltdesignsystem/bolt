import $clamp from 'clamp-js';

export class BoltTeaserTruncation {
  constructor(el) {
    if (!el) return;
    this.el = el;
    this.init();
  }

  init() {
    if (
      this.el.querySelector(
        '.c-bolt-teaser__signifier .c-bolt-teaser__signifier-description .c-bolt-teaser__signifier-description-text',
      )
    ) {
      this.truncate(
        this.el.querySelector(
          '.c-bolt-teaser__signifier .c-bolt-teaser__signifier-description .c-bolt-teaser__signifier-description-text',
        ),
        3,
      );
    }
  }

  truncate(selector, lines) {
    $clamp(selector, { clamp: lines });
  }
}
