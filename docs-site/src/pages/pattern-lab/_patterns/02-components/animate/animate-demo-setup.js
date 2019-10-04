import { triggerAnims } from '@bolt/components-animate/utils';

document.addEventListener('DOMContentLoaded', function() {
  Array.from(document.getElementsByClassName('demo-animate')).forEach(function(
    animDemo,
  ) {
    let triggeredIn = false;
    const trigger = animDemo.querySelector('.demo-animate__trigger');
    const wrapper = animDemo.querySelector('.demo-animate__wrapper');
    const getAnimEls = function() {
      return wrapper.getElementsByTagName('bolt-animate');
    };
    // const animEls = Array.from(getAnimEls());
    // const animEls = Array.from(animDemo.querySelectorAll('bolt-animate'));

    trigger.addEventListener('click', function() {
      // const animEls = getAnimEls();
      const animEls = Array.from(getAnimEls());
      console.log(animEls.length, animEls);
      const stage = triggeredIn ? 'OUT' : 'IN';
      console.log({ stage });
      triggerAnims({ animEls, stage }).then(function() {
        console.log('all done');
      });
      trigger.innerText = `Trigger Animations ${triggeredIn ? 'IN' : 'OUT'}`;
      triggeredIn = !triggeredIn;
    });
  });

  const els = document.querySelectorAll('.demo-animate__items bolt-animate');
  els.forEach(function(el) {
    el.addEventListener('bolt-animate:end:in', function(event) {
      console.log('pl bolt-animate:end:in', event);
    });
    el.addEventListener('bolt-animate:end:out', function(event) {
      console.log('pl bolt-animate:end:out', event);
    });
  });
});
