window.addEventListener('load', function() {
  const progressBar = document.querySelector('.js-progress-bar-stepper');

  const progressBarBackward = document.querySelector(
    '.js-progress-bar-stepper--back',
  );
  const progressBarForward = document.querySelector(
    '.js-progress-bar-stepper--forward',
  );

  if (progressBarBackward) {
    progressBarBackward.addEventListener('click', () => {
      if (progressBar.value > 0) {
        progressBar.value -= 1;
      }
    });
  }

  if (progressBarForward) {
    progressBarForward.addEventListener('click', () => {
      if (progressBar.value < progressBar.max) {
        progressBar.value += 1;
      }
    });
  }

  if (progressBar) {
    progressBar.addEventListener('rendered', function() {
      if (progressBar.value === 1) {
        progressBarBackward.setAttribute('disabled', '');
      }

      if (progressBar.value === progressBar.max) {
        progressBarForward.setAttribute('disabled', '');
      }

      if (progressBar.value > 1) {
        progressBarBackward.removeAttribute('disabled');
      }

      if (progressBar.value < progressBar.max) {
        progressBarForward.removeAttribute('disabled');
      }
    });
  }
});
