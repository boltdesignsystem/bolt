import {
  h,
} from '@bolt/core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-jsonschema-form';
import qs from 'querystring';
import debouce from 'lodash.debounce';
import Parser from 'html-react-parser';
import ResponsiveLocalStorageLayout from './grid-layout';

function getFromLS(uuid, key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem(uuid)) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(uuid, key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      uuid,
      JSON.stringify({
        [key]: value,
      })
    );
  }
}


export default class SchemaForm extends Component {
  static getDerivedStateFromProps(props, state) {
    return {
      // data: state.data ? state.data : props.initialData,
      renderedHtml: state.renderedHtml ? state.renderedHtml : '',
      schema: state.schema ? state.schema : '',
    };
  }

  /**
   * Prepare schema by removing properties that the Form cannot handle.
   * @param {object} schema
   * @returns {object} newSchema
   */
  static prepareSchema(schema) {
    // Can't use `Object.assign`
    const newSchema = JSON.parse(JSON.stringify(schema));
    delete newSchema.properties.attributes;
    return newSchema;
  }

  constructor(props) {
    super(props);
    this.state = {
      renderedHtml: getFromLS('schemaForm-html', 'renderedHtml') || '',
      data: getFromLS('schemaForm-data', 'data') || '',
      schema: getFromLS('schemaForm-schema', 'schema') || '',
    };

    this.requestRender = debouce(this.requestRender.bind(this), 100);
  }

  resetForm(){
    localStorage.removeItem('schemaForm-data');
    this.setState({
      data: this.props.initialData,
    });

    this.requestRender(this.state.data);
  }



  async requestRender(data) {
    saveToLS('schemaForm-data', 'data', data);
    saveToLS('schemaForm-schema', 'schema', this.props.schema);

    this.setState({ data });

    // if (initialRequest && this.state.renderedHtml){
    //   this.requestRender(data);
    // } else {
    const res = await fetch(`/api/render-twig?${qs.stringify({
      templatePath: this.props.demoTemplate,
    })}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const body = await res.text();
    if (!res.ok) {
      console.error(`Error: rendering ${this.props.demoTemplate}`, body);
      return;
    }
    // console.log('got html back!', html);
    saveToLS('schemaForm-html', 'renderedHtml', body);

    this.setState({
      'renderedHtml': body,
    });
  }

  componentDidMount() {
    const elem = this;
    if (this.state.data && this.state.data !== ''){
      setTimeout(function(){
        elem.requestRender(elem.state.data);
      }, 5000);
    } else if (this.props.initialData) {
      this.requestRender(this.props.initialData);
    }
  }

  render() {
    const { layout } = this.props;

    const iframeHead = '<link rel="stylesheet" href="/pattern-lab/build/bolt-global-en.css"> <script src="/pattern-lab/build/bolt-global-en.js" async></script>';

    const schema = SchemaForm.prepareSchema(this.props.schema);
    const isHorizontal = layout === 'horizontal';

    return (
      <div style={{
        display: 'flex',
        flexDirection: isHorizontal ? 'row' : 'column',
        flexWrap: 'wrap',
        backgroundColor: '#F6F6F9',
        margin: '0 auto',
        maxWidth: '1024px',
      }}>

        <ResponsiveLocalStorageLayout
          className="u-bolt-width-1/1 u-bolt-width-7/10@small"
          style={{
            backgroundColor: '#FFF',
            border: '1px solid rgba(0, 0, 0, .075)',
            display: 'flex',
            padding: '0 1rem',
            position: 'relative',
          }}
        >
          <div key="1" data-grid={{ w: 1, h: 3, x: 0, y: 0, minW: 1, minH: 3, maxH: 3 }} >
            <div class="browser-0-0-1"
              style="
              height: 100%; box-shadow: 0 0 30px rgba(0,0,0,.1);">
                {/* <div class="tabBar-0-0-3" style="display: flex;
    font-family: Segoe UI, Arial, Helvetica;
    background-color: #d2d2d2;">
                  <div class="tab-0-0-5" style="padding: 10px 20px; background-color: #f4f4f4;"></div>
                    <div class="windowControls-0-0-4" style="padding: 10px 20px;
    flex-grow: 1; text-align: right;">
      <bolt-icon name="full-screen" size="medium"></bolt-icon>
      <bolt-icon name="close" size="medium"></bolt-icon>

    </div>
                </div> */}
                {/* <div class="addressBar-0-0-6" style="display: flex;
    padding: 10px 0;
    font-family: Segoe UI, arial, helvetica;
    background-color: #f4f4f4;">
                    <div class="addressControls-0-0-7" style="padding: 10px 20px 5px 20px;">
                      <bolt-icon name="refresh" size="medium"></bolt-icon>
                      </div>
                    <div
                        class="addressText-0-0-8" style="    padding: 10px 20px 5px 20px;
    overflow: hidden;
    flex-grow: 1;
    margin-right: 15px;
    text-overflow: ellipsis;
    background-color: #ffffff;"></div>
            </div> */}
            {/* <div> */}
              <iframe
              srcdoc={`<!DOCTYPE html><html><head>${iframeHead}</head><body style="display: flex; justify-content: center; align-items: center; min-height: 100vh;"><div id="mountHere">${this.state.renderedHtml}</div></body></html>`} sandbox="allow-same-origin allow-scripts"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                display: 'block',
              }}
            >Your browser does not support iframes.</iframe>
            {/* </div> */}
            </div>
          </div>
        </ResponsiveLocalStorageLayout>

        <div
          className="u-bolt-width-1/1 u-bolt-width-3/10@small"
          style={{
            overflow: 'visible',
            marginLeft: 'auto',
            position: 'relative',
          }}
        >
          <div
            style={{
              minHeight: '320px',
              maxHeight: '600px',
              overflow: 'scroll',
              '-webkit-overflow-scroll': 'touch',
            }}>
              <Form
                schema={schema}
                formData={this.state.data}
                onChange={(data) => this.requestRender(data.formData)}
                onError={(data) => console.error('Error in Schema Form', data)}
              />
           </div>
            <button
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                transform: 'translate3d(0, 100%, 0)',
              }}
              onClick={() => this.resetForm()}>Reset Form</button>
        </div>
      </div>
    );
  }
}

SchemaForm.defaultProps = {
  initialData: {},
  layout: 'horizontal',
};

SchemaForm.propTypes = {
  schema: PropTypes.object.isRequired,
  initialData: PropTypes.object,
  demoTemplate: PropTypes.string.isRequired,
  layout: PropTypes.oneOf([
    'vertical',
    'horizontal',
  ]),
};
