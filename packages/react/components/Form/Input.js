import FormIcons from './FormIcons';
import { IconSearch } from '../Icon';

export default React.forwardRef(
  (
    {
      type,
      hasErrors,
      isTouched,
      label,
      register,
      rules,
      className,
      children,
      ...otherProps
    },
    ref,
  ) => {
    const attributes = {};
    const classes = ['c-bolt-input', 'js-bolt-react-component'];
    const userClasses = className ? className.split(' ') : [];

    if (userClasses.length) {
      classes.push(...userClasses);
    }

    if (type) {
      classes.push(`c-bolt-input--${type}`);
    }

    if (hasErrors) {
      classes.push('is-invalid');
    }

    if (isTouched) {
      classes.push('is-touched');
    }

    attributes.type = type;
    attributes.className = classes.join(' ');

    const icons = [];
    const typesWithIcons = [
      'email',
      'number',
      'password',
      'search',
      'text',
      'tel',
    ];
    let supportsIcons;

    if (typesWithIcons.includes(type)) {
      supportsIcons = true;
    }

    if (supportsIcons) {
      if (type === 'search') {
        icons.push({ content: <IconSearch size="medium" /> });
      }
    }

    return (
      <>
        <input ref={ref} {...attributes} {...otherProps} />
        {children}
        <div className="c-bolt-input-icons">{<FormIcons icons={icons} />}</div>
      </>
    );
  },
);
