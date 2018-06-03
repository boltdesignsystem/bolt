// import { Preact, h } from '@bolt/core';
const Reporting = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" {...otherProps}>
      <title>brand icons/community/brand-reporting</title>
      <g fill="currentColor" fill-rule="evenodd">
        <path
          d="M20.94.378l3.378 4.244a1 1 0 1 1-1.566 1.244l-1.81-2.275C19.686 11.824 12.579 18.158 4 18.158a1 1 0 1 1 0-2c7.603 0 13.899-5.633 14.978-12.941l-2.441 1.94a.998.998 0 1 1-1.244-1.563L19.537.218c.033-.027.074-.035.11-.057a.881.881 0 0 1 .187-.095.95.95 0 0 1 .199-.041c.043-.005.08-.025.126-.025.019 0 .035.01.054.01.07.005.135.024.203.042.06.016.119.028.173.055.055.026.1.064.149.1.057.042.114.082.162.136.012.014.029.02.04.035zM4 24.308a1 1 0 0 1 1 1V31a1 1 0 1 1-2 0v-5.692a1 1 0 0 1 1-1zm8.002-4.854a1 1 0 0 1 1 1V31a1 1 0 1 1-2 0V20.454a1 1 0 0 1 1-1zm8-3.486a1 1 0 0 1 1 1V31a1 1 0 1 1-2 0V16.968a1 1 0 0 1 1-1zm8.001-5.131a1 1 0 0 1 1 1V31a1 1 0 1 1-2 0V11.837a1 1 0 0 1 1-1z"
          id="id-20a"
        />
        <mask id="id-21b" fill="#fff">
          <use xlinkHref="#id-20a" />
        </mask>
        <g mask="url(#id-21b)" fill="currentColor">
          <path d="M0 0h32v32H0z" />
        </g>
      </g>
    </svg>
  );
};
export default Reporting;
