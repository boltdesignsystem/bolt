import Form from 'react-jsonschema-form';
import { withContext, defineContext, define, props } from '@bolt/core/utils';
import { h, withPreact } from '@bolt/core/renderers';
import isEqual from 'react-fast-compare';
import { ComponentExplorerContext } from './component-explorer';

@define
export default class SchemaForm extends withContext(withPreact()) {
  static is = 'bolt-schema-form';

  static props = {
    schema: props.object,
    formData: props.object,
    template: props.string,
    initialLayout: props.any, //PropTypes.oneOf(['vertical', 'horizontal']),
  };

  // subscribe to specific props that are defined and available on the parent container
  // (context + subscriber idea originally from https://codepen.io/trusktr/project/editor/XbEOMk)
  static get consumes() {
    return [
      [ComponentExplorerContext, 'schema'],
      [ComponentExplorerContext, 'formData'],
    ];
  }

  constructor(props) {
    super(props);
    this.timeout =  null;
    this.state = {
      formData: '',
      renderedHTML: '',
      schema: '',
    };
    this.useShadow = false;
    this.onFormChange = this.onFormChange.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.context = this.contexts.get(ComponentExplorerContext);
  }

  resetForm() {
    this.setState({
      formData: this.props.formData,
    });
    this.onFormChange({formData: this.props.formData});
  }

  shouldUpdate(prevProps, prevState) {
    return (!isEqual(prevState,this.state));
  }

  resetForm(){
    this.setState({
      formData: this.context.formData,
    });
    this.onFormChange({ formData: this.context.formData });
  }

  onFormChange(value) {
    this.state.formData = value.formData;
    this.dispatchEvent(
      new CustomEvent('onFormChange', {
        detail: value,
        bubbles: true,
      }),
    );
  };

  render() {
    this.state.schema = this.state.schema || this.context.schema;
    this.state.formData = this.state.formData || this.context.formData;

    const { initialLayout } = this.props;
    const isHorizontal = initialLayout === 'horizontal';

    const uiSchema = {
      layout: {
        navPosition: {
          "ui:help": "Position of the next/prev buttons",
          "ui:widget": "radio",
          "ui:options": {
            inline: true
          }
        },
      },
      controls: {
        navPosition: {
          "ui:help": "Position of the next/prev buttons",
          "ui:widget": "radio",
          "ui:options": {
            inline: true
          }
        },
      },
      slideConfig: {
        maxSlidesPerView: {
          "ui:help": "Max # of slides to display.",
          "ui:widget": "range",
          "ui:options": {
            inline: true
          }
        },
      },
      maxSlidesPerView: {
        "ui:help": "Max # of slides to display.",
        "ui:widget": "range",
        "ui:options": {
          inline: true
        }
      },
    }

    return (
      <Form
        schema={this.state.schema}
        formData={this.state.formData}
        uiSchema={uiSchema}
        // widgets={customWidgets} 
        onChange={data => this.onFormChange(data)}
        onError={(data) => console.error('Error in Schema Form', formData)}>
      </Form>
    );
  }
}
