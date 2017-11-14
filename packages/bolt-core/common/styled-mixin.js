// import { withComponent } from 'skatejs';
// import { h } from 'preact';
// // import withRenderer from '@skatejs/renderer-preact';

// // import { ColorType } from './colorTypes';
// import { IS_DEV } from './environment';
// // import { Constructable } from './static-definitions/types';
// import { scopeCss } from './utils';

// const Component = withComponent();


// function mixin(behaviour, sharedBehaviour = {}) {
//   const instanceKeys = Reflect.ownKeys(behaviour);
//   const sharedKeys = Reflect.ownKeys(sharedBehaviour);
//   const typeTag = Symbol('isa');

//   function _mixin(clazz) {
//     for (let property of instanceKeys)
//       Object.defineProperty(clazz.prototype, property, {
//         value: behaviour[property],
//         writable: true
//       });
//     Object.defineProperty(clazz.prototype, typeTag, { value: true });
//     return clazz;
//   }
//   for (let property of sharedKeys)
//     Object.defineProperty(_mixin, property, {
//       value: sharedBehaviour[property],
//       enumerable: sharedBehaviour.propertyIsEnumerable(property)
//     });
//   Object.defineProperty(_mixin, Symbol.hasInstance, {
//     value: (i) => !!i[typeTag]
//   });
//   return _mixin;
// }




// // @BookCollector
// // class Person {
// //   constructor(first, last) {
// //     this.rename(first, last);
// //   }
// //   fullName() {
// //     return this.firstName + " " + this.lastName;
// //   }
// //   rename(first, last) {
// //     this.firstName = first;
// //     this.lastName = last;
// //     return this;
// //   }
// // };

// // const president = new Person('Barak', 'Obama');

// // president
// //   .addToCollection("JavaScript Allongé")
// //   .addToCollection("Kestrels, Quirky Birds, and Hopeless Egocentricity");

// // president.collection()

// // console.log(president);


// // const Component = withComponent(withRenderer());


// // export const shadyCssStyles = mixin({
// //   shadyCss(css){
// //     if (IS_DEV && !('css' in this)) {
// //       throw new Error(`you have to implement 'css' property when using '@shadyCssStyles' Class Decorator!`);
// //     }
// //     return scopeCss(this, this.css);
// //   },
// //   // collection() {
// //   //   return this._collected_books || (this._collected_books = []);
// //   // }
// //   renderCallback(...args) {
// //     return [h('style', this.shadyCss)].concat(originalRenderCallback.apply(this, args));
// //   }
// //   // value(this: { shadyCss: string }, ...args: any[]) {
// //   // tslint:disable-next-line:no-invalid-this
// //   // return [h('style', this.shadyCss)].concat(originalRenderCallback.apply(this, args));
// //   // }

// // });




// // export function shadyCssStyles() {
// //   return function Component( Target ) {
// //     const proto = Target.prototype;
// //     const originalRenderCallback = this.prototype.renderCallback;

// //     Object.defineProperties( proto, {
// //       shadyCss(css) {
// //         if (IS_DEV && !('css' in this)) {
// //           throw new Error(`you have to implement 'css' property when using '@shadyCssStyles' Class Decorator!`);
// //         }
// //         return scopeCss(this, this.css);
// //       },
// //       renderCallback(...args) {
// //         return [h('style', this.shadyCss)].concat(originalRenderCallback.apply(this, args));
// //       }
// //     } );

// //     return Target;
// //   };
// // }



// export function shadyCssStyles() {
//   return function (Target) {

//     console.log(Target);
//     var proto = Target.prototype;
//     var originalRenderCallback = proto.renderCallback;
//     Object.defineProperties(proto, {
//       shadyCss: {
//         get: function () {
//           // tslint:disable-next-line:no-invalid-this
//           if (IS_DEV && !('css' in this)) {
//             throw new Error("you have to implement 'css' property when using '@shadyCssStyles' Class Decorator!");
//           }
//           // tslint:disable-next-line:no-invalid-this
//           return scopeCss(this, this.css);
//         }
//       },
//       renderCallback: {
//         value(...args) {
//           console.log('render callback');
//           // tslint:disable-next-line:no-invalid-this
//           return [h('style', this.shadyCss)].concat(originalRenderCallback.apply(this, args));
//         }
//       }


//       // renderCallback: {
//       //   value: function () {
//       //     var args = [];
//       //     for (var _i = 0; _i < arguments.length; _i++) {
//       //       args[_i] = arguments[_i];
//       //     }
//       //     // tslint:disable-next-line:no-invalid-this
//       //     return [h('style', this.shadyCss)].concat(originalRenderCallback.apply(this, args));
//       //   }
//       // }
//     });
//     return Target;
//   };
// }





// // export function shadyCssStyles() {
// //   return function <T extends Constructable<Component<any>>>( Target: T ) {
// //     const proto = Target.prototype;
// //     const originalRenderCallback = this.prototype.renderCallback;

// //     Object.defineProperties( proto, {
// //       shadyCss: {
// //         get( this: { css: string } ) {
// //           // tslint:disable-next-line:no-invalid-this
// //           if ( IS_DEV && !( 'css' in this ) ) {
// //             throw new Error( `you have to implement 'css' property when using '@shadyCssStyles' Class Decorator!` );
// //           }

// //           // tslint:disable-next-line:no-invalid-this
// //           return scopeCss( this as any, this.css );
// //         }
// //       },
// //       renderCallback: {
// //         value( this: { shadyCss: string }, ...args: any[] ) {
// //           // tslint:disable-next-line:no-invalid-this
// //           return [ h( 'style', this.shadyCss ) ].concat( originalRenderCallback.apply( this, args ) );
// //         }
// //       }
// //     } );

// //     return Target;
// //   };
// // }


const { nativeShadow } = ShadyCSS;
const $template = Symbol();

/**
 * Generate a scoped style element for the given element
 *
 * @see https://github.com/skatejs/skatejs/issues/1027#issuecomment-277382741
 * @private
 * @param {Component} elem the element to generate a style for
 * @param {string} css the stylesheet to scope
 * @return {HTMLElement} the style elememnt to add to the component
 */
function style(elem, css) {
  if (nativeShadow) {
    const styleElement = document.createElement('style');
    const styleContent = document.createTextNode(css);

    styleElement.appendChild(styleContent);

    return styleElement;
  } else {
    const template = elem[$template] || (elem[$template] = document.createElement('template'));

    template.innerHTML = `<style>${css}</style>`;
    ShadyCSS.prepareTemplate(template, elem.localName);

    return template;
  }
}

/**
 * Mixin to add automatic styling to a Skatejs component
 *
 * @param {skatejs~Component} superclass the superclass to add features to
 * @returns {skatejs~Component} the new class, with added features
 */
export default function StyledMixin(superclass) {
  return class extends superclass {
    /**
    * By setting the `styleSheet` attribute on a class, a new custom
    * element can be created that will automatically have the styles
    * injected into the component.
    *
    * In browsers that have native support for the ShadowDOM, the
    * stylesheet will be added such that the styles are all scoped to
    * that custom element.
    *
    * In browsers that do not have native support for the ShadowDOM,
    * ShadyCSS will be used to scope the styles to the element. Note
    * that ShadyCSS can only scope `:host` and class definitions, so
    * styles should only be defined that use those techniques.
    *
    * @property {string} styleSheet the stylesheet for this element
    * @abstract
    */
    static styleSheet = ''

    /**
    * Adds a `<style>` tag to the custom element's shadow DOM
    *
    * @return
    */
    renderedCallback() {
      super.renderedCallback();

      const styleElement = style(this, this.constructor.styleSheet);
      this.shadowRoot.appendChild(styleElement);
    }
  };
}