import '../bolt-select/bolt-select.standalone';
const boltSelect = document.querySelector('.js-bolt-version-selector');
let shouldOpenInNewWindow = false;

if (boltSelect) {
  boltSelect.addEventListener('mousedown', function(e) {
    if (e.metaKey === true) {
      shouldOpenInNewWindow = true;
    } else {
      shouldOpenInNewWindow = false;
    }
  });

  boltSelect.addEventListener('choice', function(e) {
    var url = e.detail.choice.value;
    if (url && window.location.href !== url) {
      // open Bolt version selected in a new tab (vs same tab) if the CMD / meta key is held
      if (shouldOpenInNewWindow) {
        window.open(url, '_blank', 'noopener');
      } else {
        window.location = url;
      }
    }
  });
}
