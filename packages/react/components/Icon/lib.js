import schema from './icon.schema';

export default function getIconClasses({ size, color, className }) {
  const classes = ['e-bolt-icon'];
  const userClasses = className ? className.split(' ') : [];

  if (size && schema.properties.size.enum.includes(size)) {
    classes.push(`e-bolt-icon--${size}`);
  }

  if (color && schema.properties.color.enum.includes(color)) {
    classes.push(`e-bolt-icon--${color}`);
  }

  if (userClasses.length) {
    classes.push(...userClasses);
  }

  return classes.join(' ');
}
