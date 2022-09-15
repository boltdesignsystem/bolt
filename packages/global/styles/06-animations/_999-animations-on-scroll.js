const animatedElements = document.querySelectorAll('.a-bolt-base');

const callback = (entries, observer) => {
  const runAnimationClass = 'a-bolt-running';

  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      let timeInterval;

      if (entry.target.classList.contains('a-bolt-cascade-slow')) {
        timeInterval = 75;
      } else if (entry.target.classList.contains('a-bolt-cascade-fast')) {
        timeInterval = 25;
      }

      if (timeInterval) {
        setTimeout(() => {
          entry.target.classList.add(runAnimationClass);
        }, index * timeInterval);
      } else {
        entry.target.classList.add(runAnimationClass);
      }

      // stop observing this element
      observer.unobserve(entry.target);
    }
  });
};

const myObserver = new IntersectionObserver(callback);

animatedElements.forEach(el => {
  myObserver.observe(el);
});
