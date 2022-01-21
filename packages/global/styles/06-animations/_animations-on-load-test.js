function playStateRunningOnLoad() {
  document.querySelectorAll('.a-bolt-fade').forEach(fade => {
    fade.classList.add('a-bolt-fade--running');
  });
}

window.onload = () => {
  playStateRunningOnLoad();
};
