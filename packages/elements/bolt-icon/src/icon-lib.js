import { stringify } from 'svgson';

export function getSVG(data, props = {}) {
  const { size, color } = props;
  const classes = ['e-bolt-icon'];

  // @TODO: Validate using schema here
  if (size) {
    classes.push(`e-bolt-icon--${size}`);
  }

  if (color) {
    classes.push(`e-bolt-icon--${color}`);
  }

  const svgData = {
    ...data,
    ...{
      attributes: {
        ...data.attributes,
        // Note: this currently overrides any initial classes
        ...{ class: classes.join(' ') },
      },
    },
  };

  return stringify(svgData);
}
