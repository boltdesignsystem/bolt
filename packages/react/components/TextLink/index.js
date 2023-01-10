// import React from 'react';
import schema from './text-link.schema';

export default function TextLink({
  iconBefore,
  iconAfter,
  reversedUnderline,
  expandClickTarget,
  href,
  type,
  children,
  className,
  ...otherProps
}) {
  const attributes = {};
  const classes = ['e-bolt-text-link'];
  const userClasses = className ? className.split(' ') : [];

  if (userClasses.length) {
    classes.push(...userClasses);
  }

  // reversed underline
  if (
    reversedUnderline &&
    reversedUnderline !== schema.properties.reversed_underline.default
  ) {
    classes.push(`e-bolt-text-link--reversed-underline`);
  }

  // expand click target
  if (
    expandClickTarget &&
    expandClickTarget !== schema.properties.expand_click_target.default
  ) {
    classes.push(`e-bolt-text-link--expand-click-target`);
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
        <span className="e-bolt-text-link__icon-before" aria-hidden="true">
          {iconBefore}
        </span>
      )}
      {children}
      {iconAfter && (
        <span className="e-bolt-text-link__icon-after" aria-hidden="true">
          {iconAfter}
        </span>
      )}
    </TagName>
  );
}
