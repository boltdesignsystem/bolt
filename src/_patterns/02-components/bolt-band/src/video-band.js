import { define, props, withComponent } from 'skatejs';
import { eventHandler, withPreact } from '@bolt/core'; // Latest v. broken so using local version for now
import { h, render } from 'preact';
import { Band } from './band';

@define
export class VideoBand extends Band {
  static is = 'video-band';

  playHandler(event) {
    console.log('video band play handler');
  }

  pauseHandler(event) {
    console.log('video band pause handler');
  }

  connectedCallback() {
    console.log('video band connected callback');

    this.addEventListener('play', this.playHandler);
    this.addEventListener('pause', this.pauseHandler);
  }

  render() {
    return (
      <slot />
    )
  }
}
