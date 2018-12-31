import { clientRenderedExample } from '../_personalized-card-example-data';

const elementsToPersonalize = document.querySelectorAll(
  '.js-personalized-card--client-rendered--with-small-delay',
);

for (let i = 0; i < elementsToPersonalize.length; i++) {
  let element = elementsToPersonalize[i];

  if (i < clientRenderedExample.length) {
    const html = document
      .createRange()
      .createContextualFragment(clientRenderedExample[i].html);
    let contentInjectionTarget = element;

    if (clientRenderedExample[i].replaceParent === '1') {
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
