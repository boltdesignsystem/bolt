// Example taken from recent SkateJS 5.0.0-beta.4 site example

import { html } from 'lit-html/lib/lit-extended';
import { define, props, withComponent } from 'skatejs/dist/esnext';
import withLitHtml from '@skatejs/renderer-lit-html/dist/node';
import { value } from 'yocss';

// export const Component = class extends withComponent(withLitHtml()) {
//   $ = html;
//   get $style() {
//     return style(this.context.style, value(...Object.values(this.css || {})));
//   }
// };

export function style(...css) {
  return html`<style textContent="${css.join('')}"></style>`;
}

export const withLoadable = (props: Object) =>
  define(
    class extends Component {
      static is = props.is;
      props: {
        format: any,
        loader: any,
        loading: any,
        useShadowRoot: boolean
      };
      props = props;
      get renderRoot() {
        return props.useShadowRoot ? super.renderRoot : this;
      }
      connecting() {
        const loaded = this.loading;
        if (loaded) {
          this.state = { loaded };
        }
        if (this.loader) {
          this.loader().then(r => {
            const loaded = r.default || r;
            if (loaded) {
              this.state = { loaded };
            }
          });
        }
      }
      render() {
        const { loaded } = this.state;
        return this.$`${typeof loaded === 'function' ? new loaded() : loaded}`;
      }
    }
  );