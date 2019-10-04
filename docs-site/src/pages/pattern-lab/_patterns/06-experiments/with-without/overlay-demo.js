import { triggerAnims } from '@bolt/components-animate/utils';

window.triggerOverlayDemoFadeOut = () => {
  const overlay = document.querySelector('.c-pega-wwo__modal-bg--animator');
  console.log('called triggerOverlayDemoFadeOut');
  try {
    if (overlay) {
      triggerAnims({
        animEls: Array.from([overlay]),
        stage: 'OUT',
        debug: true,
      });
    } else {
      throw new Error('with/without overlay not found');
    }
  } catch ($e) {
    console.error($e);
  }
};
