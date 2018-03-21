import ClipboardJS from 'clipboard';

let theClipRef = document.querySelector('.c-bolt-copy-to-clipboard__default .c-bolt-link');
let theClipCopied = document.querySelector('.c-bolt-copy-to-clipboard__copied .c-bolt-link');

if (theClipRef !== null) {
  theClipRef.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default link behavior

    let clip = new ClipboardJS('.c-bolt-copy-to-clipboard__default .c-bolt-link');

    /**
     * [1] Adds a class onClick after successful copy and enables the first set of animations
     * [2] Waits until the first set of animations complete and adds the last class for last animations
     **/
    clip.on("success", function() {
      document.querySelector('.js-bolt-copy-to-clipboard').classList.add('copied'); // [1]
      setTimeout(function(){ // [2]
         document.querySelector('.js-bolt-copy-to-clipboard').classList.add('transitioning');
      }, 2000);
    });
  }, false);
}

// We don't want the other link clickable either
if (theClipCopied !== null) {
  theClipCopied.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default link behavior
  }, false);
}