// TODO: limit to a .js class
const inputs = document.querySelectorAll('.c-bolt-input');
inputs.forEach(input => {
  input.onfocus = function() {
    this.classList.add('is-touched');
  };

  input.onblur = function() {
    if (this.value) {
      this.classList.add('is-filled');
    } else {
      this.classList.remove('is-filled');
    }
  };

  // TODO: display validation message (input.validationMessage) below a form
  // item when it becomes invalid.
  // See https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Form_validation
});
