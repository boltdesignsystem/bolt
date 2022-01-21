function playStateRunningOnLoad() {
  function runAnime() {
    document.querySelectorAll('.a-bolt-fade').forEach(fade => {
      fade.classList.add('a-bolt-fade--running');
    });
  }

  window.onload = () => {
    runAnime();
  };
}

const mediaQueryReduceMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)',
);

if (!mediaQueryReduceMotion || mediaQueryReduceMotion.matches) {
  playStateRunningOnLoad();
} else {
  playStateRunningOnLoad();
}

mediaQueryReduceMotion.addEventListener('change', () => {
  if (mediaQueryReduceMotion.matches) {
    playStateRunningOnLoad();
  } else {
    playStateRunningOnLoad();
  }
});
