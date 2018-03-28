import ClipboardJS from 'clipboard';

const theClipRef = document.querySelectorAll('.js-bolt-copy-to-clipboard__default .c-bolt-link');
const theClipCopied = document.querySelectorAll('.js-bolt-copy-to-clipboard__copied .c-bolt-link');

if (theClipRef.length > 0) {
  theClipRef.forEach((ref) => {
    ref.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent the default link behavior
    }, false);

    const clip = new ClipboardJS(ref); // ClipboardJS adds it's own event listener

    /*
     * [1] Adds a class onClick after successful copy and enables the first set of animations
     * [2] Waits until the first set of animations complete and adds the last class for last animations
     */
    clip.on('success', () => {
      ref.parentElement.parentElement.classList.add('is-copied'); // [1]
      setTimeout(() => { // [2]
        ref.parentElement.parentElement.classList.add('is-transitioning');
      }, 2000);
    });
  });
}

// We don't want the other link clickable either
if (theClipCopied.length > 0) {
  theClipCopied.forEach((ref) => {
    ref.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent the default link behavior
    }, false);
  });
}
