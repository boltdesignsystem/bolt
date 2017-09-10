import { customElement } from '@bolt/ui-core';
import { Component, h } from 'skatejs';
import { Band } from './index';


@customElement( 'bolt-band-demo' )
// @shadyCssStyles()

export class Demo extends Component<void> {

  renderCallback() {
    return [
      <fieldset>
        <Band
          size="small">
          Small Band
        </Band>

        <Band
          size="medium">
          Medium Band
        </Band>

        <Band size="large">
          Large Band
        </Band>
      </fieldset>
    ];
  }
}
