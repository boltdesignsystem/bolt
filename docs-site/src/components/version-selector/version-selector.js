import '../bolt-select/bolt-select';

const boltSelect = document.querySelector('bolt-select');
const boltSelectTag = boltSelect.querySelector('select');
const currentVersionText = 'v' + window.bolt.data.fullManifest.version;

const latestOption = document.createElement('optgroup');
latestOption.setAttribute('label', 'Latest Release');
latestOption.appendChild(boltSelectTag.options[0]);

const prevOption = document.createElement('optgroup');
prevOption.setAttribute('label', 'Previous Releases');
for (var i = 0; i < boltSelectTag.options.length; i++) {
  prevOption.appendChild(boltSelectTag.options[i]);
}

boltSelectTag.querySelectorAll('option').forEach(option => option.remove());

boltSelectTag.appendChild(latestOption);
boltSelectTag.appendChild(prevOption);

if (
  boltSelectTag.selectedIndex === 0 &&
  boltSelectTag.options[0].text !== currentVersionText
) {
  for (var i = 0; i < boltSelectTag.options.length; i++) {
    if (boltSelectTag.options[i].text === currentVersionText) {
      boltSelectTag.selectedIndex = i;
      break;
    }
  }
}

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
        window.open(url, '_blank');
      } else {
        window.location = url;
      }
    }
  });
}
