import schema from './switch-button.schema';

export default function SwitchButton({
  label,
  on,
  htmlFor,
  onClickHandler,
  buttonAttributes,
  children,
  className,
  translate,
  ...otherProps
}) {
  const attributes = {};

  // Classes
  const classes = ['c-bolt-switch-button'];
  const userClasses = className ? className.split(' ') : [];
  if (userClasses.length) {
    classes.push(...userClasses);
  }
  attributes.className = classes.join(' ');

  // Checked
  const isOn = on !== undefined ? on : schema.properties.on.default;
  const ariaChecked = isOn ? 'true' : 'false';

  // Label
  const buttonLabel = label || 'Switch'; // TODO: translation

  // For
  const uuid = Math.floor(10000 + Math.random() * 90000);
  const labelFor = htmlFor ? htmlFor : `bolt-switch-button-${uuid}`;
  attributes.htmlFor = labelFor;

  // Button attributes
  const mergedButtonAttributes = { ...buttonAttributes };
  if (!mergedButtonAttributes.id) {
    mergedButtonAttributes.id = `bolt-switch-button-${uuid}`;
  }

  if (typeof translate !== 'function') {
    console.warn(
      '`translate` prop is missing or is not a function. This is required for translation.',
    );
  }

  return (
    // TODO: animate
    <label {...attributes} {...otherProps}>
      <div className="c-bolt-switch-button__label">{buttonLabel}</div>
      <button
        className="c-bolt-switch-button__button"
        type="button"
        role="switch"
        aria-checked={ariaChecked}
        onClick={onClickHandler}
        {...mergedButtonAttributes}>
        <span
          className="c-bolt-switch-button__button-text c-bolt-switch-button__button-text--checked"
          aria-hidden="true">
          {translate('on')}
        </span>
        <span
          className="c-bolt-switch-button__button-text c-bolt-switch-button__button-text--unchecked"
          aria-hidden="true">
          {translate('off')}
        </span>
      </button>
    </label>
  );
}
