import {
  h,
} from '@bolt/core';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Form from 'react-jsonschema-form';
import qs from 'querystring';
import debouce from 'lodash.debounce';

export default class SchemaForm extends Component {
  static getDerivedStateFromProps(props, state) {
    return {
      data: state.data ? state.data : props.initialData,
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
      renderedHtml: '<p>A <strong>component</strong> goes here.</p>',
      data: null,
    };
    this.requestRender = debouce(this.requestRender.bind(this), 300);
  }

  async requestRender(data) {
    this.setState({ data });
    // console.log('requestingRender', data);
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
    this.setState({
      renderedHtml: body,
    });
  }

  componentDidMount() {
    if (this.props.initialData) {
      this.requestRender(this.props.initialData);
    }
  }

  render() {
    const schema = SchemaForm.prepareSchema(this.props.schema);
    console.log('schema form props', this.props);

    return (
      <div>
        <h3>Schema Form for {schema.title}</h3>
        <Form
          schema={schema}
          formData={this.state.data}
          onChange={(data) => this.requestRender(data.formData)}
          onError={(data) => console.error('Error in Schema Form', data)}
        />
        <hr/>
        <div dangerouslySetInnerHTML={{ __html: this.state.renderedHtml }} />
      </div>
    );
  }
}

SchemaForm.defaultProps = {
  initialData: {},
};

SchemaForm.propTypes = {
  schema: PropTypes.object.isRequired,
  initialData: PropTypes.object,
  demoTemplate: PropTypes.string.isRequired,
};
