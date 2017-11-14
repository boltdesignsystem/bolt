import { Component, h, render } from "preact";

const Noop = () => null;

export default function ShadowDOM(ComponentClass, CSSString) {
  class ShadowDOMComponentClass extends Component {
    setup(node) {
      if (!node) {
        console.warn(`ShadowDOM failed to create shadow dom for ${ComponentClass.displayName || "component"}, because node was falsy.`);
        return;
      }

      this.shadow = node.createShadowRoot();
      this.shadow.innerHTML = `<style>${CSSString}</style>`;
      this._component = render(<ComponentClass {...this.props} />, this.shadow, this._component);
    }

    componentWillUnmount() {
      render(<Noop />, this.shadow, this._component);
    }

    render() {
      return <div ref={this.setup.bind(this)} />;
    }
  }
  ShadowDOMComponentClass.displayName = `ShadowDOM(${ComponentClass.displayName})`;

  return ShadowDOMComponentClass;
}
