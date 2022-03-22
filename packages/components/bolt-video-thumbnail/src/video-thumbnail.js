export class BoltVideoThumbnail {
  constructor(el) {
    if (!el) return;
    this.el = el;
    this.init();
  }

  init() {
    const inlineVideoPlayButton = this.el.querySelector(
      '.js-bolt-video-thumbnail__inline-play',
    );

    const removeObjects = [
      inlineVideoPlayButton,
      this.el.querySelector('.e-bolt-image'),
      this.el.querySelector('.c-bolt-video-thumbnail__play-icon'),
      this.el.querySelector('.c-bolt-video-thumbnail__meta'),
      this.el.querySelector('.c-bolt-vide'),
    ];

    inlineVideoPlayButton.addEventListener('click', e => {
      this.playVideo(e);
      removeObjects.forEach(el => {
        if (el) {
          el.remove();
        }
      });
    });
  }

  destroyElement(el) {
    el.remove();
  }

  playVideo(el) {
    el.currentTarget
      .closest('.js-bolt-video-thumbnail__inline-play__target')
      .querySelector('video-js')
      .player.play();
  }
}
