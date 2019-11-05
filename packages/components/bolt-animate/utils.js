/**
 * @param {Object} opt
 * @param {BoltAnimate[]} opt.animEls an array of `bolt-animate`s on which to trigger animations
 * @param {string} [opt.stage='IN'] which stage to trigger
 * @param {boolean} [opt.debug=false] print debug info to console
 * @param {number|null} [opt.durationOverride] override the duration for all els
 *
 * @return {Promise<{ success: boolean, animEl: BoltAnimate }[]>}
 */
async function triggerAnimOnEls({
  animEls,
  stage,
  debug = false,
  durationOverride = null,
}) {
  let eventName = '';
  switch (stage) {
    case 'IN':
      eventName = 'bolt-animate:end:in';
      break;
    case 'OUT':
      eventName = 'bolt-animate:end:out';
      break;
  }
  if (!stage) {
    throw new Error(`Incorrect stage name passed in ${stage}`);
  }
  return Promise.all(
    animEls.map(
      animEl =>
        new Promise((resolve, reject) => {
          let timeoutId;
          let triggered = false;
          let duration = 0;

          function handleEvent() {
            if (timeoutId) clearTimeout(timeoutId);
            resolve({
              success: true,
              animEl,
            });
          }

          animEl.addEventListener(eventName, handleEvent, {
            once: true,
          });

          switch (stage) {
            case 'IN':
              triggered = animEl.triggerAnimIn();
              duration =
                durationOverride === null
                  ? animEl.inDuration
                  : durationOverride;
              break;
            case 'OUT':
              triggered = animEl.triggerAnimOut();
              duration =
                durationOverride === null
                  ? animEl.outDuration
                  : durationOverride;
              break;
          }

          if (debug) {
            console.debug(`${eventName}`, animEl);
          }

          if (typeof duration === 'number') {
            timeoutId = setTimeout(() => {
              console.warn(
                `animation taking too long for stage "${stage}", cancelling and moving on to next one.`,
                animEl,
              );
              animEl.removeEventListener(eventName, handleEvent);
              resolve({
                success: false,
                animEl,
              });
            }, duration + 250);
          } else {
            console.warn(
              `Uh oh, animation duration retrieved was not a number: ${duration}`,
              animEl,
            );
          }

          if (!triggered) {
            animEl.removeEventListener(eventName, handleEvent);
            if (timeoutId) clearTimeout(timeoutId);
            resolve({
              success: true,
              animEl,
            });
          }
        }),
    ),
  )
    .then(results => {
      return results;
    })
    .catch(console.log.bind(console));
}

/**
 * @param {Object} opt
 * @param {BoltAnimate[] | NodeListOf<BoltAnimate>} opt.animEls `bolt-animate`s on which to trigger animations
 * @param {string} [opt.stage='IN'] which stage to trigger
 * @param {boolean} [opt.debug=false] print debug info to console
 * @param {number|null} [opt.durationOverride] override the duration for all els
 */
export async function triggerAnims({ animEls, stage = 'IN', debug = false, durationOverride = null }) {
  let orderProp;
  let eventName;
  switch (stage) {
    case 'IN':
      eventName = 'bolt-animate:end:in';
      orderProp = 'inOrder';
      break;
    case 'OUT':
      eventName = 'bolt-animate:end:out';
      orderProp = 'outOrder';
      break;
  }
  if (!orderProp) throw new Error(`Incorrect stage name passed: ${stage}`);

  // Convert NodeList over to array in case `querySelectorAll` was used
  animEls = Array.isArray(animEls)
    ? animEls
    : Array.prototype.slice.call(animEls);

  // If we receive 0 elements, then we've successfully animated all of them.
  if (!animEls.length) {
    return true;
  }

  const orders = [];

  animEls.forEach(animEl => {
    animEl[orderProp] = animEl[orderProp] || 1;
    const order = animEl[orderProp];
    if (!orders.includes(order)) {
      orders.push(order);
    }
  });

  const animOrders = orders.sort((a, b) => a - b);
  for (const order of animOrders) {
    // Trigger the animations in order
    const animElsToTrigger = animEls.filter(a => a[orderProp] === order);
    if (debug) {
      console.debug(`${eventName}: order:${order}`, animElsToTrigger);
    }
    // eslint-disable-next-line no-await-in-loop
    await triggerAnimOnEls({
      animEls: animElsToTrigger,
      stage,
      debug,
      durationOverride,
    });
  }

  return true;
}

/**
 * Trigger `<bolt-animate>` animations found within Element
 * @param {Element} el
 * @param {string} [stage='IN'] must be either 'IN' or 'OUT'
 * @return {Promise<boolean>}
 */
export async function triggerAnimsInEl(el, stage = 'IN') {
  if (!el.querySelectorAll) {
    console.error(el);
    throw new Error(
      `When running "triggerAnimsInEl", the passed element does not have "querySelectorAll" method.`,
    );
  }
  const animEls = Array.prototype.slice.call(
    el.querySelectorAll('bolt-animate'),
  );
  if (animEls.length === 0) {
    return false;
  }
  return triggerAnims({ animEls, stage });
}
