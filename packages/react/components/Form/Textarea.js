export default React.forwardRef(
  ({ hasErrors, className, children, ...otherProps }, ref) => {
    const attributes = {};
    const classes = ['c-bolt-input', 'js-bolt-react-component'];
    const userClasses = className ? className.split(' ') : [];

    if (userClasses.length) {
      classes.push(...userClasses);
    }

    if (hasErrors) {
      classes.push('is-invalid');
    }

    return (
      <textarea ref={ref} className={classes.join(' ')} {...otherProps}>
        {children}
      </textarea>
    );
  },
);
