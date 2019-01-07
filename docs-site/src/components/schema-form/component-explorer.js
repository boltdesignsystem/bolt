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
    };
    this.useShadow = false;
    this.requestRender = this.requestRender.bind(this);
    this.onFormChange = this.onFormChange.bind(this);
  }

  connecting() {
    super.connecting && super.connecting();
    const jsonNode = document.getElementById(this.props.schemaUuid);

    if (jsonNode){
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
    if (this.schemaForm){
      this.schemaForm.resetForm();
    }
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

  rendered(){
    super.rendered && super.rendered();
    this.schemaForm = this.querySelector('bolt-schema-form');
  }

  render() {
    const { initialLayout, formData } = this.props;
    const isHorizontal = initialLayout === 'horizontal';
    const schema = prepSchema(this.props.schema);

    this.contexts.get(ComponentExplorerContext).schema = schema;
    this.contexts.get(ComponentExplorerContext).formData = this.state.formData || formData;

    return html`
      ${this.addStyles([styles, globalStyles])}
      <div style="${styleMap({
        display: 'flex',
        flexDirection: isHorizontal ? 'row' : 'column',
        flexWrap: 'wrap',
        backgroundColor: '#F6F6F9',
        margin: '0 auto',
      })}">
        <div class="u-bolt-flex-grow u-bolt-flex-shrink u-bolt-width-1/1 u-bolt-width-6/10@xsmall"
          style="${styleMap({
            backgroundColor: '#FFF',
            border: '1px solid rgba(0, 0, 0, .075)',
            display: 'flex',
            position: 'relative',
          })}">
          <div class="u-bolt-padding-medium c-bds-component-explorer__demo-container" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; box-shadow: inset rgba(0, 0, 0, 0.1) 0px 0px 30px;">
            ${unsafeHTML(this.state.renderedHTML || '')}
          </div>
        </div>
        <div
          class="u-bolt-flex-grow u-bolt-flex-shrink u-bolt-width-1/1 u-bolt-width-4/10@xsmall"
          style="${styleMap({
            flexBasis: '200px',
            overflow: 'visible',
            marginLeft: 'auto',
            position: 'relative',
          })}">
          <div
            style="${styleMap({
              minHeight: '320px',
              overflow: 'scroll',
              '-webkit-overflow-scroll': 'touch',
            })}">
             ${guard(schema, () => schema === schema ? html`<bolt-schema-form></bolt-schema-form>` : '')}
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
            @click=${() => this.resetForm()}>
            Reset Component Demo
          </bolt-button>
        </div>
      </div>
    `;
  }
}
