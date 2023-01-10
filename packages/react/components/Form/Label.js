export default function Label({
  displayType,
  className,
  children,
  ...otherProps
}) {
  const classes = [];
  const userClasses = className ? className.split(' ') : [];

  if (userClasses.length) {
    classes.push(...userClasses);
  }

  switch (displayType) {
    case 'floating':
      classes.push('c-bolt-floating-label');
      break;
    case 'block':
      classes.push('c-bolt-block-label');
      break;
    case 'inline-radio':
      classes.push('c-bolt-inline-label', 'c-bolt-inline-label--radio');
      break;
    case 'inline-checkbox':
      classes.push('c-bolt-inline-label', 'c-bolt-inline-label--checkbox');
      break;
    default:
      classes.push('c-bolt-floating-label');
  }

  return (
    <label className={classes.join(' ')} {...otherProps}>
      {children}
    </label>
  );
}
