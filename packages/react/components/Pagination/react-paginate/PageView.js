'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button';

const PageView = props => {
  let { pageClassName, pageLinkClassName } = props;
  const {
    page,
    selected,
    activeClassName,
    activeLinkClassName,
    getEventListener,
    pageSelectedHandler,
    href,
    extraAriaContext,
    pageLabelBuilder,
    rel,
    translate,
  } = props;

  const translatedPageNumber = translate('Page @number', { '@number': page });

  let ariaLabel =
    props.ariaLabel ||
    translatedPageNumber + (extraAriaContext ? ' ' + extraAriaContext : '');
  let ariaCurrent = null;

  if (selected) {
    ariaCurrent = 'page';

    const translatedCurrentPage = translate(
      '@page-number is your current page',
      { '@page-number': translatedPageNumber },
    );

    ariaLabel = props.ariaLabel || translatedCurrentPage;

    if (typeof pageClassName !== 'undefined') {
      pageClassName = pageClassName + ' ' + activeClassName;
    } else {
      pageClassName = activeClassName;
    }

    if (typeof pageLinkClassName !== 'undefined') {
      if (typeof activeLinkClassName !== 'undefined') {
        pageLinkClassName = pageLinkClassName + ' ' + activeLinkClassName;
      }
    } else {
      pageLinkClassName = activeLinkClassName;
    }
  }

  // Bolt override
  const boltButtonBaseClasses =
    'e-bolt-button e-bolt-button--small e-bolt-button--border-radius-full';

  const boltPageLinkClassName = selected
    ? `${pageLinkClassName} ${boltButtonBaseClasses} e-bolt-button--primary`
    : `${pageLinkClassName} ${boltButtonBaseClasses} e-bolt-button--transparent`;

  return (
    <li className={pageClassName} role="menu-item">
      {selected ? (
        <span className={boltPageLinkClassName} aria-label={ariaLabel}>
          {pageLabelBuilder(page)}
        </span>
      ) : (
        <Button
          hierarchy={selected ? 'primary' : 'transparent'}
          size="small"
          borderRadius="full"
          className={boltPageLinkClassName}
          aria-label={ariaLabel}
          aria-current={ariaCurrent}
          onKeyPress={pageSelectedHandler}
          {...getEventListener(pageSelectedHandler)}>
          {pageLabelBuilder(page)}
        </Button>
      )}
    </li>
  );
};

PageView.propTypes = {
  pageSelectedHandler: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  pageClassName: PropTypes.string,
  pageLinkClassName: PropTypes.string,
  activeClassName: PropTypes.string,
  activeLinkClassName: PropTypes.string,
  extraAriaContext: PropTypes.string,
  href: PropTypes.string,
  ariaLabel: PropTypes.string,
  page: PropTypes.number.isRequired,
  getEventListener: PropTypes.func.isRequired,
  pageLabelBuilder: PropTypes.func.isRequired,
  rel: PropTypes.string,
};

export default PageView;
