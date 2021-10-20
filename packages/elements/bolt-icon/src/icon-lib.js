import { stringify } from 'svgson';
import schema from '../icon.schema.json';

// Example: iconChevronDown({ size: 'medium', attributes: { foo: 'bar' } })
export function getSvg(data, props = {}) {
  const { size, color, attributes = {} } = props;
  const classes = data.attributes.class ? data.attributes.class.split(' ') : [];

  classes.push('e-bolt-icon');

  // @TODO: This type of prop validation should be refactored into a non-WC base class helper function once we have a few more use cases.
  if (size && schema.properties.size.enum.includes(size)) {
    classes.push(`e-bolt-icon--${size}`);
  }

  if (color && schema.properties.color.enum.includes(color)) {
    classes.push(`e-bolt-icon--${color}`);
  }

  const svgData = {
    ...data,
    ...{
      attributes: {
        ...data.attributes,
        ...attributes,
        ...{ class: classes.join(' ') },
      },
    },
  };

  return stringify(svgData);
}
