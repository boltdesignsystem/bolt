import InputMessage from './InputMessage';

export default function Form({
  label,
  labelDisplay,
  errors,
  descriptionText,
  className,
  children,
  ...otherProps
}) {
  const classes = ['c-bolt-input-list__item'];
  const userClasses = className ? className.split(' ') : [];

  if (userClasses.length) {
    classes.push(...userClasses);
  }

  const display = labelDisplay || 'after';

  return (
    <div className={classes.join(' ')} {...otherProps}>
      {['before', 'invisible'].includes(display) ? (
        <>
          {label}
          <div className="c-bolt-block-input-wrapper">
            {children}
            {errors && <InputMessage invalid>{errors}</InputMessage>}
            {descriptionText && <InputMessage>{descriptionText}</InputMessage>}
          </div>
        </>
      ) : (
        display === 'after' && (
          <>
            {children}
            {label}
            {errors && <InputMessage invalid>{errors}</InputMessage>}
            {descriptionText && <InputMessage>{descriptionText}</InputMessage>}
          </>
        )
      )}
    </div>
  );
}
