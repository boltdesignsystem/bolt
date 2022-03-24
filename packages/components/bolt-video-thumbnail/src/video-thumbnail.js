export class BoltVideoThumbnail {
  constructor(el) {
    if (!el) return;
    this.el = el;
    this.init();
  }

  init() {
    const inlineVideoPlayButton = this.el.querySelector(
      '.js-bolt-video-thumbnail-inline-button',
    );

    inlineVideoPlayButton.addEventListener('click', e => {
      this.playVideo(e);
      e.currentTarget
        .closest('.c-bolt-video-thumbnail--inline')
        .querySelector('.c-bolt-video-thumbnail__content-video').style.display =
        'block';
      e.currentTarget.remove();
    });
  }

  playVideo(el) {
    const targetVideo = el.currentTarget
      .closest('.c-bolt-video-thumbnail--inline')
      .querySelector('video-js');
    targetVideo.player.play();
    targetVideo.focus();
  }
}
