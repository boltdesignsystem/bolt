// here if you need pl only JS

/**
 * Docs Edit README Link > Simple edit hover effect
 */
var editLink = document.getElementsByClassName('c-bolt-docs__page-nav__link');
var editWrap = document.getElementsByClassName('c-bolt-docs__lead');

editLink[0].addEventListener("mouseover", toggleEditOn, false);
editLink[0].addEventListener("mouseout", toggleEditOff, false);

function toggleEditOn() {
    editWrap[0].classList.add('edit-this-readme');
}
function toggleEditOff() {
    editWrap[0].classList.remove('edit-this-readme');
}