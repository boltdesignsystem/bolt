import { Component, Prop } from '@stencil/core';

import BrightcoveVideo from '@times-component/brightcove-video';

...



import {
  css,
  cssClassForSize,
  getTag
} from '../bolt-common/index';

@Component({
  tag: 'bolt-icons',
  styleUrl: 'bolt-icons.scss'
})
export class BoltIcons {

  @Prop() tag: any;
  @Prop() size: any;

  render() {
    const Tag = getTag(this.tag);
    const headlineSize = cssClassForSize(this.size, "c-bolt-headline--");
    // console.log(Tag);

    const className = css(
      "c-bolt-headline",
      headlineSize
      // this.col ? "c-bolt-cell--" + this.col : "",
      // this.colMd ? "c-bolt-cell--" + this.colMd + "@md" : ""
    );

    return (
      <BrightcoveVideo
        accountId={BRIGHTCOVE_ACCOUNT_ID}
        videoId={BRIGHTCOVE_ACCOUNT_ID}
        width={320}
        height={70}
        onError={console.error}
        policyKey={BRIGHTCOVE_POLICY_KEY} // Required for native
        autoplay={true}
      />
    );
  }
}