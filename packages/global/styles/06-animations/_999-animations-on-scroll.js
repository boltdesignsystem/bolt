const animatedElements = document.querySelectorAll('.a-bolt-base');

const callback = (entries, observer) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains('a-bolt-cascade-slow')) {
        setTimeout(() => {
          entry.target.classList.add('a-bolt-running');
        }, index * 75);
        // stop observing this element
        observer.unobserve(entry.target);
      } else if (entry.target.classList.contains('a-bolt-cascade-fast')) {
        setTimeout(() => {
          entry.target.classList.add('a-bolt-running');
        }, index * 25);
        // stop observing this element
        observer.unobserve(entry.target);
      } else {
        entry.target.classList.add('a-bolt-running');
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
