import { triggerAnims } from '@bolt/components-animate/utils';

const filterInvisibles = els => {
  if (!Array.isArray(els)) {
    return els.offsetHeight > 0 ? els : null;
  }
  return els.filter(el => el.offsetHeight > 0);
};

const selectors = Array.from(document.querySelectorAll('bolt-animate'));
Promise.all(
  selectors.map(element => {
    if (element._wasInitiallyRendered) return;
    return new Promise((resolve, reject) => {
      element.addEventListener('ready', resolve);
      element.addEventListener('error', reject);
    });
  }),
).then(() => {
  console.log('all done')
  triggerAnims({
    // animEls: filterInvisibles(animInitEls),
    animEls: filterInvisibles(Array.from(document.querySelectorAll('bolt-animate[group="initial"][in]'))),
    stage: 'IN',
  });
});
