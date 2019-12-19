// Returns the correct CSS transition property supported by the user's browser: https://davidwalsh.name/css-animation-callback

export function whichTransitionEvent() {
  var t;
  var el = document.createElement('fakeelement');
  var transitions = {
    transition: 'transitionend',
    OTransition: 'oTransitionEnd',
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd',
  };

  for (t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t];
    }
  }
}
