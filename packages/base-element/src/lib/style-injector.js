// this is basically a slimmed down port of https://github.com/webpack-contrib/style-loader/blob/master/src/runtime/injectStylesIntoStyleTag.js with an added `getStyles` method to reuse the example same logic for web component inline styles vs <style> tag lazy-loaded styles

/* eslint-disable no-plusplus,no-param-reassign */
const stylesInDom = {};

const getTarget = (function getTarget() {
  const memo = {};

  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      let styleTarget = document.querySelector(target);

      // Special case to return head of iframe instead of iframe itself
      if (
        window.HTMLIFrameElement &&
        styleTarget instanceof window.HTMLIFrameElement
      ) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
})();

function insertStyleElement() {
  const style = document.createElement('style');
  const target = getTarget('head');

  if (!target) {
    throw new Error(
      "Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.",
    );
  }

  target.appendChild(style);

  return style;
}

function applyToTag(style, obj) {
  let { css } = obj;
  const { media } = obj;
  const { sourceMap } = obj;

  if (media) {
    style.setAttribute('media', media);
  }

  if (sourceMap && btoa) {
    css += `\n/*# sourceMappingURL=data:application/json;base64,${btoa(
      unescape(encodeURIComponent(JSON.stringify(sourceMap))),
    )} */`;
  }

  // For old IE
  /* istanbul ignore if  */
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  return style.parentNode.removeChild(style);
}

function addStyle(obj) {
  const style = insertStyleElement();

  const update = applyToTag.bind(null, style);
  const remove = () => {
    removeStyleElement(style);
  };

  update(obj);

  return function updateStyle(newObj) {
    if (newObj) {
      if (
        newObj.css === obj.css &&
        newObj.media === obj.media &&
        newObj.sourceMap === obj.sourceMap
      ) {
        return;
      }

      // eslint-disable-next-line no-param-reassign
      update((obj = newObj));
    } else {
      remove();
    }
  };
}

function listToStyles(list) {
  const styles = [];
  const newStyles = {};

  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    const id = item[0];
    const css = item[1];
    const media = item[2];
    const sourceMap = item[3];
    const part = { css, media, sourceMap };

    if (!newStyles[id]) {
      styles.push((newStyles[id] = { id, parts: [part] }));
    } else {
      newStyles[id].parts.push(part);
    }
  }
  return styles;
}

function addStylesToDom(styles) {
  for (let i = 0; i < styles.length; i++) {
    const item = styles[i];
    const domStyle = stylesInDom[item.id];
    let j = 0;

    if (domStyle) {
      domStyle.refs++;

      for (; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j]);
      }

      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]));
      }
    } else {
      const parts = [];

      for (; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]));
      }

      stylesInDom[item.id] = { id: item.id, refs: 1, parts };
    }
  }
}

export default function(list) {
  return {
    styles: listToStyles(list),
    getStyles() {
      return this.styles.map(style => style.parts[0].css);
    },

    // aliases to the existing use + update methods
    add() {
      this.use();
    },
    remove(newList) {
      this.update(newList);
    },
    use() {
      addStylesToDom(this.styles);
    },
    update(newList) {
      const mayRemove = [];

      for (let i = 0; i < this.styles.length; i++) {
        const item = this.styles[i];
        const domStyle = stylesInDom[item.id];

        if (domStyle) {
          domStyle.refs--;
          mayRemove.push(domStyle);
        }
      }

      if (newList) {
        const newStyles = listToStyles(newList);

        addStylesToDom(newStyles);
      }

      for (let i = 0; i < mayRemove.length; i++) {
        const domStyle = mayRemove[i];

        if (domStyle.refs === 0) {
          for (let j = 0; j < domStyle.parts.length; j++) {
            domStyle.parts[j]();
          }

          delete stylesInDom[domStyle.id];
        }
      }
    },
  };
}
