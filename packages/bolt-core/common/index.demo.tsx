import { Component, h } from 'skatejs';
import { customElement, shadyCssStyles } from './decorators';

@customElement( 'bl-common-demo' )
@shadyCssStyles()
export class Demo extends Component<void> {

  get css() {
    return ``;
  }
  renderCallback() {
    return [
      // @TODO add here some content baby :D
      <div />
    ];
  }
}
