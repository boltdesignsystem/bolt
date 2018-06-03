// import { Preact, h } from '@bolt/core';
const Java = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" {...otherProps}>
      <title>brand icons/community/brand-java</title>
      <path
        d="M23.49 24.957a.999.999 0 0 1-.707-1.707l6.803-6.805-6.804-6.801a1 1 0 1 1 1.414-1.415l7.511 7.509a1.003 1.003 0 0 1 0 1.414l-7.51 7.512a.997.997 0 0 1-.708.293zm-14.98 0a.997.997 0 0 1-.706-.293L.293 17.152a1.002 1.002 0 0 1 0-1.414l7.51-7.51a1 1 0 0 1 1.415 1.416l-6.804 6.8 6.804 6.806a.999.999 0 0 1-.707 1.707zm2.311 3.504a.999.999 0 0 1-.908-1.416l10.26-22.46a.998.998 0 1 1 1.817.831l-10.259 22.46a.999.999 0 0 1-.91.585z"
        id="id-10a"
      />
      <g fill="currentColor" fill-rule="evenodd">
        <mask id="id-11b" fill="#fff">
          <use xlinkHref="#id-10a" />
        </mask>
        <use fill="currentColor" xlinkHref="#id-10a" />
        <g mask="url(#id-11b)" fill="currentColor">
          <path d="M0 0h32v32H0z" />
        </g>
      </g>
    </svg>
  );
};
export default Java;
