export class BoltVideoThumbnail {
  constructor(el) {
    if (!el) return;
    this.el = el;
    this.init();
  }

  init() {
    this.video = this.el.querySelector('video-js');
    this.inlineButton = this.el.querySelector(
      '.js-bolt-video-thumbnail-inline-button',
    );
    this.videoContainer = this.el.querySelector(
      '.js-bolt-video-thumbnail-content-video',
    );

    if (!(this.video && this.inlineButton && this.videoContainer)) return;

    this.inlineButton.addEventListener('click', e => {
      this.playVideo();
      this.videoContainer.style.display = 'block';
      this.inlineButton.remove();
    });
  }

  playVideo() {
    this.video.player.play();
    this.video.focus();
  }
}
