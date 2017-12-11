/* eslint func-names: ["error", "never"] */

// Heavily inspired by https://css-tricks.com/managing-state-css-reusable-javascript-functions-part-2/

// CLOSEST PARENT HELPER FUNCTION
// ----------------------------------------------

export function closestParent(child, match) {
  if (!child || child === document) return null;
  if (child.classList.contains(match) || child.nodeName.toLowerCase() === match) return child;
  return closestParent(child.parentNode, match);
};

// REUSABLE FUNCTION
// ----------------------------------------------

// Change function
export function eventHandler(elem) {

  console.log('bolt eventHandler!');

  let dataState;
  let dataStateBehaviour;
  let dataStateScope;
  let dataStateElement;

  // Grab data-state list and convert to array
  dataState = elem.getAttribute(`data-state`);
  dataState = dataState.split(`, `);

  // Grab data-state-behaviour list if present and convert to array
  if (elem.getAttribute(`data-state-behaviour`)) {
    dataStateBehaviour = elem.getAttribute(`data-state-behaviour`);
    dataStateBehaviour = dataStateBehaviour.split(`, `);
  }

  // Grab data-scope list if present and convert to array
  if (elem.getAttribute(`data-state-scope`)) {
    dataStateScope = elem.getAttribute(`data-state-scope`);
    dataStateScope = dataStateScope.split(`, `);
  }

  // Grab data-state-element list and convert to array
  // If data-state-element isn't found, pass self, set scope to self if none is present, essentially replicating "this"
  if (elem.getAttribute(`data-state-element`)) {
    dataStateElement = elem.getAttribute(`data-state-element`);
    dataStateElement = dataStateElement.split(`, `);
  } else {
    dataStateElement = [];
    dataStateElement.push(elem.classList[0]);
    if (!dataStateScope) {
      dataStateScope = dataStateElement;
    }
  }

  // Find out which has the biggest length between states and elements and use that length as loop number
  /** This is to make sure situations where we have one data-state-element value and many data-state values 
   * are correctly setup
   */
  const dataLength = Math.max(dataStateElement.length, dataState.length);

  // Loop
  for (let b = 0; b < dataLength; b++) {
    let dataStateElementValue;
    let cachedScope;
    let elemRef;
    let elemState;
    let elemBehaviour;
    
    // If a data-state-element value isn't found, use last valid one
    if (dataStateElement[b] !== undefined) {
      dataStateElementValue = dataStateElement[b];
    }
    
    // If scope isn't found, use last valid one
    if (dataStateScope && dataStateScope[b] !== undefined) {
      cachedScope = dataStateScope[b];
    } else if (cachedScope) {
      dataStateScope[b] = cachedScope;
    }

    // Grab elem references, apply scope if found
    if (dataStateScope && dataStateScope[b] !== `false`) {
      // Grab parent
      const elemParent = closestParent(elem, dataStateScope[b]);

      // Grab all matching child elements of parent
      elemRef = elemParent.querySelectorAll(`.${dataStateElementValue}`);

      // Convert to array
      elemRef = Array.prototype.slice.call(elemRef);

      // Add parent if it matches the data-state-element and fits within scope
      if (elemParent.classList.contains(dataStateElementValue)) {
        elemRef.unshift(elemParent);
      }
    } else {
      elemRef = document.querySelectorAll(`.${dataStateElementValue}`);
    }

    // Grab state we will add
    // If one isn't found, keep last valid one
    if (dataState[b] !== undefined) {
      elemState = dataState[b];
    }

    // Grab behaviour if any exists
    // If one isn't found, keep last valid one
    if (dataStateBehaviour && dataStateBehaviour[b] !== undefined) {
      elemBehaviour = dataStateBehaviour[b];
    }

    // Do
    for (let c = 0; c < elemRef.length; c++) {
      // Find out if we're manipulating aria-attributes or classes
      let toggleAttr;
      if (elemRef[c].getAttribute(elemState)) {
        toggleAttr = true;
      } else {
        toggleAttr = false;
      }

      if (elemBehaviour === `add`) {
        if (toggleAttr) {
          elemRef[c].setAttribute(elemState, true);
        } else {
          elemRef[c].classList.add(elemState);
        }
      } else if (elemBehaviour === `remove`) {
        if (toggleAttr) {
          elemRef[c].setAttribute(elemState, false);
        } else {
          elemRef[c].classList.remove(elemState);
        }
      } else if (toggleAttr) {
        if (elemRef[c].getAttribute(elemState) === `true`) {
          elemRef[c].setAttribute(elemState, false);
        } else {
          elemRef[c].setAttribute(elemState, true);
        }
      } else {
        elemRef[c].classList.toggle(elemState);
      }
    }
  }
}

// Init function
export function initDataState(elem) {
  // Detect data-swipe attribute before we do anything, as it's optional
  // if (elem.getAttribute(`data-state-swipe`)) {
  //   // Grab swipe specific data from data-state-swipe
  //   let elemSwipe = elem.getAttribute(`data-state-swipe`).split(`, `);
  //   let direction = elemSwipe[0];
  //   let elemSwipeBool = elemSwipe[1];
  //   let currentElem = elem;

  //   // If the behaviour flag is set to "false", or not set at all, then assign our click event
  //   if (elemSwipeBool === `false` || !elemSwipeBool) {
  //     // Assign click event
  //     elem.addEventListener(`click`, function (e) {
  //       // Prevent default action of element
  //       e.preventDefault();
  //       // Run state function
  //       processChange(this);
  //     });
  //   }
  //   // Use our swipeDetect helper function to determine if the swipe direction matches our desired direction
  //   swipeDetect(elem, (swipedir) => {
  //     // Run state function
  //     if (swipedir === direction) processChange(currentElem);
  //   });
  // } else {
  // Assign click event
  elem.addEventListener(`click`, function (e) {
    // Prevent default action of element
    e.preventDefault();
    // Run state function
    eventHandler(this);
  });
  // }
  // Add keyboard event for enter key or space to mimic anchor functionality
  elem.addEventListener(`keypress`, function (e) {
    if (e.which !== 13 && e.which !== 32) return;
    // Prevent default action of element
    e.preventDefault();
    // Run state function
    eventHandler(this);
  });
}

// Run when DOM has finished loading
// document.addEventListener(`DOMContentLoaded`, () => {
//   // Grab all elements with required attributes
//   const elems = document.querySelectorAll(`[data-state]`);

//   // Loop through our matches and add click events
//   for (let a = 0; a < elems.length; a++) initDataState(elems[a]);

//   // Setup mutation observer to track changes for matching elements added after initial DOM render
//   const observer = new MutationObserver(((mutations) => {
//     mutations.forEach((mutation) => {
//       for (let d = 0; d < mutation.addedNodes.length; d++) {
//         // Check if we're dealing with an element node
//         if (typeof mutation.addedNodes[d].getAttribute === `function` && mutation.addedNodes[d].getAttribute(`data-state`)) {
//           initDataState(mutation.addedNodes[d]);
//         }
//       }
//     });
//   }));

//   // Define type of change our observer will watch out for
//   observer.observe(document.body, {
//     childList: true,
//     subtree: true,
//   });
// });
// }());





// SWIPE DETECT HELPER
// ----------------------------------------------

// http://www.javascriptkit.com/javatutors/touchevents2.shtml
// const swipeDetect = function (el, callback) {
//   const touchsurface = el;
//   let swipedir;
//   let startX;
//   let startY;
//   let distX;
//   let distY;
//   const threshold = 100; // required min distance traveled to be considered swipe
//   const restraint = 100; // maximum distance allowed at the same time in perpendicular direction
//   const allowedTime = 300; // maximum time allowed to travel that distance
//   let elapsedTime;
//   let startTime;
//   let eventObj;
//   const handleswipe = callback || function (swipedir, eventObj) {};

//   touchsurface.addEventListener(`touchstart`, (e) => {
//     const touchobj = e.changedTouches[0];
//     swipedir = `none`;
//     startX = touchobj.pageX;
//     startY = touchobj.pageY;
//     startTime = Date.now(); // record time when finger first makes contact with surface
//     eventObj = e;
//   }, false);

//   touchsurface.addEventListener(`touchend`, (e) => {
//     const touchobj = e.changedTouches[0];
//     distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
//     distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface
//     elapsedTime = Date.now() - startTime; // get time elapsed

//     if (elapsedTime <= allowedTime) {
//       // first condition for awipe met
//       if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
//         // 2nd condition for horizontal swipe met
//         swipedir = distX < 0 ? `left` : `right`; // if dist traveled is negative, it indicates left swipe
//       } else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) {
//         // 2nd condition for vertical swipe met
//         swipedir = distY < 0 ? `up` : `down`; // if dist traveled is negative, it indicates up swipe
//       }
//     }

//     handleswipe(swipedir, eventObj);
//   }, false);
// };
