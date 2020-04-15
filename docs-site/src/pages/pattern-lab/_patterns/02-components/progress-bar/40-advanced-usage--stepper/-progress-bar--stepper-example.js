window.addEventListener('load', function() {
  var progressBar = document.querySelector('.js-progress-bar-stepper');

  var progressBarBackward = document.querySelector(
    '.js-progress-bar-stepper--back',
  );
  var progressBarForward = document.querySelector(
    '.js-progress-bar-stepper--forward',
  );

  function updateProgressText() {
    progressBar.valueText = `${progressBar.value} of ${progressBar.max}`;
  }

  progressBarBackward.addEventListener('click', () => {
    if (progressBar.value > progressBar.min) {
      progressBar.value -= 1;
      updateProgressText();
    }
  });

  progressBarForward.addEventListener('click', () => {
    if (progressBar.value < progressBar.max) {
      progressBar.value += 1;
      updateProgressText();
    }
  });

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
});
