import { Component, h, render, unmountComponentAtNode } from "preact";

export default function BoltComponent(ComponentClass, CSSString) {
  class BoltComponentClass extends Component {
    setup(node) {
      if (!node) {
        console.warn(`BoltComponent failed to create shadow dom for ${ComponentClass.displayName || "component"}, because node was falsy.`);
        return;
      }

      this.shadow = node.createShadowRoot();
      this._component = render(<ComponentClass {...this.props} />, this.shadow);
      this.shadow.innerHTML += `<style>${CSSString}</style>`;
    }

    render() {
      return <div ref={this.setup.bind(this)} />;
    }
  }
  BoltComponentClass.displayName = `BoltComponent(${ComponentClass.displayName})`;

  return BoltComponentClass;
}
