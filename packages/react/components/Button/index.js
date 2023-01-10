import React from 'react';
import schema from './button.schema';

export default function Button({
  hierarchy,
  size,
  display,
  borderRadius,
  iconOnly,
  iconBefore,
  iconAfter,
  href,
  type,
  children,
  className,
  ...otherProps
}) {
  const attributes = {};
  const classes = ['e-bolt-button'];
  const userClasses = className ? className.split(' ') : [];

  if (userClasses.length) {
    classes.push(...userClasses);
  }

  // hierarchy
  if (
    hierarchy &&
    schema.properties.hierarchy.enum.includes(hierarchy) &&
    hierarchy !== schema.properties.hierarchy.default
  ) {
    classes.push(`e-bolt-button--${hierarchy}`);
  }

  // size
  if (
    size &&
    schema.properties.size.enum.includes(size) &&
    size !== schema.properties.size.default
  ) {
    classes.push(`e-bolt-button--${size}`);
  }

  // display
  if (
    display &&
    schema.properties.display.enum.includes(display) &&
    display !== schema.properties.display.default
  ) {
    classes.push(`e-bolt-button--${display}`);
  }

  // border radius
  if (
    borderRadius &&
    schema.properties.border_radius.enum.includes(borderRadius) &&
    borderRadius !== schema.properties.border_radius.default
  ) {
    classes.push(`e-bolt-button--border-radius-${borderRadius}`);
  }

  // icon only
  if (iconOnly) {
    classes.push(`e-bolt-button--icon-only`);
  }

  attributes.className = classes.join(' ');

  if (href) {
    attributes.href = href;
  } else {
    attributes.type = type || 'button';
  }

  const TagName = href ? 'a' : 'button';

  return (
    <TagName {...attributes} {...otherProps}>
      {iconBefore && (
        <span className="e-bolt-button__icon-before" aria-hidden="true">
          {iconBefore}
        </span>
      )}
      {children}
      {iconAfter && (
        <span className="e-bolt-button__icon-after" aria-hidden="true">
          {iconAfter}
        </span>
      )}
    </TagName>
  );
}
