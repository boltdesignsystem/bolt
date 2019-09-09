import { triggerAnims } from '@bolt/components-animate/utils';

export function enableAnimDemos() {
  [...document.getElementsByClassName('demo-animate')].forEach(animDemo => {
    let triggeredIn = false;
    const trigger = animDemo.querySelector('.demo-animate__trigger');
    const wrapper = animDemo.querySelector('.demo-animate__wrapper');
    const getAnimEls = () => wrapper.getElementsByTagName('bolt-animate');
    // const animEls = Array.from(getAnimEls());
    // const animEls = Array.from(animDemo.querySelectorAll('bolt-animate'));

    trigger.addEventListener('click', () => {
      // const animEls = getAnimEls();
      const animEls = Array.from(getAnimEls());
      console.log(animEls.length, animEls);
      const stage = triggeredIn ? 'OUT' : 'IN';
      console.log({ stage });
      triggerAnims({ animEls, stage }).then(() => {
        console.log('all done');
      });
      trigger.innerText = `Trigger Animations ${triggeredIn ? 'IN' : 'OUT'}`;
      triggeredIn = !triggeredIn;
    });
  });
}
