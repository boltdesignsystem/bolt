var versionSelector = document.querySelector('.js-bolt-version-selector');

if (window.location.hostname === 'localhost') {
  var option = document.createElement('option');
  option.text = 'Local';
  option.value = window.location.href;
  versionSelector.add(option, 0);

  versionSelector.value = window.location.href;
}

versionSelector.addEventListener('change', function() {
  var url = versionSelector.value;
  if (url && window.location.href !== url) {
    window.location = url; // redirect
  }
  return false;
});
