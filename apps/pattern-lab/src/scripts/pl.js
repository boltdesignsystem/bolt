import 'core-js/modules/es6.string.starts-with';

// here if you need pl only JS
document.addEventListener('DOMContentLoaded', () => {
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

  /**
   * Make sure all external facing links open in a new tab in PL.
   * Important as external links can behave strangely within the iframe setup of PL.
   */
  const docsSiteLinks = document.querySelectorAll('a');
  for (var i = 0, len = docsSiteLinks.length; i < len; i++) {
    const linkElem = docsSiteLinks[i];
    const href = linkElem.getAttribute('href');
    if (href) {
      if (href.startsWith('http')) {
        linkElem.setAttribute('target', '_blank');
      }
    }
  }
});
