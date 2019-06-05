import qs from 'querystring';
import { define, props, defineContext, withContext } from '@bolt/core/utils';
import { prepSchema } from './utils';
import isEqual from 'react-fast-compare';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';
import { styleMap } from 'lit-html/directives/style-map.js';
import { guard } from 'lit-html/directives/guard';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

// define which specific props to provide to children that subscribe
export const ComponentExplorerContext = defineContext({
  schema: '',
  formData: '',
  template: '',
  initialLayout: '',
});

import styles from './component-explorer.scss';
import globalStyles from '@bolt/global/styles/index.scss';

@define
export default class ComponentExplorer extends withContext(withLitHtml()) {
  static is = 'bolt-component-explorer';

  static props = {
    schemaUuid: props.string,
    schema: props.object,
    formData: props.object,
    template: props.string,
    initialLayout: props.any, //PropTypes.oneOf(['vertical', 'horizontal']),
  };

  // provide context info to children that subscribe
  // (context + subscriber idea originally from https://codepen.io/trusktr/project/editor/XbEOMk)
  static get provides() {
    return [ComponentExplorerContext];
  }

  constructor(props) {
    super(props);
    this.state = {
      formData: '',
      renderedHTML: '',
      schema: '',
      formattedHTML: '',
      theme: 'xlight',
    };
    this.useShadow = false;
    this.requestRender = this.requestRender.bind(this);
    this.onFormChange = this.onFormChange.bind(this);
  }

  connecting() {
    super.connecting && super.connecting();
    const jsonNode = document.getElementById(this.props.schemaUuid);

    if (jsonNode) {
      const jsonText = jsonNode.textContent;
      this.schema = prepSchema(JSON.parse(jsonText));
    }

    this.setState({
      formData: this.props.formData,
      renderedHTML: '',
      schema: this.props.schema || '',
    });

    this.addEventListener('onFormChange', this.onFormChange);
  }

  resetForm() {
    this.contexts.get(ComponentExplorerContext).formData = this.props.formData;
    if (this.schemaForm) {
      this.schemaForm.resetForm();
    }
  }

  switchTheme(themeName){
    this.setState({
      theme: themeName,
    });
  }

  shouldUpdate(prevProps, prevState) {
    return !isEqual(prevState, this.state);
  }

  onFormChange(event) {
    this.state.formData = event.detail.formData;
    this.requestRender(event.detail.formData);
    // store.dispatch(updateComponentExplorerForm(value.formData));
  }

  async requestRender(formData) {
    const self = this;

    if (formData && formData !== '') {
      const res = await fetch(
        `/api/render?${qs.stringify({
          template: this.props.template,
        })}`,
        {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const body = await res.text();

      if (!res.ok) {
        console.error(`Error: rendering ${this.props.template}`, body);
        return;
      } else {
        self.setState({
          renderedHTML: body,
        });
      }
      // store.dispatch(updateComponentExplorerPreview(body));
    }
  }

  rendered() {
    super.rendered && super.rendered();
    this.schemaForm = this.querySelector('bolt-schema-form');
  }

  render() {
    const { initialLayout, formData } = this.props;
    const isHorizontal = initialLayout === 'horizontal';
    const schema = prepSchema(this.props.schema);

    this.contexts.get(ComponentExplorerContext).schema = schema;
    this.contexts.get(ComponentExplorerContext).formData =
      this.state.formData || formData;

    return html`
      ${this.addStyles([styles, globalStyles])}
      <div
        style="${styleMap({
          display: 'flex',
          flexDirection: isHorizontal ? 'row' : 'column',
          flexWrap: 'wrap',
          backgroundColor: '#F6F6F9',
          margin: '0 auto',
          border: '1px solid rgba(0, 0, 0, 0.075)',
        })}"
      >
        <div
          class="${`u-bolt-flex-grow u-bolt-flex-shrink u-bolt-width-1/1 u-bolt-width-6/10@small t-bolt-${this.state.theme}`}"
          style="${styleMap({
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          })}"
        >
          <div
            class="u-bolt-padding-medium u-bolt-padding-bottom-large c-bds-component-explorer__demo-container"
            style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;"
          >
            ${unsafeHTML(this.state.renderedHTML || '')}
          </div>

          <div style="position: absolute; bottom: 0; right: 0.5rem">
            <bolt-list class="u-bolt-padding-small-squished" tag="ul" display="inline" spacing="none" separator="none" align="start" valign="center">
              <bolt-list-item class="u-bolt-margin-left-small">
                <input
                  type="radio"
                  id="theme-xlight"
                  name="radio-theme-picker"
                  @click=${() => this.switchTheme('xlight')}
                  class="c-bolt-input c-bolt-input--radio is-filled"
                  checked
                />

                <label
                  for="theme-xlight"
                  class="c-bolt-inline-label c-bolt-inline-label--radio"
                  >xlight</label>
              </bolt-list-item>

              <bolt-list-item class="u-bolt-margin-left-small">
                <input
                  type="radio"
                  id="theme-light"
                  name="radio-theme-picker"
                  @click=${() => this.switchTheme('light')}
                  class="c-bolt-input c-bolt-input--radio is-filled"
                />

                <label
                  for="theme-light"
                  class="c-bolt-inline-label c-bolt-inline-label--radio"
                  >light</label>
              </bolt-list-item>

              <bolt-list-item class="u-bolt-margin-left-small">
                <input
                  type="radio"
                  id="theme-dark"
                  name="radio-theme-picker"
                  @click=${() => this.switchTheme('dark')}
                  class="c-bolt-input c-bolt-input--radio is-filled"
                />

                <label
                  for="theme-dark"
                  class="c-bolt-inline-label c-bolt-inline-label--radio"
                  >dark</label>
              </bolt-list-item>

              <bolt-list-item class="u-bolt-margin-left-small">
                <input
                  type="radio"
                  id="theme-xdark"
                  name="radio-theme-picker"
                  @click=${() => this.switchTheme('xdark')}
                  class="c-bolt-input c-bolt-input--radio is-filled"
                />

                <label
                  for="theme-xdark"
                  class="c-bolt-inline-label c-bolt-inline-label--radio"
                  >xdark</label>
              </bolt-list-item>
            </bolt-list>
          </div>
        </div>
        <div
          class="u-bolt-flex-grow u-bolt-flex-shrink u-bolt-width-1/1 u-bolt-width-4/10@small"
          style="${styleMap({
            flexBasis: '200px',
            overflow: 'visible',
            marginLeft: 'auto',
            position: 'relative',
          })}"
        >
          <div
            style="${styleMap({
              minHeight: '320px',
              overflow: 'scroll',
              height: '100%',
              '-webkit-overflow-scroll': 'touch',
            })}"
          >
            ${guard(schema, () =>
              schema === schema
                ? html`
                    <bolt-schema-form></bolt-schema-form>
                  `
                : '',
            )}
          </div>
          <bolt-button
            size="xsmall"
            color="text"
            style="${styleMap({
              position: 'absolute',
              bottom: 0,
              right: 0,
              transform: 'translate3d(0, 100%, 0)',
            })}"
            @click=${() => this.resetForm()}
          >
            Reset Component Explorer
          </bolt-button>
        </div>
      </div>
    `;
  }
}
