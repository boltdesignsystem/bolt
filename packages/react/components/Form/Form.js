export default function Form({ className, children, ...otherProps }) {
  const classes = ['c-bolt-form'];
  const userClasses = className ? className.split(' ') : [];

  if (userClasses.length) {
    classes.push(...userClasses);
  }

  return (
    <form className={classes.join(' ')} {...otherProps}>
      {children}
    </form>
  );
}
