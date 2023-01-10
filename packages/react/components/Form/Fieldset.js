import Legend from './Legend';
import InputMessage from './InputMessage';

export default function Fieldset({
  legendTitle,
  legendSize,
  legendAttributes,
  errors,
  descriptionText,
  stackSpacingNone,
  className,
  children,
  ...otherProps
}) {
  const classes = ['c-bolt-fieldset'];
  const userClasses = className ? className.split(' ') : [];

  if (userClasses.length) {
    classes.push(...userClasses);
  }

  const listClasses = ['c-bolt-input-list'];

  if (stackSpacingNone) {
    listClasses.push('c-bolt-input-list--stack-spacing-none');
  }

  return (
    <fieldset className={classes.join(' ')} {...otherProps}>
      {legendTitle && (
        <Legend size={legendSize} {...legendAttributes}>
          {legendTitle}
        </Legend>
      )}
      <div className={listClasses.join(' ')}>
        {errors && <InputMessage invalid>{errors}</InputMessage>}
        {descriptionText && (
          <bolt-stack spacing="xsmall">{descriptionText}</bolt-stack>
        )}
        {children}
      </div>
    </fieldset>
  );
}
