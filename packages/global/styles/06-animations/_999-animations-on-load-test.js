function playStateRunningOnLoad() {
  const cascadeAnimations = { slow: [], fast: [] };
  const onLoadAnimations = [
    ...document.querySelectorAll('.a-bolt-base'),
  ].filter(el => {
    if (el.classList.contains('a-bolt-cascade-fast')) {
      cascadeAnimations.fast.push(el);
    } else if (el.classList.contains('a-bolt-cascade-slow')) {
      cascadeAnimations.slow.push(el);
    } else {
      return true;
    }
  });

  onLoadAnimations.forEach(el => {
    el.classList.add('a-bolt-running');
  });

  const animateWithCascade = (el, delay) => {
    const siblings = [...el.parentElement.children].filter(
      siblingEl => siblingEl.tagName === el.tagName,
    );
    const index = siblings.indexOf(el);

    setTimeout(() => {
      el.classList.add('a-bolt-running');
    }, index * delay);
  };

  cascadeAnimations.fast.forEach(el => {
    animateWithCascade(el, 10);
  });

  cascadeAnimations.slow.forEach(el => {
    animateWithCascade(el, 50);
  });
}

window.addEventListener('load', () => {
  playStateRunningOnLoad();
});
