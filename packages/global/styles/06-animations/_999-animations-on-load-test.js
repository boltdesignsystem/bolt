function playStateRunningOnLoad() {
  document.querySelectorAll('[class*="a-bolt-"]').forEach(fade => {
    fade.classList.add('a-bolt-running');
  });
}

window.onload = () => {
  playStateRunningOnLoad();
};
