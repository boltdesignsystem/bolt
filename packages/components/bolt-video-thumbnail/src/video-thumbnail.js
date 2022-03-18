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
    const inlineVideoImage = this.el.querySelector('.e-bolt-image');
    const inlineVideoPlayIcon = this.el.querySelector(
      '.c-bolt-video-thumbnail__play-icon',
    );
    const inlineVideoMeta = this.el.querySelector(
      '.c-bolt-video-thumbnail__meta',
    );

    inlineVideoPlayButton.addEventListener('click', e => {
      this.playVideo(e);
      this.destroyElement(inlineVideoPlayButton);
      this.destroyElement(inlineVideoImage);
      this.destroyElement(inlineVideoPlayIcon);
      this.destroyElement(inlineVideoMeta);
    });
  }

  destroyElement(el) {
    el.remove();
  }

  playVideo(el) {
    el.currentTarget.previousElementSibling
      .querySelector('.c-base-video')
      .player.play();
  }
}
