import { triggerAnims } from '@bolt/components-animate/utils';

export function enableAnimDemos() {
  setTimeout(() => {
    document.querySelectorAll('.demo-animate').forEach(animDemo => {
      let triggeredIn = false;
      const trigger = animDemo.querySelector('.demo-animate__trigger');
      const wrapper = animDemo.querySelector('.demo-animate__wrapper');
      const animEls = Array.from(animDemo.querySelectorAll('bolt-animate'));

      trigger.addEventListener('click', () => {
        const stage = triggeredIn ? 'OUT' : 'IN';
        triggerAnims({ animEls, stage, debug: false }).then(() => {
          // console.log('all done');
        });
        trigger.innerText = `Trigger  Animations ${triggeredIn ? 'IN' : 'OUT'}`;
        triggeredIn = !triggeredIn;
      });
    });
  }, 0);
}
