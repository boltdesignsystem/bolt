// import { Preact, h } from '@bolt/core';
const CustomerService = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" {...otherProps}>
      <title>Icon/product/CRM/Customer Service</title>
      <defs>
        <path id="a" d="M31.508 32H0V.492h31.508z" />
      </defs>
      <g
        transform="matrix(-1 0 0 1 32 0)"
        fill="currentColor"
        fill-rule="evenodd"
      >
        <mask id="b" fill="currentColor">
          <use xlinkHref="#a" />
        </mask>
        <path
          d="M25.624 6.308a12.176 12.176 0 0 1 1.656 3.915c1.415 1.664 2.258 3.75 2.258 6.016 0 3.907-2.503 7.283-6.13 8.874l1.207.002v2.947l-3.65-2.191a11.92 11.92 0 0 1-5.135-.138 17.454 17.454 0 0 1-4.248.343c2.037 1.264 4.488 2.001 7.126 2.001.7 0 1.384-.054 2.053-.154L26.585 32v-6.43c2.995-2.164 4.923-5.531 4.923-9.316 0-4.175-2.346-7.843-5.884-9.946M9.381 21.645l-2.489 1.493v-2.585C3.93 18.795 1.97 15.756 1.97 12.3c0-5.44 4.85-9.848 10.83-9.848 5.983 0 10.832 4.409 10.832 9.848 0 5.439-4.85 9.848-10.831 9.848-1.195 0-2.343-.179-3.419-.503m16.219-9.33C25.6 5.784 19.87.491 12.8.491S0 5.785 0 12.314c0 3.785 1.928 7.153 4.923 9.317v5.446l4.718-3.302c1.01.237 2.068.364 3.159.364 7.07 0 12.8-5.295 12.8-11.825"
          fill="currentColor"
          mask="url(#b)"
          transform="matrix(-1 0 0 1 31.507 0)"
        />
      </g>
    </svg>
  );
};
export default CustomerService;
