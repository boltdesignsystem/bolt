window.addEventListener('load', function() {
  const progressBar = document.querySelector('.js-progress-bar-stepper');

  const progressBarBackward = document.querySelector(
    '.js-progress-bar-stepper--back',
  );
  const progressBarForward = document.querySelector(
    '.js-progress-bar-stepper--forward',
  );

  function updateProgressText() {
    progressBar.valueText = `${progressBar.value} of ${progressBar.max}`;
  }

  if (progressBarBackward) {
    progressBarBackward.addEventListener('click', () => {
      if (progressBar.value > progressBar.min) {
        progressBar.value -= 1;
        updateProgressText();
      }
    });
  }

  if (progressBarForward) {
    progressBarForward.addEventListener('click', () => {
      if (progressBar.value < progressBar.max) {
        progressBar.value += 1;
        updateProgressText();
      }
    });
  }

  if (progressBar) {
    progressBar.addEventListener('rendered', function() {
      if (progressBar.value === progressBar.min) {
        progressBarBackward.setAttribute('disabled', '');
      }

      if (progressBar.value === progressBar.max) {
        progressBarForward.setAttribute('disabled', '');
      }

      if (progressBar.value > progressBar.min) {
        progressBarBackward.removeAttribute('disabled');
      }

      if (progressBar.value < progressBar.max) {
        progressBarForward.removeAttribute('disabled');
      }
    });
  }
});
