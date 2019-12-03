import '../bolt-select/bolt-select';
const boltSelect = document.querySelector('bolt-select');
let shouldOpenInNewWindow = false;

if (boltSelect) {
  const boltSelectTag = boltSelect.querySelector('select');

  // group together the latest vs previous Bolt releases
  if (boltSelectTag) {
    const currentVersionText = 'v' + window.bolt.data.fullManifest.version;

    const latestOption = document.createElement('optgroup');
    const prevOption = document.createElement('optgroup');

    latestOption.setAttribute('label', 'Latest Release');
    prevOption.setAttribute('label', 'Previous Releases');

    const selectOptions = Array.from(boltSelectTag.options);
    const originalSelectedIndex = boltSelectTag.selectedIndex;

    for (var i = 0; i < selectOptions.length; i++) {
      const selectOption = selectOptions[i];

      if (i === 0) {
        latestOption.appendChild(selectOption);
      } else {
        prevOption.appendChild(selectOption);
      }
    }

    boltSelectTag.appendChild(latestOption);
    boltSelectTag.appendChild(prevOption);

    boltSelectTag.selectedIndex = originalSelectedIndex;

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
  }
}

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
