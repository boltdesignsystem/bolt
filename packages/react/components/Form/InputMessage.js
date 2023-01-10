export default function InputMessage({
  invalid,
  className,
  children,
  ...otherProps
}) {
  const classes = ['c-bolt-input-message'];
  const userClasses = className ? className.split(' ') : [];

  if (userClasses.length) {
    classes.push(...userClasses);
  }

  if (invalid) {
    classes.push('c-bolt-input-message--invalid');
  }

  return (
    <div className={classes.join(' ')} {...otherProps}>
      {children}
    </div>
  );
}
