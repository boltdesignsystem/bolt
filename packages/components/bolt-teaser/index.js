import { BoltTeaserTruncation } from './src/teaser.js';

const teaser = document.querySelectorAll('.c-bolt-teaser');
for (let t = 0; t < teaser.length; t++) {
  if (teaser[t]) {
    const teaserComponent = new BoltTeaserTruncation(teaser[t]);
  }
}
