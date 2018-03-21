import ClipboardJS from 'clipboard';

let theClipRef = document.querySelector('.c-bolt-copy-to-clipboard__default .c-bolt-link');
let theClipCopied = document.querySelector('.c-bolt-copy-to-clipboard__copied .c-bolt-link');

if (theClipRef !== null) {
  // Prevent the default link behavior
  theClipRef.addEventListener("click", function(event) {
    event.preventDefault();

    let clip = new ClipboardJS('.c-bolt-copy-to-clipboard__default .c-bolt-link');

    clip.on("success", function() {
      document.querySelector('.js-bolt-copy-to-clipboard').classList.add('copied');
      setTimeout(function(){
         document.querySelector('.js-bolt-copy-to-clipboard').classList.add('transitioning');
      }, 2000);
    });
  }, false);
}

// We don't want the other link clickable
if (theClipCopied !== null) {
  // Prevent the default link behavior
  theClipCopied.addEventListener("click", function(event) {
    event.preventDefault();
  }, false);
}