const animatedElements = document.querySelectorAll('.a-bolt-base');

const callback = (entries, observer) => {
  const runAnimation = 'a-bolt-running';
  const timeInterval = (entry, index, delay) => {
    setTimeout(() => {
      entry.target.classList.add(runAnimation);
    }, index * delay);
  };
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains('a-bolt-cascade-slow')) {
        timeInterval(entry, index, 75);
        // stop observing this element
        observer.unobserve(entry.target);
      } else if (entry.target.classList.contains('a-bolt-cascade-fast')) {
        timeInterval(entry, index, 25);
        // stop observing this element
        observer.unobserve(entry.target);
      } else {
        entry.target.classList.add(runAnimation);
        // stop observing this element
        observer.unobserve(entry.target);
      }
    }
  });
};

const myObserver = new IntersectionObserver(callback);

animatedElements.forEach(el => {
  myObserver.observe(el);
});
