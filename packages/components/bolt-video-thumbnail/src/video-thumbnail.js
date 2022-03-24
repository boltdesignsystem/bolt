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

    inlineVideoPlayButton.addEventListener('click', e => {
      this.playVideo(e);
      e.currentTarget
        .closest('.js-bolt-video-thumbnail__inline')
        .querySelector('.c-bolt-video-thumbnail__inline').style.display =
        'block';
      e.currentTarget.remove();
    });
  }

  playVideo(el) {
    const targetVideo = el.currentTarget
      .closest('.js-bolt-video-thumbnail__inline')
      .querySelector('video-js');
    targetVideo.player.play();
    targetVideo.focus();
  }
}
