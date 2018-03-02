// here if you need pl only JS

/**
 * Docs Edit README Link > Simple edit hover effect
 */
const editLink = document.getElementsByClassName('c-bolt-docs__page-nav__link');
const editWrap = document.getElementsByClassName('c-bolt-docs__lead');

function toggleEditOn() {
  editWrap[0].classList.add('edit-this-readme');
}
function toggleEditOff() {
  editWrap[0].classList.remove('edit-this-readme');
}


if (editLink[0]) {
  editLink[0].addEventListener('mouseover', toggleEditOn, false);
}

if (editWrap[0]) {
  editLink[0].addEventListener('mouseout', toggleEditOff, false);
}
