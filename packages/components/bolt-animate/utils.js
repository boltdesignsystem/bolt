/**
 * @param {Object} opt
 * @param {BoltAnimate[]} opt.animEls
 * @param {string} [opt.stage='IN']
 * @param {boolean} [opt.debug=false]
 *
 * @return {Promise<{ success: boolean, animEl: BoltAnimate }[]>}
 */
async function triggerAnimOnEls({ animEls, stage, debug = false }) {
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
          animEl.addEventListener(
            eventName,
            () => {
              resolve({
                success: true,
                animEl,
              });
            },
            {
              once: true,
            },
          );

          let triggered = false;
          switch (stage) {
            case 'IN':
              triggered = animEl.triggerAnimIn();
              break;
            case 'OUT':
              triggered = animEl.triggerAnimOut();
              break;
          }
          if (debug) {
            console.debug(`${eventName}`, animEl);
          }
          if (!triggered) {
            reject(
              new Error(
                `Attempted to trigger animation when there was no animation`,
              ),
            );
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
 * @param {BoltAnimate[]} opt.animEls
 * @param {string} [opt.stage='IN']
 * @param {boolean=} [opt.debug=false]
 */
export async function triggerAnims({ animEls, stage = 'IN', debug = false }) {
  let orderProp;
  let hasAnimProp;
  let eventName;
  switch (stage) {
    case 'IN':
      eventName = 'bolt-animate:end:in';
      orderProp = 'inOrder';
      hasAnimProp = 'hasAnimIn';
      break;
    case 'OUT':
      eventName = 'bolt-animate:end:out';
      orderProp = 'outOrder';
      hasAnimProp = 'hasAnimOut';
      break;
  }
  if (!orderProp) throw new Error(`Incorrect stage name passed: ${stage}`);

  const orders = new Set();
  animEls.forEach(animEl => {
    const order = animEl[orderProp] || 1;
    orders.add(order);
  });

  const animOrders = [...orders].sort((a, b) => a - b);

  for (const order of animOrders) {
    const animElsToTrigger = animEls
      .filter(a => a[hasAnimProp])
      .filter(a => a[orderProp] === order);
    if (debug) {
      console.debug(`${eventName}: order:${order}`, animElsToTrigger);
    }
    // eslint-disable-next-line no-await-in-loop
    await triggerAnimOnEls({
      animEls: animElsToTrigger,
      stage,
      debug,
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
  const animEls = Array.from(el.querySelectorAll('bolt-animate'));
  if (animEls.length === 0) {
    return false;
  }
  return triggerAnims({ animEls, stage });
}
