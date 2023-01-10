export default function Legend({ size, className, children, ...otherProps }) {
  const classes = ['c-bolt-legend'];
  const userClasses = className ? className.split(' ') : [];

  if (userClasses.length) {
    classes.push(...userClasses);
  }

  const legendSize = size || 'small';

  const headlineClasses = [
    'c-bolt-headline',
    'c-bolt-headline--bold',
    'c-bolt-headline--uppercase',
    `c-bolt-headline--${legendSize}`,
  ];

  return (
    <legend className={classes.join(' ')} {...otherProps}>
      {/* @todo: make a Headline React component */}
      <h2 className={headlineClasses.join(' ')}>{children}</h2>
    </legend>
  );
}
