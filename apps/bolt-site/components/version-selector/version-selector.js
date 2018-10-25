import '../bolt-select/bolt-select';

const boltSelect = document.querySelector('bolt-select');

boltSelect.addEventListener('choice', function(e) {
  var url = e.detail.choice.value;
  if (url && window.location.href !== url) {
    window.location = url; // redirect
  }
});
