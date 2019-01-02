import Form from 'react-jsonschema-form';
import qs from 'querystring';
import { define, props } from '@bolt/core/utils';
import { prepSchema } from './utils';
import ResponsiveLocalStorageLayout from './grid-layout';
import { h, withPreact } from '@bolt/core/renderers';
// import { store } from '@bolt/core/store.js'; // redux store

import {
  updateComponentExplorerForm,
  updateComponentExplorerPreview,
} from '@bolt/core/actions'; // redux actions needed by this element.

import styles from './component-explorer.scss';
import globalStyles from '@bolt/global/styles/index.scss';

const Iframe = (data) => {
  const { linkTags, headScripts, bodyScripts, html } = data.props;
  
  return (
    <iframe
      srcdoc={`
        <!DOCTYPE html>
          <html style="min-height: 100%; display: flex; box-shadow: inset rgba(0, 0, 0, 0.1) 0px 0px 30px;">
            <head>
              ${linkTags}
              ${headScripts}
            </head>
            <body style="display: flex; justify-content: center; align-items: center; min-height: 100vh;">
              ${html}
              ${bodyScripts}
            </body>
          </html>`
      }
      sandbox="allow-same-origin allow-scripts"
      style={{
        width: '100%',
        height: '100%',
        border: 'none',
        display: 'block',
        alignSelf: 'center',
      }}>
      Your browser does not support iframes.
    </iframe>
  );
};


@define
export default class ComponentExplorer extends withPreact() {
  static is = 'bolt-component-explorer';

  static props = {
    schema: props.object,
    formData: props.object,
    template: props.string,
    initialLayout: props.any, //PropTypes.oneOf(['vertical', 'horizontal']),
  };

  constructor(props) {
    super(props);
    this.timeout =  null;
    this.state = {
      formData: '',
      renderedHTML: '',
      schema: '',
    };
    this.requestRender = this.requestRender.bind(this);
    this.onFormChange = this.onFormChange.bind(this);
    // this.requestRender = debouce(this.requestRender.bind(this), 10);
    // this.requestRender = debouce(this.requestRender.bind(this), 150);

  }

  connecting() {
    super.connecting && super.connecting();

    this.setState({
      formData: this.props.formData,
      renderedHTML: '',
      schema: prepSchema(this.props.schema),
    });
    // const state = store.getState();
    // if (state.componentExplorer.formData !== undefined){
    //   this.setState({
    //     formData: state.componentExplorer.formData !== '' ? state.componentExplorer.formData : this.props.formData,
    //     renderedHTML: state.componentExplorer.renderedHTML || '',
    //     schema: prepSchema(this.props.schema),
    //   });
    // } else {
    //   this.setState({
    //     formData: this.props.formData,
    //     renderedHTML: state.componentExplorer.renderedHTML || '',
    //     schema: prepSchema(this.props.schema),
    //   });
    // }

  }

  // stateChanged(state) {
  //   this.setState({
  //     formData: state.componentExplorer.formData || this.state.formData,
  //     renderedHTML: state.componentExplorer.renderedHTML || '',
  //   });
  // }

  resetForm() {
    this.setState({
      formData: ''
    });
    this.setState({
      formData: this.props.formData,
    });

    // store.dispatch(updateComponentExplorerForm(this.props.formData));
  }

  async onFormChange(value) {
    this.state.formData = value.formData;
    this.requestRender(value.formData);
    // // store.dispatch(updateComponentExplorerForm(value.formData));
  };

  async requestRender(formData) {
    const self = this;

    self.state.isTyping = true;

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
        if (self.state.renderedHTML !== body){
          if (self.state.typingTimeout) {
            clearTimeout(self.state.typingTimeout);
          }

          self.state.isTyping = false;
          self.state.typingTimeout = setTimeout(function () {
            if (self.state.isTyping === false){
              console.log('setting state for updated HTML');
              self.setState({
                // formData: formData,
                renderedHTML: body,
              });
            }
          }, 200);
        }
      }
      // store.dispatch(updateComponentExplorerPreview(body));
    }
  }

  render() {
    console.log('render');
    const { initialLayout } = this.props;
    const linkTags = `<link rel="stylesheet" href="/build/bolt-global.css">`;
    const bodyScripts = `<script src="/build/bolt-global.js" async></script>`;
    const isHorizontal = initialLayout === 'horizontal';

    const schema = prepSchema(this.props.schema);

    const iFrameProps = {
      linkTags, 
      headScripts: '',
      bodyScripts, 
      html: this.state.renderedHTML,
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: isHorizontal ? 'row' : 'column',
          flexWrap: 'wrap',
          backgroundColor: '#F6F6F9',
          margin: '0 auto',
          maxWidth: '1024px',
        }}>
        {this.addStyles([styles, globalStyles])}
        <div
          className="u-bolt-width-1/1 u-bolt-width-7/10@small"
          style={{
            backgroundColor: '#FFF',
            border: '1px solid rgba(0, 0, 0, .075)',
            display: 'flex',
            position: 'relative',
          }}>
          <div
            key="1"
            style="width: 100%;"
            data-grid={{
              w: 1,
              h: 3,
              x: 0,
              y: 0,
              minW: 1,
              minH: 3,
              maxH: 3,
            }}>
            <div
              class="browser-0-0-1"
              style="
              height: 100%; display: flex; box-shadow: inset rgba(0, 0, 0, 0.1) 0px 0px 30px;">
              <Iframe props={iFrameProps} />
            </div>
          </div>
        </div>

        <div
          className="u-bolt-width-1/1 u-bolt-width-3/10@small"
          style={{
            overflow: 'visible',
            marginLeft: 'auto',
            position: 'relative',
          }}>
          <div
            style={{
              minHeight: '320px',
              maxHeight: '600px',
              overflow: 'scroll',
              '-webkit-overflow-scroll': 'touch',
            }}>
            <Form
              schema={schema}
              formData={this.state.formData}
              onChange={data => this.onFormChange(data)}
              onError={data => console.error('Error in Schema Form', formData)}
            />
          </div>
          <button
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              transform: 'translate3d(0, 100%, 0)',
            }}
            onClick={() => this.resetForm()}>
            Reset Form
          </button>
        </div>
      </div>
    );
  }
}
