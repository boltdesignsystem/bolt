import { serverRenderedExample } from '../_personalized-card-example-data';

const elementsToPersonalize = document.querySelectorAll(
  '.js-personalized-card--server-rendered--with-small-delay',
);

for (let i = 0; i < elementsToPersonalize.length; i++) {
  let element = elementsToPersonalize[i];

  if (i < serverRenderedExample.length) {
    const html = document
      .createRange()
      .createContextualFragment(serverRenderedExample[i].html);
    let contentInjectionTarget = element;

    if (serverRenderedExample[i].replaceParent === '1') {
      contentInjectionTarget = element.parentNode;
    }

    setTimeout(function() {
      contentInjectionTarget.parentNode.replaceChild(
        html,
        contentInjectionTarget,
      );
    }, 40);
  }
}
