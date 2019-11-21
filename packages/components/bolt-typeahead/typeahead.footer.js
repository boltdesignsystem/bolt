import { Component } from 'preact';
import { render } from '@bolt/core/renderers/renderer-lit-html';
import { shallowEqualArrays } from 'shallow-equal';
import { h, withPreact, Fragment } from '@bolt/core/renderers';

// @todo: abstract this out and move into standalone / reusable wrapper component for using lit-based WCs in Preact without the diffing headaches!
export class TypeaheadFooter extends Component {
  shouldComponentUpdate() {
    return false; // don't re-render via diff:
  }

  // if the parent component's props change, only re-render if the template values themselves have changed
  componentWillReceiveProps(nextProps) {
    if (
      !shallowEqualArrays(this.props.template.values, nextProps.template.values)
    ) {
      this.shouldRerender = true;
      this.componentDidMount();
    } else if (this.shouldRerender === true) {
      this.shouldRerender = false;
      this.componentDidMount();
    } else {
      this.shouldRerender === false;
    }
  }

  componentDidMount() {
    render(this.props.template, this.ref);
  }

  componentWillUnmount() {
    // component is about to be removed from the DOM, perform any cleanup.
  }

  render() {
    return (
      <div
        // eslint-disable-next-line no-return-assign
        ref={c => (this.ref = c)}
        className={this.props.className}
      />
    );
  }
}
