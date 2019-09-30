// TODO: limit to a .js class
const inputs = document.querySelectorAll('.c-bolt-input');

for (let i = 0, len = inputs.length; i < len; i++) {
  const input = inputs[i];

  // Check if the field has pre-filled text from the server side
  if (input.value) {
    input.classList.add('is-filled');
  }

  input.onchange = function() {
    if (input.value) {
      input.classList.add('is-filled');
    } else {
      input.classList.remove('is-filled');
    }
  };

  input.onfocus = function() {
    input.classList.remove('is-touched');

    // In there were server-side errors, the 'is-invalid' class will be present
    // but should be removed on focus because the user is trying to fix them.
    input.classList.remove('is-invalid');

    if (input.errors) {
      input.errors.remove();
    }
  };

  input.onblur = function(e) {
    if (!e.isTrusted) {
      // This blur event was triggered by a script, not a human, so don't mark
      // the input as is-touched (because it actually wasn't) or show errors.

      // Note that Mozilla claims that isTrusted shouldn't work in IE, but
      // based on testing, it does.
      // https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted
      return;
    }

    input.showErrors();
  };

  // A custom event listener that allows other scripts to manually show errors.
  input.addEventListener(
    'showerrors',
    function() {
      input.showErrors();
    },
    false,
  );

  // Callback function to display validation errors for a given input.
  input.showErrors = function() {
    input.classList.add('is-touched');

    // Clear existing errors.
    if (input.errors) {
      input.errors.remove();
    }

    if (input.validationMessage) {
      let error = document.createElement('div');
      let messageText = document.createTextNode(input.validationMessage);
      error.classList.add('c-bolt-input-message');
      error.classList.add('c-bolt-input-message--invalid');
      error.appendChild(messageText);

      input.errors = input.insertAdjacentElement('afterend', error);
    }
  };
}

const customInputWrappers = document.querySelectorAll('.c-bolt-custom-input');

for (let i = 0, len = customInputWrappers.length; i < len; i++) {
  const wrapper = customInputWrappers[i];
  const input = wrapper.querySelector('.c-bolt-input');

  input.onfocus = function() {
    wrapper.classList.add('is-active');
  };

  input.onblur = function() {
    wrapper.classList.remove('is-active');
  };
}
