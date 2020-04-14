window.addEventListener('load', function() {
  const progressBar = document.querySelector('.js-animated-progress-bar');
  const progressBarReset = document.querySelector(
    '.js-animated-progress-bar--reset',
  );
  let progressBarInitialValue;

  function autoIncrementProgressBar() {
    progressBarInitialValue = progressBar.value;
    const myVar = setInterval(myTimer, 250);

    function myTimer() {
      progressBar.value += 1;

      if (progressBar.value >= progressBar.max) {
        clearInterval(myVar);
        progressBar.animated = false;
        progressBarReset.removeAttribute('disabled');
      }
    }
  }
  if (progressBar) {
    autoIncrementProgressBar();
  }

  if (progressBarReset && progressBar) {
    progressBarReset.addEventListener('click', () => {
      progressBar.value = progressBarInitialValue;
      progressBar.animated = true;
      progressBarReset.setAttribute('disabled', '');
      autoIncrementProgressBar();
    });
  }
});
